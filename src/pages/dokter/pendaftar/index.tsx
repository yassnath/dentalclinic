import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type PendaftarRow = {
  id: string;
  nama: string;
  tanggal_kunjungan: string | null;
  jam_kunjungan: string | null;
  diterima_oleh: string;
  kode_antrian: string | null;
  keluhan: string;
  status: string;
};

type PageProps = {
  user: SessionUser;
  pendaftars: PendaftarRow[];
  success?: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const pendaftars = await prisma.pendaftaran.findMany({
      where: {
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
        diterimaOlehDokter: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { pendaftars };
  };

  const cacheKey = makeSsrCacheKey(`dokter-pendaftar:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      pendaftars: data.pendaftars.map((item) => ({
        id: item.id.toString(),
        nama: item.nama,
        tanggal_kunjungan: item.tanggalKunjungan ? item.tanggalKunjungan.toISOString() : null,
        jam_kunjungan: item.jamKunjungan ? item.jamKunjungan.toISOString() : null,
        diterima_oleh: item.diterimaOlehDokter?.name ?? "-",
        kode_antrian: item.kodeAntrian,
        keluhan: item.keluhan,
        status: item.status,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

function timeValue(value: string | null) {
  if (!value) return "";
  return value.slice(11, 16);
}

export default function PendaftarDokterPage({ user, pendaftars, success }: PageProps) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-700">Daftar Pendaftar Konsultasi</h1>
<div className="rounded-lg bg-white p-6 shadow">
          <table className="responsive-table min-w-full divide-y divide-gray-200 text-sm theme-table">
            <thead className="bg-blue-100 text-center text-blue-800">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama Pasien</th>
                <th className="px-4 py-2">Tanggal Kunjungan</th>
                <th className="px-4 py-2">Diterima Oleh</th>
                <th className="px-4 py-2">No Antrian</th>
                <th className="px-4 py-2">Keluhan</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Reschedule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center">
              {pendaftars.length ? (
                pendaftars.map((p, index) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td data-label="No" className="px-4 py-2">
                      {index + 1}
                    </td>
                    <td data-label="Nama Pasien" className="px-4 py-2">
                      {p.nama}
                    </td>
                    <td data-label="Tanggal Kunjungan" className="px-4 py-2">
                      {p.tanggal_kunjungan ? formatDate(new Date(p.tanggal_kunjungan), "dd-MM-yyyy") : "-"} {timeValue(p.jam_kunjungan)}
                    </td>
                    <td data-label="Diterima Oleh" className="px-4 py-2">
                      {p.diterima_oleh}
                    </td>
                    <td data-label="No Antrian" className="px-4 py-2">
                      {p.kode_antrian ?? "-"}
                    </td>
                    <td data-label="Keluhan" className="px-4 py-2">
                      {p.keluhan}
                    </td>
                    <td data-label="Status" className="px-4 py-2">
                      <form action={`/dokter/pendaftar/${p.id}/status`} method="POST">
                        <select name="status" defaultValue={p.status || "menunggu_konfirmasi"} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 focus:outline-none" onChange={(e) => (e.currentTarget.form?.submit())}>
                          <option value="menunggu_konfirmasi">Menunggu konfirmasi</option>
                          <option value="diterima">Diterima</option>
                          <option value="ditolak">Ditolak</option>
                        </select>
                      </form>
                    </td>
                    <td data-label="Reschedule" className="px-4 py-2 text-center">
                      <a href={`/dokter/pendaftar/${p.id}/reschedule`} className="text-sm text-blue-600 hover:underline">
                        Reschedule
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                    Belum ada pendaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
