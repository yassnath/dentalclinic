import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  name: string;
  email: string;
  username: string;
  spesialis: string | null;
  created_at: string | null;
};

type Props = {
  user: SessionUser;
  dokters: Row[];
  success?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const dokters = await prisma.user.findMany({
      where: { role: "dokter" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        spesialis: true,
        createdAt: true,
      },
    });
    return { dokters };
  };

  const cacheKey = makeSsrCacheKey("admin-dokter-index", ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      dokters: data.dokters.map((dokter) => ({
        id: dokter.id.toString(),
        name: dokter.name,
        email: dokter.email,
        username: dokter.username,
        spesialis: dokter.spesialis,
        created_at: dokter.createdAt ? dokter.createdAt.toISOString() : null,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

export default function AdminDokterIndexPage({ user, dokters, success }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Daftar Dokter</h1>
<div className="mb-4 text-right">
          <a href="/admin/dokter/create" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">
            <i className="fas fa-plus mr-2" /> Tambah Dokter
          </a>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="responsive-table min-w-full table-auto text-sm theme-table">
            <thead className="bg-blue-600 text-center text-white">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Spesialis</th>
                <th className="px-4 py-3">Tanggal Daftar</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dokters.length ? (
                dokters.map((dokter, index) => (
                  <tr key={dokter.id} className="border-b text-center hover:bg-gray-100">
                    <td data-label="ID" className="px-4 py-3">
                      {index + 1}
                    </td>
                    <td data-label="Nama" className="px-4 py-3">
                      {dokter.name}
                    </td>
                    <td data-label="Email" className="px-4 py-3">
                      {dokter.email}
                    </td>
                    <td data-label="Username" className="px-4 py-3">
                      {dokter.username}
                    </td>
                    <td data-label="Spesialis" className="px-4 py-3">
                      {dokter.spesialis ?? "-"}
                    </td>
                    <td data-label="Tanggal Daftar" className="px-4 py-3">
                      {dokter.created_at ? formatDate(new Date(dokter.created_at), "dd MMM yyyy") : "-"}
                    </td>
                    <td data-label="Aksi" className="px-4 py-3">
                      <div className="flex items-center justify-center gap-3">
                        <a
                          href={`/admin/dokter/${dokter.id}/edit`}
                          data-confirm="Yakin ingin membuka halaman edit dokter ini?"
                          data-confirm-title="Konfirmasi Edit"
                          data-confirm-confirm-label="Ya, Edit"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <i className="fas fa-edit mr-1" /> Edit
                        </a>
                        <form
                          action={`/admin/dokter/${dokter.id}`}
                          method="POST"
                          data-confirm="Yakin ingin menghapus dokter ini? Data yang dihapus tidak bisa dikembalikan."
                          data-confirm-title="Konfirmasi Hapus"
                          data-confirm-confirm-label="Ya, Hapus"
                        >
                          <input type="hidden" name="_method" value="DELETE" />
                          <button type="submit" className="inline-flex items-center text-red-600 hover:underline">
                            <i className="fas fa-trash mr-1" /> Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    Tidak ada dokter terdaftar.
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
