import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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

  const [notifikasis, unreadNotifCount] = await Promise.all([
    prisma.notifikasi.findMany({
      where: { userId: auth.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.notifikasi.count({
      where: { userId: auth.user.id, dibaca: false },
    }),
  ]);

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
      notifikasis: notifikasis.map((notif) => ({
        id: notif.id.toString(),
        judul: notif.judul,
        pesan: notif.pesan,
        tipe: notif.tipe,
        link: notif.link,
        dibaca: notif.dibaca,
        created_at: notif.createdAt ? notif.createdAt.toISOString() : null,
      })),
    },
  };
};

export default function NotifikasiPage({ user, unreadNotifCount, notifikasis }: PageProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-700">Notifikasi</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Belum dibaca: <span className="font-semibold text-blue-700">{unreadNotifCount}</span>
            </span>
            <form action="/notifikasi/read-all" method="POST">
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow transition hover:bg-blue-700">
                Tandai semua dibaca
              </button>
            </form>
          </div>
        </div>

        {notifikasis.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <p className="text-gray-600">Belum ada notifikasi.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <ul className="divide-y divide-gray-200">
              {notifikasis.map((notif) => {
                const detailLink = notif.judul === "Status Pendaftaran" ? "/pendaftaran-saya" : notif.link;
                return (
                  <li key={notif.id} className="p-5 transition hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-base font-semibold ${notif.dibaca ? "text-gray-700" : "text-blue-700"}`}>{notif.judul}</h3>
                          {!notif.dibaca ? <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">Baru</span> : null}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{notif.pesan}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span>{notif.created_at ? formatDateTime(new Date(notif.created_at), "dd-MM-yyyy HH:mm") : "-"}</span>
                          {notif.tipe ? <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">{notif.tipe}</span> : null}
                          {detailLink ? (
                            <a href={detailLink} className="text-blue-600 hover:underline">
                              Lihat detail
                            </a>
                          ) : null}
                        </div>
                      </div>
                      <div className="shrink-0">
                        {!notif.dibaca ? (
                          <form action={`/notifikasi/${notif.id}/read`} method="POST">
                            <button type="submit" className="text-sm text-blue-600 hover:underline">
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
