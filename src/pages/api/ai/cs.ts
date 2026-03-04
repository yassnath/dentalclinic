import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { toHariIndonesia } from "@/lib/date";

type ErrorBody = { error: string };
type SuccessBody = { reply: string };

type AvailabilityDay = {
  tanggal: string;
  hari: string;
  dokter_ready: Array<{
    dokter: string;
    spesialis: string | null;
    jam_mulai: string;
    jam_selesai: string;
    sisa_kuota: number;
    kuota_maks: number;
  }>;
};
type PublicContext = Awaited<ReturnType<typeof buildPublicContext>>;

const DEFAULT_SERVICE_FEES = [
  { kategori: "Umum", layanan: "Konsultasi / pemeriksaan", biaya: "Rp 100.000 - 200.000" },
  { kategori: "Preventif", layanan: "Scaling", biaya: "Rp 200.000 - 600.000" },
  { kategori: "Restorasi", layanan: "Tambal gigi", biaya: "Rp 150.000 - 800.000" },
];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfterMs(value: string | null) {
  if (!value) return 1000;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds > 0) {
    return Math.min(seconds * 1000, 4000);
  }

  const retryAt = Date.parse(value);
  if (Number.isFinite(retryAt)) {
    const diff = retryAt - Date.now();
    return diff > 0 ? Math.min(diff, 4000) : 1000;
  }

  return 1000;
}

function buildSafeFallbackReply(offlineReply: string) {
  return `Berikut info yang bisa saya bantu sekarang:\n\n${offlineReply}`;
}

function asTime(value: Date) {
  const h = String(value.getHours()).padStart(2, "0");
  const m = String(value.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

async function buildPublicContext() {
  const maxQuota = 5;
  const doctors = await prisma.user.findMany({
    where: { role: "dokter" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, spesialis: true },
  });

  const doctorIds = doctors.map((doctor) => doctor.id);
  const schedules = await prisma.jadwalDokter.findMany({
    where: {
      dokterId: {
        in: doctorIds.length ? doctorIds : [BigInt(-1)],
      },
    },
    orderBy: [{ dokterId: "asc" }, { hari: "asc" }, { jamMulai: "asc" }],
  });

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const dateList: { tanggal: string; hari: string }[] = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const iso = `${yyyy}-${mm}-${dd}`;
    dateList.push({ tanggal: iso, hari: toHariIndonesia(iso) });
  }

  const counts = await prisma.pendaftaran.groupBy({
    by: ["dokterId", "tanggalKunjungan"],
    where: {
      tanggalKunjungan: { gte: start, lte: end },
      NOT: [{ status: "ditolak" }],
      dokterId: { not: null },
    },
    _count: { _all: true },
  });

  const countMap = new Map<string, number>();
  for (const row of counts) {
    if (!row.dokterId || !row.tanggalKunjungan) continue;
    const yyyy = row.tanggalKunjungan.getFullYear();
    const mm = String(row.tanggalKunjungan.getMonth() + 1).padStart(2, "0");
    const dd = String(row.tanggalKunjungan.getDate()).padStart(2, "0");
    countMap.set(`${row.dokterId.toString()}|${yyyy}-${mm}-${dd}`, row._count._all);
  }

  const availability: AvailabilityDay[] = dateList.map((day) => ({
    ...day,
    dokter_ready: [],
  }));

  for (const schedule of schedules) {
    const doctor = doctors.find((item) => item.id === schedule.dokterId);
    if (!doctor) continue;

    for (const day of availability) {
      if (day.hari !== schedule.hari) continue;
      const key = `${schedule.dokterId.toString()}|${day.tanggal}`;
      const used = countMap.get(key) ?? 0;
      const remaining = maxQuota - used;
      if (remaining <= 0) continue;

      day.dokter_ready.push({
        dokter: doctor.name,
        spesialis: doctor.spesialis ?? null,
        jam_mulai: asTime(schedule.jamMulai),
        jam_selesai: asTime(schedule.jamSelesai),
        sisa_kuota: remaining,
        kuota_maks: maxQuota,
      });
    }
  }

  return {
    dokter: doctors.map((doctor) => ({ nama: doctor.name, spesialis: doctor.spesialis ?? null })),
    jadwal_dokter: schedules.map((schedule) => {
      const doctor = doctors.find((item) => item.id === schedule.dokterId);
      return {
        dokter: doctor?.name ?? "Tidak diketahui",
        spesialis: doctor?.spesialis ?? null,
        hari: schedule.hari,
        jam_mulai: asTime(schedule.jamMulai),
        jam_selesai: asTime(schedule.jamSelesai),
      };
    }),
    ketersediaan_7_hari: availability.filter((day) => day.dokter_ready.length > 0),
    biaya_layanan: DEFAULT_SERVICE_FEES,
    catatan_biaya: "Biaya bersifat estimasi dan dapat berubah sesuai kondisi pasien.",
    catatan_ketersediaan: `Ketersediaan dihitung dari kuota ${maxQuota} pasien per dokter per tanggal.`,
  };
}

function getFallbackContext(): PublicContext {
  return {
    dokter: [],
    jadwal_dokter: [],
    ketersediaan_7_hari: [],
    biaya_layanan: DEFAULT_SERVICE_FEES,
    catatan_biaya: "Biaya bersifat estimasi dan dapat berubah sesuai kondisi pasien.",
    catatan_ketersediaan: "Ketersediaan belum dapat dimuat saat ini.",
  };
}

function buildOfflineReply(message: string, context: PublicContext) {
  const text = message.toLowerCase();
  const isBiaya = /(biaya|harga|tarif|pembayaran)/.test(text);
  const isJadwal = /(jadwal|dokter|spesialis|ketersediaan|kuota)/.test(text);
  const isDaftar = /(daftar|pendaftaran|konsultasi|antrian|appointment|janji)/.test(text);

  if (isBiaya) {
    const biaya = context.biaya_layanan.map((item) => `- ${item.layanan}: ${item.biaya}`).join("\n");
    return `Estimasi biaya layanan:\n${biaya}\n${context.catatan_biaya}`;
  }

  if (isJadwal) {
    if (!context.ketersediaan_7_hari.length) {
      return "Jadwal dokter belum bisa ditampilkan saat ini. Silakan cek lagi beberapa saat atau hubungi resepsionis.";
    }

    const preview = context.ketersediaan_7_hari
      .slice(0, 3)
      .map((day) => {
        const dokter = day.dokter_ready
          .slice(0, 2)
          .map((slot) => `${slot.dokter} (${slot.jam_mulai}-${slot.jam_selesai}, sisa ${slot.sisa_kuota})`)
          .join("; ");
        return `- ${day.hari}, ${day.tanggal}: ${dokter}`;
      })
      .join("\n");

    return `Ketersediaan dokter terdekat:\n${preview}\nUntuk daftar, pilih menu Konsultasi/Daftar lalu pilih dokter dan jam kunjungan.`;
  }

  if (isDaftar) {
    return "Cara daftar konsultasi: 1) Buka halaman daftar/konsultasi. 2) Pilih tanggal, spesialis, dokter, dan jam. 3) Isi keluhan. 4) Simpan dan tunjukkan QR saat check-in.";
  }

  return "Saya bisa bantu info jadwal dokter, ketersediaan kuota, estimasi biaya, dan alur pendaftaran konsultasi. Silakan tulis pertanyaan spesifik.";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ErrorBody | SuccessBody>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method tidak diizinkan." });
  }

  const message = String(req.body?.message ?? "").trim();
  if (!message) {
    return res.status(422).json({ error: "Message wajib diisi." });
  }

  const apiKey = process.env.CEREBRAS_API_KEY;
  const model = process.env.CEREBRAS_MODEL ?? "llama3.1-8b";
  const baseUrl = (process.env.CEREBRAS_BASE_URL ?? "https://api.cerebras.ai/v1").replace(/\/+$/, "");

  const systemPrompt =
    "Kamu adalah AI Customer Service Klinik. Jawab selalu dengan Bahasa Indonesia, ringkas, akurat, sopan, dan fokus kebutuhan pasien.";
  let context: PublicContext;
  try {
    context = await buildPublicContext();
  } catch {
    context = getFallbackContext();
  }

  const offlineReply = buildOfflineReply(message, context);
  if (!apiKey) {
    return res.status(200).json({
      reply: buildSafeFallbackReply(offlineReply),
    });
  }

  try {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "system", content: `DATA TERKINI KLINIK:\n${JSON.stringify(context)}` },
            { role: "user", content: message },
          ],
          temperature: 0.4,
          max_tokens: 350,
        }),
      }).finally(() => clearTimeout(timeout));

      const raw = await response.text();
      let payload: unknown = null;
      try {
        payload = raw ? JSON.parse(raw) : null;
      } catch {
        payload = null;
      }

      if (response.ok) {
        const reply =
          payload && typeof payload === "object"
            ? (payload as { choices?: Array<{ message?: { content?: string } }> }).choices?.[0]?.message?.content
            : null;

        return res.status(200).json({
          reply: typeof reply === "string" && reply.trim() !== "" ? reply.trim() : buildSafeFallbackReply(offlineReply),
        });
      }

      const retryable = response.status === 429 || response.status >= 500;
      if (retryable && attempt < 1) {
        const delay = response.status === 429 ? parseRetryAfterMs(response.headers.get("retry-after")) : 700;
        await wait(delay);
        continue;
      }

      console.warn("[ai-cs] fallback mode", {
        status: response.status,
        retryable,
      });
      return res.status(200).json({
        reply: buildSafeFallbackReply(offlineReply),
      });
    }

    return res.status(200).json({
      reply: buildSafeFallbackReply(offlineReply),
    });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Koneksi ke AI gagal";
    console.warn("[ai-cs] external request failed, fallback mode", { message: messageText });
    return res.status(200).json({
      reply: buildSafeFallbackReply(offlineReply),
    });
  }
}
