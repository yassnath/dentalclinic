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
  pasiens: Row[];
  success?: string;
};

const createSchema = z.object({
  nama: z.string().min(2).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email().max(255),
  tanggal_lahir: z.string().min(1),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
  no_hp: z.string().regex(/^[0-9]{9,15}$/),
  nik: z.string().regex(/^[0-9]{16}$/),
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
          destination: "/admin/pasien/create?error=Input%20pasien%20tidak%20valid.",
          permanent: false,
        },
      };
    }

    const data = parsed.data;
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email.toLowerCase() }, { nik: data.nik }],
      },
      select: { id: true },
    });
    if (exists) {
      return {
        redirect: {
          destination: "/admin/pasien/create?error=Data%20pasien%20sudah%20terdaftar%20(email/username/nik).",
          permanent: false,
        },
      };
    }

    await prisma.user.create({
      data: {
        name: data.nama,
        username: data.username,
        email: data.email.toLowerCase(),
        role: "pasien",
        tanggalLahir: new Date(data.tanggal_lahir),
        jenisKelamin: data.jenis_kelamin,
        noHp: data.no_hp,
        nik: data.nik,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    return {
      redirect: {
        destination: "/admin/pasien?success=Pasien%20berhasil%20ditambahkan.",
        permanent: false,
      },
    };
  }

  const loadData = async () => {
    const pasiens = await prisma.user.findMany({
      where: { role: "pasien" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    return { pasiens };
  };

  const cacheKey = makeSsrCacheKey("admin-pasien-index", ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      pasiens: data.pasiens.map((pasien) => ({
        id: pasien.id.toString(),
        name: pasien.name,
        email: pasien.email,
        username: pasien.username,
        created_at: pasien.createdAt ? pasien.createdAt.toISOString() : null,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

export default function AdminPasienIndexPage({ user, pasiens, success }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Daftar Pasien</h1>
<div className="mb-4 text-right">
          <a href="/admin/pasien/create" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">
            <i className="fas fa-plus mr-2" /> Tambah Pasien
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
                <th className="px-4 py-3">Tanggal Daftar</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pasiens.length ? (
                pasiens.map((pasien, index) => (
                  <tr key={pasien.id} className="border-b text-center hover:bg-gray-100">
                    <td data-label="ID" className="px-4 py-3">
                      {index + 1}
                    </td>
                    <td data-label="Nama" className="px-4 py-3">
                      {pasien.name}
                    </td>
                    <td data-label="Email" className="px-4 py-3">
                      {pasien.email}
                    </td>
                    <td data-label="Username" className="px-4 py-3">
                      {pasien.username}
                    </td>
                    <td data-label="Tanggal Daftar" className="px-4 py-3">
                      {pasien.created_at ? formatDate(new Date(pasien.created_at), "dd MMM yyyy") : "-"}
                    </td>
                    <td data-label="Aksi" className="px-4 py-3">
                      <div className="flex items-center justify-center gap-3">
                        <a
                          href={`/admin/pasien/${pasien.id}/edit`}
                          data-confirm="Yakin ingin membuka halaman edit pasien ini?"
                          data-confirm-title="Konfirmasi Edit"
                          data-confirm-confirm-label="Ya, Edit"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <i className="fas fa-edit mr-1" /> Edit
                        </a>
                        <form
                          action={`/admin/pasien/${pasien.id}`}
                          method="POST"
                          data-confirm="Yakin ingin menghapus pasien ini? Data yang dihapus tidak bisa dikembalikan."
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
                    Tidak ada pasien terdaftar.
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
