import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    await prisma.notifikasi.updateMany({
      where: { userId: auth.user.id, dibaca: false },
      data: { dibaca: true },
    });
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
