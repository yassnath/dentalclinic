import type { GetServerSideProps } from "next";
import { randomUUID } from "crypto";
import DashboardLayout from "@/components/DashboardLayout";
import PatientIdentityCard from "@/components/PatientIdentityCard";
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
        <PatientIdentityCard
          name={user.name}
          noRm={user.no_rm}
          qrCandidates={[qrUrl]}
          downloadName={`qr-pasien-${user.username || user.id}.png`}
          onPrint={() => window.print()}
        />
      </div>
    </DashboardLayout>
  );
}
