import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { safeMarkNotificationRead } from "@/lib/notifications";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");

  if (ctx.req.method === "POST") {
    await safeMarkNotificationRead(auth.user.id, id);
  }

  return {
    redirect: {
      destination: "/notifikasi",
      permanent: false,
    },
  };
};

export default function ReadNotifPage() {
  return null;
}
