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

async function safeRekamMedisRows(userId: bigint): Promise<RekamRow[]> {
  try {
    const rows = await prisma.rekamMedis.findMany({
      where: {
        OR: [{ pasienId: userId }, { pendaftaran: { userId } }],
      },
      select: {
        id: true,
        createdAt: true,
        diagnosa: true,
        tindakan: true,
        catatan: true,
        dokterId: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const dokterIds = [...new Set(rows.map((row) => row.dokterId?.toString()).filter((id): id is string => Boolean(id)))].map((id) => BigInt(id));
    const doctors = dokterIds.length
      ? await prisma.user.findMany({
          where: { id: { in: dokterIds } },
          select: { id: true, name: true },
        })
      : [];
    const dokterMap = new Map(doctors.map((dokter) => [dokter.id.toString(), dokter.name]));

    return rows.map((rekam) => ({
      id: rekam.id.toString(),
      tanggal: rekam.createdAt ? rekam.createdAt.toISOString() : null,
      dokter: rekam.dokterId ? (dokterMap.get(rekam.dokterId.toString()) ?? "Tidak diketahui") : "Tidak diketahui",
      diagnosa: rekam.diagnosa,
      tindakan: rekam.tindakan,
      catatan: rekam.catatan,
    }));
  } catch (error) {
    console.error("[rekam-medis] prisma query failed:", error instanceof Error ? error.message : String(error));
  }

  try {
    const rows = await prisma.$queryRawUnsafe<
      Array<{
        id: string;
        tanggal: Date | string | null;
        dokter: string | null;
        diagnosa: string | null;
        tindakan: string | null;
        catatan: string | null;
      }>
    >(
      `SELECT
         rm.id::text AS id,
         rm.created_at AS tanggal,
         u.name::text AS dokter,
         rm.diagnosa::text AS diagnosa,
         rm.tindakan::text AS tindakan,
         rm.catatan::text AS catatan
       FROM public.rekam_medis rm
       LEFT JOIN public.pendaftarans p ON p.id = rm.pendaftaran_id
       LEFT JOIN public.users u ON u.id = rm.dokter_id
       WHERE rm.pasien_id = $1 OR p.user_id = $1
       ORDER BY rm.created_at DESC NULLS LAST, rm.id DESC`,
      userId.toString(),
    );

    return rows.map((row) => ({
      id: row.id,
      tanggal: row.tanggal ? new Date(row.tanggal).toISOString() : null,
      dokter: row.dokter ?? "Tidak diketahui",
      diagnosa: row.diagnosa ?? "-",
      tindakan: row.tindakan ?? "-",
      catatan: row.catatan ?? null,
    }));
  } catch (error) {
    console.error("[rekam-medis] fallback query failed:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const [unreadNotifCount, rekamMedisList] = await Promise.all([safeUnreadNotifCount(auth.user.id), safeRekamMedisRows(auth.user.id)]);

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
      rekamMedisList,
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
