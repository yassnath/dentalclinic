import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { safeMarkAllNotificationsRead } from "@/lib/notifications";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    await safeMarkAllNotificationsRead(auth.user.id);
  }

  return {
    redirect: {
      destination: "/notifikasi",
      permanent: false,
    },
  };
};

export default function ReadAllNotifPage() {
  return null;
}
