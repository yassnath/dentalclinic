import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  nama_pasien: string;
  diagnosa: string;
  tindakan: string;
  catatan: string | null;
  tanggal: string | null;
};

type Props = {
  user: SessionUser;
  rekamMedisList: Row[];
  success?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const rekamMedisList = await prisma.rekamMedis.findMany({
      where: { dokterId: auth.user.id },
      select: {
        id: true,
        diagnosa: true,
        tindakan: true,
        catatan: true,
        createdAt: true,
        pendaftaran: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { rekamMedisList };
  };

  const cacheKey = makeSsrCacheKey(`dokter-rekam-medis:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      rekamMedisList: data.rekamMedisList.map((item) => ({
        id: item.id.toString(),
        nama_pasien: item.pendaftaran?.nama ?? "-",
        diagnosa: item.diagnosa,
        tindakan: item.tindakan,
        catatan: item.catatan,
        tanggal: item.createdAt ? item.createdAt.toISOString() : null,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

export default function DaftarRekamMedisPage({ user, rekamMedisList, success }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-700">Daftar Rekam Medis</h1>
{rekamMedisList.length === 0 ? (
          <p className="text-gray-600">Belum ada rekam medis yang diinput.</p>
        ) : (
          <div className="rounded-lg bg-white p-6 shadow">
            <table className="responsive-table min-w-full divide-y divide-gray-200 text-sm theme-table">
              <thead className="bg-blue-100 text-center text-blue-800">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Nama Pasien</th>
                  <th className="px-4 py-2">Diagnosa</th>
                  <th className="px-4 py-2">Tindakan</th>
                  <th className="px-4 py-2">Catatan</th>
                  <th className="px-4 py-2">Tanggal Input</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {rekamMedisList.map((rekam, index) => (
                  <tr key={rekam.id} className="hover:bg-gray-50">
                    <td data-label="No" className="px-4 py-2">
                      {index + 1}
                    </td>
                    <td data-label="Nama Pasien" className="px-4 py-2">
                      {rekam.nama_pasien}
                    </td>
                    <td data-label="Diagnosa" className="px-4 py-2">
                      {rekam.diagnosa}
                    </td>
                    <td data-label="Tindakan" className="px-4 py-2">
                      {rekam.tindakan}
                    </td>
                    <td data-label="Catatan" className="px-4 py-2">
                      {rekam.catatan ?? "-"}
                    </td>
                    <td data-label="Tanggal Input" className="px-4 py-2">
                      {rekam.tanggal ? formatDate(new Date(rekam.tanggal), "dd MMM yyyy") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
