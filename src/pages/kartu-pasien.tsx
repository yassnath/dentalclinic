import type { GetServerSideProps } from "next";
import { randomUUID } from "crypto";
import DashboardLayout from "@/components/DashboardLayout";
import { createSessionCookie, createSessionPayloadFromUser, requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPatientQrUrl } from "@/lib/qr";
import { safeUnreadNotifCount } from "@/lib/notifications";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type PageProps = {
  user: SessionUser;
  unreadNotifCount: number;
  qrUrl: string | null;
};

function resolveQrUrl(user: SessionUser) {
  return getPatientQrUrl(user.qr_token);
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const updates: Record<string, string> = {};
  if (!auth.user.noRm) {
    updates.noRm = `RM-${new Date().toISOString().slice(0, 7).replace("-", "")}-${auth.user.id.toString().padStart(5, "0")}`;
  }
  if (!auth.user.qrToken) {
    updates.qrToken = randomUUID();
  }

  let currentUser = auth.user;
  if (Object.keys(updates).length > 0) {
    try {
      currentUser = await prisma.user.update({
        where: { id: auth.user.id },
        data: updates,
      });
      await createSessionCookie(ctx.res, createSessionPayloadFromUser(currentUser));
    } catch (error) {
      // Jangan buat halaman gagal total jika sinkronisasi field tambahan user tidak tersedia.
      console.error("[kartu-pasien] failed to update patient card fields:", error instanceof Error ? error.message : String(error));
      currentUser = auth.user;
    }
  }

  const unreadNotifCount = await safeUnreadNotifCount(currentUser.id);

  const user = toSessionUser(currentUser);
  const qrUrl = resolveQrUrl(user);

  return {
    props: {
      user: {
        ...user,
        qr_path: qrUrl ?? user.qr_path,
      },
      unreadNotifCount,
      qrUrl,
    },
  };
};

export default function KartuPasienPage({ user, unreadNotifCount, qrUrl }: PageProps) {
  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl" id="kartu-pasien">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-blue-700">Kartu Pasien</h2>
              <div className="text-sm text-gray-500">Tunjukkan ke resepsionis/dokter</div>
            </div>
            <img src="/images/logo2.png" className="h-10" alt="Logo" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <div className="text-xs text-gray-500">Nama</div>
              <div className="font-semibold">{user.name}</div>
              <div className="mt-2 text-xs text-gray-500">No. RM</div>
              <div className="font-semibold tracking-wide">{user.no_rm ?? "-"}</div>
            </div>

            <div className="flex items-center justify-center">{qrUrl ? <img id="qrImage" src={qrUrl} alt="QR Pasien" className="h-32 w-32" /> : null}</div>
          </div>

          <div className="no-print mt-6 flex items-center justify-between">
            {qrUrl ? (
              <a href={qrUrl} download={`qr-pasien-${user.username || user.id}.png`} className="text-sm text-blue-600 underline">
                Unduh QR
              </a>
            ) : (
              <span className="text-sm text-gray-400">QR belum tersedia</span>
            )}
            <button type="button" onClick={() => window.print()} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              Cetak Kartu
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #kartu-pasien,
          #kartu-pasien * {
            visibility: visible !important;
          }
          #kartu-pasien {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
