import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDateTime } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  nama: string;
  created_at: string | null;
};

type Props = {
  user: SessionUser;
  pendaftarans: Row[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const pendaftarans = await prisma.pendaftaran.findMany({
      select: {
        id: true,
        nama: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { pendaftarans };
  };

  const cacheKey = makeSsrCacheKey(`resepsionis-pendaftaran:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      pendaftarans: data.pendaftarans.map((pendaftaran) => ({
        id: pendaftaran.id.toString(),
        nama: pendaftaran.nama || pendaftaran.user?.name || "-",
        created_at: pendaftaran.createdAt ? pendaftaran.createdAt.toISOString() : null,
      })),
    },
  };
};

export default function ResepsionisPendaftaranPage({ user, pendaftarans }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Daftar Pendaftaran Pasien</h1>

        {pendaftarans.length === 0 ? (
          <p className="text-gray-600">Belum ada data pendaftaran.</p>
        ) : (
          <table className="responsive-table min-w-full rounded bg-white shadow theme-table">
            <thead className="bg-blue-600 text-center text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nama Pasien</th>
                <th className="px-4 py-3">Tanggal Daftar</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pendaftarans.map((pendaftaran, index) => (
                <tr key={pendaftaran.id} className="border-b text-center hover:bg-gray-100">
                  <td data-label="#" className="px-4 py-2">
                    {index + 1}
                  </td>
                  <td data-label="Nama Pasien" className="px-4 py-2">
                    {pendaftaran.nama}
                  </td>
                  <td data-label="Tanggal Daftar" className="px-4 py-2">
                    {pendaftaran.created_at ? formatDateTime(new Date(pendaftaran.created_at), "dd MMM yyyy HH:mm") : "-"}
                  </td>
                  <td data-label="Aksi" className="px-4 py-2">
                    <a
                      href={`/resepsionis/pendaftaran/${pendaftaran.id}/cetak`}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Cetak Kartu
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
