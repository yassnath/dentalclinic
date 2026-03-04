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
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return {
        props: { user: toSessionUser(auth.user), error: "Input pasien tidak valid." },
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
        props: { user: toSessionUser(auth.user), error: "Data pasien sudah terdaftar (email/username/nik)." },
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

  return {
    props: {
      user: toSessionUser(auth.user),
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

export default function AdminPasienCreatePage({ user, error }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-800">Tambah Pasien Baru</h1>
<form action="/admin/pasien" method="POST" className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div className="mb-4">
            <label htmlFor="nama" className="mb-2 block font-bold text-gray-700">
              Nama Lengkap
            </label>
            <input type="text" name="nama" id="nama" required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="mb-2 block font-bold text-gray-700">
              Username
            </label>
            <input type="text" name="username" id="username" required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block font-bold text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="tanggal_lahir" className="mb-2 block font-bold text-gray-700">
              Tanggal Lahir
            </label>
            <input type="date" name="tanggal_lahir" id="tanggal_lahir" required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="jenis_kelamin" className="mb-2 block font-bold text-gray-700">
              Jenis Kelamin
            </label>
            <select name="jenis_kelamin" id="jenis_kelamin" required className="w-full rounded border px-3 py-2 text-gray-700">
              <option value="">-- Pilih Jenis Kelamin --</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="no_hp" className="mb-2 block font-bold text-gray-700">
              Nomor HP
            </label>
            <input type="text" name="no_hp" id="no_hp" required inputMode="numeric" pattern="^[0-9]{9,15}$" className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="nik" className="mb-2 block font-bold text-gray-700">
              NIK
            </label>
            <input type="text" name="nik" id="nik" required inputMode="numeric" pattern="^[0-9]{16}$" className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block font-bold text-gray-700">
              Password
            </label>
            <PasswordInput name="password" id="password" required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
