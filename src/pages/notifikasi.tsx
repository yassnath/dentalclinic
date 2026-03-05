import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { safeListNotifications, safeUnreadNotifCount } from "@/lib/notifications";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDateTime } from "@/lib/format";

type NotifRow = {
  id: string;
  judul: string;
  pesan: string;
  tipe: string | null;
  link: string | null;
  dibaca: boolean;
  created_at: string | null;
};

type PageProps = {
  user: SessionUser;
  unreadNotifCount: number;
  notifikasis: NotifRow[];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const [notifikasis, unreadNotifCount] = await Promise.all([safeListNotifications(auth.user.id), safeUnreadNotifCount(auth.user.id)]);

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
      notifikasis: notifikasis.map((notif) => ({
        id: notif.id,
        judul: notif.judul,
        pesan: notif.pesan,
        tipe: notif.tipe,
        link: notif.link,
        dibaca: notif.dibaca,
        created_at: notif.createdAt,
      })),
    },
  };
};

export default function NotifikasiPage({ user, unreadNotifCount, notifikasis }: PageProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto w-full max-w-5xl p-3 sm:p-6">
        <div className="mb-4 rounded-2xl border border-soft bg-surface p-4 shadow-sm sm:mb-6 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-700 sm:text-3xl">Notifikasi</h1>
              <p className="mt-1 text-sm text-gray-600">
                Belum dibaca: <span className="font-semibold text-blue-700">{unreadNotifCount}</span>
              </p>
            </div>
            <form action="/notifikasi/read-all" method="POST" className="w-full sm:w-auto">
              <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-700 sm:w-auto">
                Tandai semua dibaca
              </button>
            </form>
          </div>
        </div>

        {notifikasis.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow sm:p-6">
            <p className="text-gray-600">Belum ada notifikasi.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">
            <ul className="divide-y divide-gray-200">
              {notifikasis.map((notif) => {
                const detailLink = notif.judul === "Status Pendaftaran" ? "/pendaftaran-saya" : notif.link;
                return (
                  <li key={notif.id} className="p-4 transition hover:bg-gray-50 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`text-base font-semibold ${notif.dibaca ? "text-gray-700" : "text-blue-700"}`}>{notif.judul}</h3>
                          {!notif.dibaca ? <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">Baru</span> : null}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{notif.pesan}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span>{notif.created_at ? formatDateTime(new Date(notif.created_at), "dd-MM-yyyy HH:mm") : "-"}</span>
                          {notif.tipe ? <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">{notif.tipe}</span> : null}
                          {detailLink ? (
                            <a href={detailLink} className="text-blue-600 hover:underline">
                              Lihat detail
                            </a>
                          ) : null}
                        </div>
                      </div>
                      <div className="shrink-0 border-t border-gray-100 pt-2 sm:border-t-0 sm:pt-0">
                        {!notif.dibaca ? (
                          <form action={`/notifikasi/${notif.id}/read`} method="POST">
                            <button type="submit" className="text-sm font-semibold text-blue-600 hover:underline">
                              Tandai dibaca
                            </button>
                          </form>
                        ) : (
                          <span className="text-sm text-gray-400">Dibaca</span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
