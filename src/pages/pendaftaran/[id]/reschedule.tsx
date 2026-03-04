import type { GetServerSideProps } from "next";
import { z } from "zod";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { parseFormBody } from "@/lib/http";
import { countForDoctorOnDate, generateQueueForDoctorAndDate } from "@/lib/queue";
import { toDateInputValue } from "@/lib/date";

const schema = z.object({
  tanggal_kunjungan: z.string().min(1),
  jam_kunjungan: z.string().min(1),
  spesialis: z.string().min(1),
  dokter_id: z.string().min(1),
});

type RescheduleProps = {
  user: SessionUser;
  unreadNotifCount: number;
  p: {
    id: string;
    nama: string;
    spesialis: string | null;
    dokter_id: string | null;
    dokter_name: string;
    tanggal_kunjungan: string | null;
    jam_kunjungan: string | null;
    kode_antrian: string | null;
  };
  spesialisList: string[];
  dokters: Array<{ id: string; name: string; spesialis: string | null }>;
  errors: string[];
};

export const getServerSideProps: GetServerSideProps<RescheduleProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const errors: string[] = [];

  const pendaftaran = await prisma.pendaftaran.findFirst({
    where: {
      id,
      userId: auth.user.id,
    },
    include: { dokter: true },
  });

  if (!pendaftaran) {
    return {
      redirect: {
        destination: "/pendaftaran-saya?error=Pendaftaran%20tidak%20ditemukan.",
        permanent: false,
      },
    };
  }

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      errors.push(parsed.error.issues[0]?.message ?? "Input tidak valid.");
    } else {
      const data = parsed.data;
      const dokter = await prisma.user.findFirst({
        where: {
          id: BigInt(data.dokter_id),
          role: "dokter",
        },
      });
      if (!dokter) {
        errors.push("Dokter tidak valid.");
      } else if ((dokter.spesialis ?? "") !== data.spesialis) {
        errors.push("Dokter yang dipilih tidak sesuai spesialis.");
      } else {
        const sameDate =
          (pendaftaran.tanggalKunjungan ? toDateInputValue(pendaftaran.tanggalKunjungan) : "") === data.tanggal_kunjungan;
        const sameDoctor = (pendaftaran.dokterId ?? BigInt(0)).toString() === dokter.id.toString();
        if (!(sameDate && sameDoctor)) {
          const count = await countForDoctorOnDate(dokter.id, data.tanggal_kunjungan);
          if (count >= 5) {
            errors.push("Kuota dokter untuk tanggal tersebut sudah penuh (maksimal 5 pasien).");
          }
        }

        if (errors.length === 0) {
          const queue = await generateQueueForDoctorAndDate(dokter.id, data.tanggal_kunjungan);
          const updated = await prisma.$transaction(async (tx) => {
            const result = await tx.pendaftaran.update({
              where: { id: pendaftaran.id },
              data: {
                dokterId: dokter.id,
                tanggalKunjungan: new Date(`${data.tanggal_kunjungan}T00:00:00`),
                jamKunjungan: new Date(`1970-01-01T${data.jam_kunjungan}:00`),
                spesialis: data.spesialis,
                nomorUrut: queue.nomor,
                kodeAntrian: queue.kode,
                status: "menunggu_konfirmasi",
              },
            });
            await tx.notifikasi.create({
              data: {
                userId: auth.user.id,
                judul: "Reschedule Jadwal",
                pesan: `Jadwal berhasil direschedule. Nomor antrian baru Anda: ${result.kodeAntrian ?? queue.kode}.`,
                tipe: "pendaftaran",
                link: "/pendaftaran-saya",
                dibaca: false,
              },
            });
            return result;
          });

          return {
            redirect: {
              destination: `/pendaftaran?success=${encodeURIComponent(
                "Reschedule berhasil. Nomor antrian otomatis diperbarui.",
              )}&antrian=${encodeURIComponent(updated.kodeAntrian ?? queue.kode)}`,
              permanent: false,
            },
          };
        }
      }
    }
  }

  const [spesialisListRows, doktersRows, unreadNotifCount] = await Promise.all([
    prisma.user.findMany({
      where: { role: "dokter", spesialis: { not: null } },
      select: { spesialis: true },
      distinct: ["spesialis"],
      orderBy: { spesialis: "asc" },
    }),
    prisma.user.findMany({
      where: {
        role: "dokter",
        spesialis: pendaftaran.spesialis,
      },
      orderBy: { name: "asc" },
    }),
    prisma.notifikasi.count({
      where: { userId: auth.user.id, dibaca: false },
    }),
  ]);

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
      p: {
        id: pendaftaran.id.toString(),
        nama: pendaftaran.nama,
        spesialis: pendaftaran.spesialis,
        dokter_id: pendaftaran.dokterId ? pendaftaran.dokterId.toString() : null,
        dokter_name: pendaftaran.dokter?.name ?? "-",
        tanggal_kunjungan: pendaftaran.tanggalKunjungan ? pendaftaran.tanggalKunjungan.toISOString() : null,
        jam_kunjungan: pendaftaran.jamKunjungan ? pendaftaran.jamKunjungan.toISOString() : null,
        kode_antrian: pendaftaran.kodeAntrian,
      },
      spesialisList: spesialisListRows.map((row) => row.spesialis ?? "").filter(Boolean),
      dokters: doktersRows.map((row) => ({
        id: row.id.toString(),
        name: row.name,
        spesialis: row.spesialis,
      })),
      errors,
    },
  };
};

function timeValue(value: string | null) {
  if (!value) return "";
  return value.slice(11, 16);
}

export default function ReschedulePage({ user, unreadNotifCount, p, spesialisList, dokters, errors }: RescheduleProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-800">Reschedule Jadwal</h1>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-xl">
          {errors.length ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <div className="mb-1 font-semibold">Terjadi kesalahan pada input Anda:</div>
              <ul className="list-inside list-disc text-sm">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Nama:</span> {p.nama}
            </div>
            <div>
              <span className="font-semibold">Spesialis:</span> {p.spesialis ?? "-"}
            </div>
            <div>
              <span className="font-semibold">Dokter:</span> {p.dokter_name}
            </div>
            <div>
              <span className="font-semibold">Tanggal/Jam:</span> {p.tanggal_kunjungan ? toDateInputValue(new Date(p.tanggal_kunjungan)) : "-"} {timeValue(p.jam_kunjungan)}
            </div>
            <div>
              <span className="font-semibold">Nomor Antrian:</span> {p.kode_antrian ?? "-"}
            </div>
          </div>

          <form action={`/pendaftaran/${p.id}/reschedule`} method="POST" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="tanggal_kunjungan" className="mb-1 block text-sm font-semibold text-gray-700">
                  Tanggal Kunjungan
                </label>
                <input type="date" id="tanggal_kunjungan" name="tanggal_kunjungan" defaultValue={p.tanggal_kunjungan ? toDateInputValue(new Date(p.tanggal_kunjungan)) : ""} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200" />
              </div>

              <div>
                <label htmlFor="jam_kunjungan" className="mb-1 block text-sm font-semibold text-gray-700">
                  Jam Kunjungan
                </label>
                <input type="time" id="jam_kunjungan" name="jam_kunjungan" defaultValue={timeValue(p.jam_kunjungan)} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200" />
              </div>

              <div>
                <label htmlFor="spesialis" className="mb-1 block text-sm font-semibold text-gray-700">
                  Spesialis Dokter
                </label>
                <select id="spesialis" name="spesialis" defaultValue={p.spesialis ?? ""} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200">
                  <option value="" disabled>
                    -- Pilih Spesialis --
                  </option>
                  {spesialisList.map((sp) => (
                    <option key={sp} value={sp}>
                      {sp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dokter_id" className="mb-1 block text-sm font-semibold text-gray-700">
                  Pilih Dokter
                </label>
                <select id="dokter_id" name="dokter_id" defaultValue={p.dokter_id ?? ""} required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200">
                  <option value="" disabled>
                    -- Pilih Dokter --
                  </option>
                  {dokters.map((dokter) => (
                    <option key={dokter.id} value={dokter.id}>
                      {dokter.name} ({dokter.spesialis ?? "-"})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Nomor antrian akan otomatis diperbarui setelah reschedule.</p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <button type="submit" className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
                Simpan Reschedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
