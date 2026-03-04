import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";

type Props = {
  user: SessionUser;
  pendaftar: {
    id: string;
    nama: string;
    tanggal_kunjungan: string | null;
    jam_kunjungan: string | null;
    dokter: string;
    diterima_oleh: string;
    kode_antrian: string | null;
    keluhan: string;
    status: string;
  };
};

function timeLabel(value: string | null) {
  if (!value) return "";
  return value.slice(11, 16);
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const pendaftar = await prisma.pendaftaran.findFirst({
    where: {
      id,
      OR: [{ dokterId: auth.user.id }, { diterimaOlehDokterId: auth.user.id }],
    },
    select: {
      id: true,
      nama: true,
      tanggalKunjungan: true,
      jamKunjungan: true,
      kodeAntrian: true,
      keluhan: true,
      status: true,
      dokter: {
        select: {
          name: true,
        },
      },
      diterimaOlehDokter: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!pendaftar) {
    return {
      redirect: {
        destination: "/dokter/pendaftar",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      pendaftar: {
        id: pendaftar.id.toString(),
        nama: pendaftar.nama,
        tanggal_kunjungan: pendaftar.tanggalKunjungan ? pendaftar.tanggalKunjungan.toISOString() : null,
        jam_kunjungan: pendaftar.jamKunjungan ? pendaftar.jamKunjungan.toISOString() : null,
        dokter: pendaftar.dokter?.name ?? "-",
        diterima_oleh: pendaftar.diterimaOlehDokter?.name ?? "-",
        kode_antrian: pendaftar.kodeAntrian,
        keluhan: pendaftar.keluhan,
        status: pendaftar.status,
      },
    },
  };
};

export default function DokterPendaftarDetailPage({ user, pendaftar }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-700">Detail Pendaftar Konsultasi</h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div>
              <span className="font-semibold">Nama Pasien:</span> {pendaftar.nama}
            </div>
            <div>
              <span className="font-semibold">Tanggal Kunjungan:</span>{" "}
              {pendaftar.tanggal_kunjungan ? formatDate(new Date(pendaftar.tanggal_kunjungan), "dd-MM-yyyy") : "-"}{" "}
              {timeLabel(pendaftar.jam_kunjungan)}
            </div>
            <div>
              <span className="font-semibold">Dokter Tujuan:</span> {pendaftar.dokter}
            </div>
            <div>
              <span className="font-semibold">Diterima Oleh:</span> {pendaftar.diterima_oleh}
            </div>
            <div>
              <span className="font-semibold">No Antrian:</span> {pendaftar.kode_antrian ?? "-"}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {pendaftar.status}
            </div>
            <div className="md:col-span-2">
              <span className="font-semibold">Keluhan:</span> {pendaftar.keluhan}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <form action={`/dokter/pendaftar/${pendaftar.id}/status`} method="POST" className="flex items-center gap-2">
              <select
                name="status"
                defaultValue={pendaftar.status || "menunggu_konfirmasi"}
                className="rounded border px-3 py-2 text-sm"
              >
                <option value="menunggu_konfirmasi">Menunggu konfirmasi</option>
                <option value="diterima">Diterima</option>
                <option value="ditolak">Ditolak</option>
              </select>
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                Update Status
              </button>
            </form>

            <a href={`/dokter/pendaftar/${pendaftar.id}/reschedule`} className="rounded bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600">
              Reschedule
            </a>
            <a href="/dokter/pendaftar" className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
              Kembali
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
