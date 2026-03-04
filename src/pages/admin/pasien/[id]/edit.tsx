import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import PasswordInput from "@/components/PasswordInput";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { toDateInputValue } from "@/lib/date";

type Props = {
  user: SessionUser;
  pasien: {
    id: string;
    name: string;
    username: string;
    email: string;
    tanggal_lahir: string | null;
    jenis_kelamin: string | null;
    no_hp: string | null;
    alamat: string | null;
    nik: string | null;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const pasien = await prisma.user.findFirst({
    where: { id, role: "pasien" },
  });
  if (!pasien) {
    return {
      redirect: {
        destination: "/admin/pasien",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      pasien: {
        id: pasien.id.toString(),
        name: pasien.name,
        username: pasien.username,
        email: pasien.email,
        tanggal_lahir: pasien.tanggalLahir ? pasien.tanggalLahir.toISOString() : null,
        jenis_kelamin: pasien.jenisKelamin,
        no_hp: pasien.noHp ?? pasien.telepon,
        alamat: pasien.alamat,
        nik: pasien.nik,
      },
    },
  };
};

export default function AdminPasienEditPage({ user, pasien }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-800">Edit Pasien</h1>

        <form
          action={`/admin/pasien/${pasien.id}`}
          method="POST"
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          data-confirm="Yakin ingin menyimpan perubahan data pasien ini?"
          data-confirm-title="Konfirmasi Edit"
          data-confirm-confirm-label="Ya, Simpan"
        >
          <input type="hidden" name="_method" value="PUT" />

          <div className="mb-4">
            <label htmlFor="nama" className="mb-2 block font-bold text-gray-700">
              Nama Lengkap
            </label>
            <input type="text" name="nama" id="nama" defaultValue={pasien.name} required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="mb-2 block font-bold text-gray-700">
              Username
            </label>
            <input type="text" name="username" id="username" defaultValue={pasien.username} required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block font-bold text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" defaultValue={pasien.email} required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="tanggal_lahir" className="mb-2 block font-bold text-gray-700">
              Tanggal Lahir
            </label>
            <input type="date" name="tanggal_lahir" id="tanggal_lahir" defaultValue={pasien.tanggal_lahir ? toDateInputValue(new Date(pasien.tanggal_lahir)) : ""} required className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="jenis_kelamin" className="mb-2 block font-bold text-gray-700">
              Jenis Kelamin
            </label>
            <select name="jenis_kelamin" id="jenis_kelamin" defaultValue={pasien.jenis_kelamin ?? ""} required className="w-full rounded border px-3 py-2 text-gray-700">
              <option value="">-- Pilih Jenis Kelamin --</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="no_hp" className="mb-2 block font-bold text-gray-700">
              Nomor HP
            </label>
            <input type="text" name="no_hp" id="no_hp" defaultValue={pasien.no_hp ?? ""} required pattern="^[0-9]{9,15}$" className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-4">
            <label htmlFor="alamat" className="mb-2 block font-bold text-gray-700">
              Alamat
            </label>
            <textarea name="alamat" id="alamat" rows={3} className="w-full rounded border px-3 py-2 text-gray-700" defaultValue={pasien.alamat ?? ""} />
          </div>
          <div className="mb-4">
            <label htmlFor="nik" className="mb-2 block font-bold text-gray-700">
              NIK
            </label>
            <input type="text" name="nik" id="nik" defaultValue={pasien.nik ?? ""} required pattern="^[0-9]{16}$" className="w-full rounded border px-3 py-2 text-gray-700" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="mb-2 block font-bold text-gray-700">
              Password
            </label>
            <PasswordInput
              name="password"
              id="password"
              placeholder="Kosongkan jika tidak ingin mengubah password"
              className="w-full rounded border px-3 py-2 text-gray-700"
            />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Update
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
