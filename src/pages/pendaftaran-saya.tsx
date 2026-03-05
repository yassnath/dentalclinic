import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { safeUnreadNotifCount } from "@/lib/notifications";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";
import { toPlainObject } from "@/lib/serialize";

type RegistrationRow = {
  id: string;
  tanggal_kunjungan: string | null;
  jam_kunjungan: string | null;
  spesialis: string | null;
  dokter_name: string;
  kode_antrian: string | null;
  status: string;
};

type PageProps = {
  user: SessionUser;
  unreadNotifCount: number;
  pendaftarans: RegistrationRow[];
  success?: string;
  error?: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  let unreadNotifCount = 0;
  let pendaftarans: any[] = [];
  try {
    [unreadNotifCount, pendaftarans] = await Promise.all([
      safeUnreadNotifCount(auth.user.id),
      prisma.pendaftaran.findMany({
        where: { userId: auth.user.id },
        include: { dokter: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);
  } catch (error) {
    console.error("[pendaftaran-saya] failed to load data:", error instanceof Error ? error.message : String(error));
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
      pendaftarans: toPlainObject(
        pendaftarans.map((item) => ({
          id: item.id.toString(),
          tanggal_kunjungan: item.tanggalKunjungan ? item.tanggalKunjungan.toISOString() : null,
          jam_kunjungan: item.jamKunjungan ? item.jamKunjungan.toISOString() : null,
          spesialis: item.spesialis,
          dokter_name: item.dokter?.name ?? "-",
          kode_antrian: item.kodeAntrian,
          status: item.status ?? "-",
        })),
      ),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

function timeLabel(value: string | null) {
  if (!value) return "";
  return value.slice(11, 16);
}

export default function PendaftaranSayaPage({ user, unreadNotifCount, pendaftarans, success, error }: PageProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">Pendaftaran Saya</h1>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
          <table className="responsive-table min-w-full divide-y divide-gray-200 text-sm theme-table">
            <thead className="bg-blue-100 text-center text-blue-800">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Tanggal/Jam</th>
                <th className="px-4 py-2">Spesialis</th>
                <th className="px-4 py-2">Dokter</th>
                <th className="px-4 py-2">No Antrian</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
                <th className="px-4 py-2">Hapus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center">
              {pendaftarans.length ? (
                pendaftarans.map((item, index) => {
                  const isDiterima = String(item.status ?? "").toLowerCase() === "diterima";
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td data-label="No" className="px-4 py-2">
                        {index + 1}
                      </td>
                      <td data-label="Tanggal/Jam" className="px-4 py-2">
                        {item.tanggal_kunjungan ? formatDate(new Date(item.tanggal_kunjungan), "dd-MM-yyyy") : "-"} {timeLabel(item.jam_kunjungan)}
                      </td>
                      <td data-label="Spesialis" className="px-4 py-2">
                        {item.spesialis ?? "-"}
                      </td>
                      <td data-label="Dokter" className="px-4 py-2">
                        {item.dokter_name}
                      </td>
                      <td data-label="No Antrian" className="px-4 py-2">
                        {item.kode_antrian ?? "-"}
                      </td>
                      <td data-label="Status" className="px-4 py-2">
                        {item.status}
                      </td>
                      <td data-label="Aksi" className="px-4 py-2">
                        <a href={`/pendaftaran/${item.id}/reschedule`} className="text-sm text-blue-600 hover:underline">
                          Reschedule
                        </a>
                      </td>
                      <td data-label="Hapus" className="px-4 py-2">
                        {isDiterima ? (
                          <span className="text-sm text-gray-400">Tidak bisa</span>
                        ) : (
                          <form
                            action={`/pendaftaran/${item.id}`}
                            method="POST"
                            data-confirm="Yakin ingin menghapus pendaftaran ini?"
                            data-confirm-title="Konfirmasi Hapus"
                            data-confirm-confirm-label="Ya, Hapus"
                          >
                            <input type="hidden" name="_method" value="DELETE" />
                            <button type="submit" className="text-sm text-red-600 hover:underline">
                              Hapus
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                    Belum ada pendaftaran.
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
