import type { GetServerSideProps } from "next";
import bcrypt from "bcryptjs";
import { z } from "zod";
import DashboardLayout from "@/components/DashboardLayout";
import PasswordInput from "@/components/PasswordInput";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type Props = {
  user: SessionUser;
  error?: string;
};

const schema = z.object({
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
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return {
        props: { user: toSessionUser(auth.user), error: "Input resepsionis tidak valid." },
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
        props: { user: toSessionUser(auth.user), error: "Email atau username sudah dipakai." },
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

  return {
    props: {
      user: toSessionUser(auth.user),
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

export default function AdminResepsionisCreatePage({ user, error }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-700">Tambah Resepsionis Baru</h1>
        <div className="rounded-lg bg-white p-6 shadow-md">
<form method="POST" action="/admin/resepsionis">
            <div className="mb-4">
              <label htmlFor="nama" className="mb-1 block text-sm font-semibold">
                Nama Lengkap
              </label>
              <input type="text" name="nama" id="nama" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="Nama lengkap" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm font-semibold">
                Email
              </label>
              <input type="email" name="email" id="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="Email aktif" />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="mb-1 block text-sm font-semibold">
                Username
              </label>
              <input type="text" name="username" id="username" required className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" placeholder="Username unik" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-1 block text-sm font-semibold">
                Password
              </label>
              <PasswordInput
                name="password"
                id="password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder="Minimal 6 karakter"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
                <i className="fas fa-save mr-2" /> Simpan Resepsionis
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
