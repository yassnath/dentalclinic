import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type PageProps = {
  user: SessionUser;
  unreadNotifCount: number;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;
  const unreadNotifCount = await prisma.notifikasi.count({
    where: { userId: auth.user.id, dibaca: false },
  });
  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
    },
  };
};

export default function ProfilPage({ user, unreadNotifCount }: PageProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <h1 className="mb-6 text-3xl font-bold text-blue-600">Edit Profil</h1>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">Username</label>
          <input type="text" value={user.username} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">Email</label>
          <input type="email" value={user.email} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">Nama</label>
          <input type="text" value={user.name} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">Alamat</label>
          <input type="text" value={user.alamat ?? ""} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold text-gray-700">Telepon</label>
          <input type="text" value={user.telepon ?? user.no_hp ?? ""} readOnly className="w-full rounded-lg border border-gray-300 p-2" />
        </div>
      </div>
    </DashboardLayout>
  );
}
