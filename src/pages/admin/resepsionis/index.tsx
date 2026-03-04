import type { GetServerSideProps } from "next";
import bcrypt from "bcryptjs";
import { z } from "zod";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";
import { parseFormBody } from "@/lib/http";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  name: string;
  email: string;
  username: string;
  created_at: string | null;
};

type Props = {
  user: SessionUser;
  resepsionis: Row[];
  success?: string;
};

const createSchema = z.object({
  nama: z.string().min(2).max(255),
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(6),
});

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return {
        redirect: {
          destination: "/admin/resepsionis/create?error=Input%20resepsionis%20tidak%20valid.",
          permanent: false,
        },
      };
    }

    const data = parsed.data;
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email.toLowerCase() }, { username: data.username }],
      },
      select: { id: true },
    });
    if (exists) {
      return {
        redirect: {
          destination: "/admin/resepsionis/create?error=Email%20atau%20username%20sudah%20dipakai.",
          permanent: false,
        },
      };
    }

    await prisma.user.create({
      data: {
        name: data.nama,
        email: data.email.toLowerCase(),
        username: data.username,
        password: await bcrypt.hash(data.password, 10),
        role: "resepsionis",
      },
    });

    return {
      redirect: {
        destination: "/admin/resepsionis?success=Resepsionis%20berhasil%20ditambahkan.",
        permanent: false,
      },
    };
  }

  const loadData = async () => {
    const resepsionis = await prisma.user.findMany({
      where: { role: "resepsionis" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    return { resepsionis };
  };

  const cacheKey = makeSsrCacheKey("admin-resepsionis-index", ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      resepsionis: data.resepsionis.map((row) => ({
        id: row.id.toString(),
        name: row.name,
        email: row.email,
        username: row.username,
        created_at: row.createdAt ? row.createdAt.toISOString() : null,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

export default function AdminResepsionisIndexPage({ user, resepsionis, success }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Daftar Resepsionis</h1>
<div className="mb-4 text-right">
          <a href="/admin/resepsionis/create" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">
            <i className="fas fa-plus mr-2" /> Tambah Resepsionis
          </a>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="responsive-table min-w-full table-auto text-sm theme-table">
            <thead className="bg-blue-600 text-center text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Tanggal Daftar</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {resepsionis.length ? (
                resepsionis.map((row, index) => (
                  <tr key={row.id} className="border-b text-center hover:bg-gray-100">
                    <td data-label="#" className="px-4 py-3">
                      {index + 1}
                    </td>
                    <td data-label="Nama" className="px-4 py-3">
                      {row.name}
                    </td>
                    <td data-label="Email" className="px-4 py-3">
                      {row.email}
                    </td>
                    <td data-label="Username" className="px-4 py-3">
                      {row.username}
                    </td>
                    <td data-label="Tanggal Daftar" className="px-4 py-3">
                      {row.created_at ? formatDate(new Date(row.created_at), "dd MMM yyyy") : "-"}
                    </td>
                    <td data-label="Aksi" className="px-4 py-3">
                      <div className="flex items-center justify-center gap-3">
                        <a
                          href={`/admin/resepsionis/${row.id}/edit`}
                          data-confirm="Yakin ingin membuka halaman edit resepsionis ini?"
                          data-confirm-title="Konfirmasi Edit"
                          data-confirm-confirm-label="Ya, Edit"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <i className="fas fa-edit mr-1" /> Edit
                        </a>
                        <form
                          action={`/admin/resepsionis/${row.id}`}
                          method="POST"
                          data-confirm="Yakin ingin menghapus resepsionis ini? Data yang dihapus tidak bisa dikembalikan."
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
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    Tidak ada data resepsionis.
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
