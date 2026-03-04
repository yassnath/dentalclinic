import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import PasswordInput from "@/components/PasswordInput";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type Props = {
  user: SessionUser;
  resepsionis: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
  error?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const user = await prisma.user.findFirst({
    where: { id, role: "resepsionis" },
  });
  if (!user) {
    return {
      redirect: {
        destination: "/admin/resepsionis",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      resepsionis: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        username: user.username,
      },
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

export default function AdminResepsionisEditPage({ user, resepsionis, error }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-700">Edit Resepsionis</h1>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <form
            method="POST"
            action={`/admin/resepsionis/${resepsionis.id}`}
            data-confirm="Yakin ingin menyimpan perubahan data resepsionis ini?"
            data-confirm-title="Konfirmasi Edit"
            data-confirm-confirm-label="Ya, Simpan"
          >
            <input type="hidden" name="_method" value="PUT" />
            <div className="mb-4">
              <label htmlFor="nama" className="mb-1 block text-sm font-semibold">
                Nama Lengkap
              </label>
              <input type="text" name="nama" id="nama" required defaultValue={resepsionis.name} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 block text-sm font-semibold">
                Email
              </label>
              <input type="email" name="email" id="email" required defaultValue={resepsionis.email} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="mb-1 block text-sm font-semibold">
                Username
              </label>
              <input type="text" name="username" id="username" required defaultValue={resepsionis.username} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-1 block text-sm font-semibold">
                Password
              </label>
              <PasswordInput
                name="password"
                id="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder="Kosongkan jika tidak ingin mengubah password"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700">
                <i className="fas fa-save mr-2" /> Update Resepsionis
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
