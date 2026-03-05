import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { safeUnreadNotifCount } from "@/lib/notifications";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";

type RekamRow = {
  id: string;
  tanggal: string | null;
  dokter: string;
  diagnosa: string;
  tindakan: string;
  catatan: string | null;
};

type PageProps = {
  user: SessionUser;
  unreadNotifCount: number;
  rekamMedisList: RekamRow[];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const [unreadNotifCount, rekamMedisList] = await Promise.all([
    safeUnreadNotifCount(auth.user.id),
    prisma.rekamMedis.findMany({
      where: {
        pendaftaran: {
          userId: auth.user.id,
        },
      },
      include: {
        dokter: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
      rekamMedisList: rekamMedisList.map((rekam) => ({
        id: rekam.id.toString(),
        tanggal: rekam.createdAt ? rekam.createdAt.toISOString() : null,
        dokter: rekam.dokter?.name ?? "Tidak diketahui",
        diagnosa: rekam.diagnosa,
        tindakan: rekam.tindakan,
        catatan: rekam.catatan,
      })),
    },
  };
};

export default function RekamMedisPage({ user, unreadNotifCount, rekamMedisList }: PageProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Rekam Medis Saya</h1>

        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="responsive-table min-w-full table-auto text-sm theme-table">
            <thead className="bg-blue-600 text-center text-white">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Dokter</th>
                <th className="px-4 py-3">Diagnosa</th>
                <th className="px-4 py-3">Tindakan</th>
                <th className="px-4 py-3">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {rekamMedisList.length ? (
                rekamMedisList.map((rekam) => (
                  <tr key={rekam.id} className="border-b text-center hover:bg-gray-50">
                    <td data-label="Tanggal" className="px-4 py-3">
                      {rekam.tanggal ? formatDate(new Date(rekam.tanggal), "dd-MM-yyyy") : "-"}
                    </td>
                    <td data-label="Dokter" className="px-4 py-3">
                      {rekam.dokter}
                    </td>
                    <td data-label="Diagnosa" className="px-4 py-3">
                      {rekam.diagnosa}
                    </td>
                    <td data-label="Tindakan" className="px-4 py-3">
                      {rekam.tindakan}
                    </td>
                    <td data-label="Catatan" className="px-4 py-3">
                      {rekam.catatan ?? "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    Belum ada rekam medis.
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
