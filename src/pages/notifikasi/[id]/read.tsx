import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");

  if (ctx.req.method === "POST") {
    const notif = await prisma.notifikasi.findFirst({
      where: { id, userId: auth.user.id },
      select: { id: true },
    });
    if (notif) {
      await prisma.notifikasi.update({
        where: { id: notif.id },
        data: { dibaca: true },
      });
    }
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
