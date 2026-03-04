import type { GetServerSideProps } from "next";
import { z } from "zod";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";
import { countForDoctorOnDate, generateQueueForDoctorAndDate } from "@/lib/queue";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { toDateInputValue } from "@/lib/date";

type Props = {
  user: SessionUser;
  p: {
    id: string;
    nama: string;
    spesialis: string | null;
    dokter_name: string;
    tanggal_kunjungan: string | null;
    jam_kunjungan: string | null;
    kode_antrian: string | null;
  };
  errors: string[];
};

const schema = z.object({
  tanggal_kunjungan: z.string().min(1),
  jam_kunjungan: z.string().min(1),
  dokter_id: z.string().min(1),
});

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const errors: string[] = [];

  const pendaftaran = await prisma.pendaftaran.findFirst({
    where: {
      id,
      OR: [{ dokterId: auth.user.id }, { diterimaOlehDokterId: auth.user.id }],
    },
    include: { dokter: true },
  });

  if (!pendaftaran) {
    return {
      redirect: {
        destination: "/dokter/pendaftar",
        permanent: false,
      },
    };
  }

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      errors.push("Input reschedule tidak valid.");
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
      } else if ((dokter.spesialis ?? "") !== (pendaftaran.spesialis ?? "")) {
        errors.push("Dokter yang dipilih tidak sesuai spesialis pendaftaran.");
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
          const updated = await prisma.pendaftaran.update({
            where: { id: pendaftaran.id },
            data: {
              dokterId: dokter.id,
              tanggalKunjungan: new Date(`${data.tanggal_kunjungan}T00:00:00`),
              jamKunjungan: new Date(`1970-01-01T${data.jam_kunjungan}:00`),
              nomorUrut: queue.nomor,
              kodeAntrian: queue.kode,
              status: "menunggu_konfirmasi",
            },
          });

          if (updated.userId) {
            await prisma.notifikasi.create({
              data: {
                userId: updated.userId,
                judul: "Reschedule Jadwal",
                pesan: `Jadwal Anda direschedule. Nomor antrian baru: ${updated.kodeAntrian ?? queue.kode}`,
                tipe: "pendaftaran",
                link: "/notifikasi",
                dibaca: false,
              },
            });
          }

          return {
            redirect: {
              destination: "/dokter/pendaftar?success=Reschedule%20berhasil.%20Nomor%20antrian%20diperbarui.",
              permanent: false,
            },
          };
        }
      }
    }
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      p: {
        id: pendaftaran.id.toString(),
        nama: pendaftaran.nama,
        spesialis: pendaftaran.spesialis,
        dokter_name: pendaftaran.dokter?.name ?? "-",
        tanggal_kunjungan: pendaftaran.tanggalKunjungan ? pendaftaran.tanggalKunjungan.toISOString() : null,
        jam_kunjungan: pendaftaran.jamKunjungan ? pendaftaran.jamKunjungan.toISOString() : null,
        kode_antrian: pendaftaran.kodeAntrian,
      },
      errors,
    },
  };
};

function timeValue(value: string | null) {
  if (!value) return "";
  return value.slice(11, 16);
}

export default function RescheduleDokterPage({ user, p, errors }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-700">Reschedule Jadwal Pasien</h1>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
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
              <span className="font-semibold">Nama Pasien:</span> {p.nama}
            </div>
            <div>
              <span className="font-semibold">Spesialis:</span> {p.spesialis ?? "-"}
            </div>
            <div>
              <span className="font-semibold">Dokter Saat Ini:</span> {p.dokter_name}
            </div>
            <div>
              <span className="font-semibold">Tanggal/Jam:</span> {p.tanggal_kunjungan ? toDateInputValue(new Date(p.tanggal_kunjungan)) : "-"} {timeValue(p.jam_kunjungan)}
            </div>
            <div>
              <span className="font-semibold">Nomor Antrian:</span> {p.kode_antrian ?? "-"}
            </div>
          </div>

          <form action={`/dokter/pendaftar/${p.id}/reschedule`} method="POST" className="space-y-6">
            <input type="hidden" name="dokter_id" value={user.id} />
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
            </div>
            <p className="mt-1 text-xs text-gray-500">Nomor antrian akan otomatis berubah setelah reschedule.</p>
            <div className="pt-2 text-right">
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
                Simpan Reschedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
