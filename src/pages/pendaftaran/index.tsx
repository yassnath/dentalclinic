import type { GetServerSideProps } from "next";
import { z } from "zod";
import DashboardLayout from "@/components/DashboardLayout";
import RegistrationForm from "@/components/RegistrationForm";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { countForDoctorOnDate, generateQueueForDoctorAndDate } from "@/lib/queue";
import { toDateInputValue, toHariIndonesia } from "@/lib/date";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { parseFormBody } from "@/lib/http";

const schema = z.object({
  nama: z.string().min(1).max(255),
  tanggal_lahir: z.string().min(1),
  jenis_kelamin: z.string().min(1),
  no_hp: z.string().min(1),
  nik: z.string().min(1),
  alamat: z.string().optional(),
  keluhan: z.string().min(1).max(255),
  tanggal_kunjungan: z.string().min(1),
  spesialis: z.string().min(1),
  dokter_id: z.string().min(1),
  jam_kunjungan: z.string().min(1),
});

type PendaftaranPageProps = {
  user: SessionUser;
  unreadNotifCount: number;
  selectedTanggal: string;
  selectedSpesialis: string;
  spesialisList: string[];
  dokters: Array<{ id: string; name: string; spesialis: string | null }>;
  successMessage?: string;
  antrian?: string;
  errors: string[];
};

async function buildFormData(userId: bigint, selectedTanggal: string, selectedSpesialis: string) {
  const spesialisRows = await prisma.user.findMany({
    where: {
      role: "dokter",
      spesialis: { not: null },
    },
    select: { spesialis: true },
    distinct: ["spesialis"],
    orderBy: { spesialis: "asc" },
  });

  const spesialisList = spesialisRows.map((item) => item.spesialis ?? "").filter(Boolean);
  let dokters: Array<{ id: string; name: string; spesialis: string | null }> = [];

  if (selectedTanggal && selectedSpesialis) {
    const hari = toHariIndonesia(selectedTanggal);
    const candidates = await prisma.user.findMany({
      where: {
        role: "dokter",
        spesialis: selectedSpesialis,
      },
      orderBy: { name: "asc" },
    });

    const jadwals = await prisma.jadwalDokter.findMany({
      where: {
        dokterId: { in: candidates.map((c) => c.id) },
        hari,
      },
    });
    const jadwalIds = new Set(jadwals.map((item) => item.dokterId.toString()));

    const available = [];
    for (const dokter of candidates) {
      if (!jadwalIds.has(dokter.id.toString())) continue;
      const count = await countForDoctorOnDate(dokter.id, selectedTanggal);
      if (count < 5) {
        available.push({
          id: dokter.id.toString(),
          name: dokter.name,
          spesialis: dokter.spesialis,
        });
      }
    }

    dokters = available;
  }

  const unreadNotifCount = await prisma.notifikasi.count({
    where: { userId, dibaca: false },
  });

  return { spesialisList, dokters, unreadNotifCount };
}

export const getServerSideProps: GetServerSideProps<PendaftaranPageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  let selectedTanggal = typeof ctx.query.tanggal_kunjungan === "string" ? ctx.query.tanggal_kunjungan : "";
  let selectedSpesialis = typeof ctx.query.spesialis === "string" ? ctx.query.spesialis : "";
  const errors: string[] = [];

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    selectedTanggal = body.tanggal_kunjungan ?? selectedTanggal;
    selectedSpesialis = body.spesialis ?? selectedSpesialis;

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      errors.push(parsed.error.issues[0]?.message ?? "Input tidak valid.");
    } else {
      const data = parsed.data;
      const alamatFinal = (data.alamat && data.alamat.trim()) || (auth.user.alamat?.trim() ?? "");
      if (!alamatFinal) {
        errors.push("Alamat wajib diisi atau lengkapi alamat di profil.");
      } else {
        const dokterId = BigInt(data.dokter_id);
        const dokter = await prisma.user.findFirst({
          where: { id: dokterId, role: "dokter" },
        });

        if (!dokter) {
          errors.push("Dokter tidak valid.");
        } else if ((dokter.spesialis ?? "") !== data.spesialis) {
          errors.push("Dokter yang dipilih tidak sesuai spesialis.");
        } else {
          const count = await countForDoctorOnDate(dokter.id, data.tanggal_kunjungan);
          if (count >= 5) {
            errors.push("Kuota dokter untuk tanggal tersebut sudah penuh (maksimal 5 pasien).");
          } else {
            const queue = await generateQueueForDoctorAndDate(dokter.id, data.tanggal_kunjungan);
            const tanggalKunjungan = new Date(`${data.tanggal_kunjungan}T00:00:00`);
            const jamKunjungan = new Date(`1970-01-01T${data.jam_kunjungan}:00`);

            const pendaftaran = await prisma.$transaction(async (tx) => {
              const created = await tx.pendaftaran.create({
                data: {
                  userId: auth.user.id,
                  dokterId: dokter.id,
                  nama: data.nama,
                  tanggalLahir: new Date(data.tanggal_lahir),
                  jenisKelamin: data.jenis_kelamin,
                  noHp: data.no_hp,
                  nik: data.nik,
                  keluhan: data.keluhan,
                  tanggalKunjungan,
                  jamKunjungan,
                  spesialis: data.spesialis,
                  nomorUrut: queue.nomor,
                  kodeAntrian: queue.kode,
                  status: "menunggu_konfirmasi",
                },
              });

              await tx.notifikasi.create({
                data: {
                  userId: auth.user.id,
                  judul: "Pendaftaran Berhasil",
                  pesan: `Pendaftaran berhasil dibuat. Nomor antrian Anda: ${queue.kode}.`,
                  tipe: "pendaftaran",
                  link: "/pendaftaran-saya",
                  dibaca: false,
                },
              });
              return created;
            });

            return {
              redirect: {
                destination: `/pendaftaran?success=${encodeURIComponent("Pendaftaran berhasil dibuat.")}&antrian=${encodeURIComponent(
                  pendaftaran.kodeAntrian ?? queue.kode,
                )}`,
                permanent: false,
              },
            };
          }
        }
      }
    }
  }

  const data = await buildFormData(auth.user.id, selectedTanggal, selectedSpesialis);

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount: data.unreadNotifCount,
      selectedTanggal,
      selectedSpesialis,
      spesialisList: data.spesialisList,
      dokters: data.dokters,
      successMessage: typeof ctx.query.success === "string" ? ctx.query.success : "",
      antrian: typeof ctx.query.antrian === "string" ? ctx.query.antrian : "",
      errors: errors.length ? errors : typeof ctx.query.error === "string" ? [ctx.query.error] : [],
    },
  };
};

export default function PendaftaranPage({
  user,
  unreadNotifCount,
  selectedTanggal,
  selectedSpesialis,
  spesialisList,
  dokters,
  successMessage,
  antrian,
  errors,
}: PendaftaranPageProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <RegistrationForm
        actionPath="/pendaftaran"
        selectedTanggal={selectedTanggal}
        selectedSpesialis={selectedSpesialis}
        spesialisList={spesialisList}
        dokters={dokters}
        prefNama={user.name}
        prefTgl={user.tanggal_lahir ? toDateInputValue(new Date(user.tanggal_lahir)) : ""}
        prefJk={user.jenis_kelamin ?? ""}
        prefHp={user.no_hp ?? user.telepon ?? ""}
        prefNik={user.nik ?? ""}
        prefAlamat={user.alamat ?? ""}
        errorMessages={errors}
        successMessage={successMessage}
        antrian={antrian}
      />
    </DashboardLayout>
  );
}
