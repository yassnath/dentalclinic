import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import PasswordInput from "@/components/PasswordInput";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type Props = {
  user: SessionUser;
  dokter: {
    id: string;
    name: string;
    username: string;
    email: string;
    spesialis: string | null;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const dokter = await prisma.user.findFirst({
    where: { id, role: "dokter" },
  });
  if (!dokter) {
    return {
      redirect: {
        destination: "/admin/dokter",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      dokter: {
        id: dokter.id.toString(),
        name: dokter.name,
        username: dokter.username,
        email: dokter.email,
        spesialis: dokter.spesialis,
      },
    },
  };
};

export default function AdminDokterEditPage({ user, dokter }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-800">Edit Dokter</h1>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <form
            action={`/admin/dokter/${dokter.id}`}
            method="POST"
            className="space-y-6"
            data-confirm="Yakin ingin menyimpan perubahan data dokter ini?"
            data-confirm-title="Konfirmasi Edit"
            data-confirm-confirm-label="Ya, Simpan"
          >
            <input type="hidden" name="_method" value="PUT" />
            <div>
              <label htmlFor="nama" className="mb-1 block text-sm font-semibold text-gray-700">
                Nama Lengkap
              </label>
              <input type="text" name="nama" id="nama" required defaultValue={dokter.name} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            </div>

            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input type="text" name="username" id="username" required defaultValue={dokter.username} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input type="email" name="email" id="email" required defaultValue={dokter.email} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            </div>

            <div>
              <label htmlFor="spesialis" className="mb-1 block text-sm font-semibold text-gray-700">
                Spesialis
              </label>
              <input type="text" name="spesialis" id="spesialis" required defaultValue={dokter.spesialis ?? ""} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <PasswordInput
                name="password"
                id="password"
                autoComplete="new-password"
                placeholder="Kosongkan jika tidak ingin mengubah password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="pt-4 text-center">
              <button type="submit" className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
                Update Dokter
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
