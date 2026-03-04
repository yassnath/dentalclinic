import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  nama: string;
  tanggal_lahir: string | null;
  jenis_kelamin: string;
};

type Props = {
  user: SessionUser;
  pendaftars: Row[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const pendaftars = await prisma.pendaftaran.findMany({
      where: {
        status: "diterima",
        OR: [{ dokterId: auth.user.id }, { diterimaOlehDokterId: auth.user.id }],
      },
      select: {
        id: true,
        nama: true,
        tanggalLahir: true,
        jenisKelamin: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { pendaftars };
  };

  const cacheKey = makeSsrCacheKey(`dokter-pasien:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      pendaftars: data.pendaftars.map((p) => ({
        id: p.id.toString(),
        nama: p.nama,
        tanggal_lahir: p.tanggalLahir ? p.tanggalLahir.toISOString() : null,
        jenis_kelamin: p.jenisKelamin ?? "-",
      })),
    },
  };
};

export default function DokterDataPasienPage({ user, pendaftars }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-700">Data Pasien & Input Rekam Medis</h1>

        <div className="mb-10 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Daftar Pasien (Status: Diterima)</h2>
          <table className="responsive-table min-w-full divide-y divide-gray-200 text-sm theme-table">
            <thead className="bg-blue-100 text-center text-blue-800">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama Pasien</th>
                <th className="px-4 py-2">Tanggal Lahir</th>
                <th className="px-4 py-2">Jenis Kelamin</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center">
              {pendaftars.length ? (
                pendaftars.map((pendaftar, index) => (
                  <tr key={pendaftar.id} className="hover:bg-gray-50">
                    <td data-label="No" className="px-4 py-2">
                      {index + 1}
                    </td>
                    <td data-label="Nama Pasien" className="px-4 py-2">
                      {pendaftar.nama}
                    </td>
                    <td data-label="Tanggal Lahir" className="px-4 py-2">
                      {pendaftar.tanggal_lahir ? formatDate(new Date(pendaftar.tanggal_lahir), "dd-MM-yyyy") : "-"}
                    </td>
                    <td data-label="Jenis Kelamin" className="px-4 py-2">
                      {pendaftar.jenis_kelamin}
                    </td>
                    <td data-label="Aksi" className="px-4 py-2 text-center">
                      <a href={`/dokter/rekam_medis/${pendaftar.id}`} className="text-sm text-blue-600 hover:underline">
                        Isi Rekam Medis
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                    Tidak ada pasien dengan status Diterima.
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
