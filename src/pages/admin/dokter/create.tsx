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
  username: z.string().min(3).max(50),
  email: z.string().email(),
  spesialis: z.string().min(1).max(255),
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
        props: {
          user: toSessionUser(auth.user),
          error: "Data dokter tidak valid.",
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
        props: {
          user: toSessionUser(auth.user),
          error: "Email atau username sudah digunakan.",
        },
      };
    }

    await prisma.user.create({
      data: {
        name: data.nama,
        username: data.username,
        email: data.email.toLowerCase(),
        spesialis: data.spesialis,
        password: await bcrypt.hash(data.password, 10),
        role: "dokter",
      },
    });

    return {
      redirect: {
        destination: "/admin/dokter?success=Dokter%20berhasil%20ditambahkan.",
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

export default function AdminDokterCreatePage({ user, error }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-800">Tambah Dokter Baru</h1>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
<form action="/admin/dokter/store" method="POST" className="space-y-6">
            <div>
              <label htmlFor="nama" className="mb-1 block text-sm font-semibold text-gray-700">
                Nama Lengkap
              </label>
              <input type="text" name="nama" id="nama" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200" />
            </div>

            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input type="text" name="username" id="username" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200" />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input type="email" name="email" id="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200" />
            </div>

            <div>
              <label htmlFor="spesialis" className="mb-1 block text-sm font-semibold text-gray-700">
                Spesialis
              </label>
              <input type="text" name="spesialis" id="spesialis" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200" />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <PasswordInput
                name="password"
                id="password"
                required
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="pt-4 text-center">
              <button type="submit" className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
                Simpan Dokter
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
