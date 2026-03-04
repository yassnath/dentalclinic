import type { GetServerSideProps } from "next";
import { parseFormBody } from "@/lib/http";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const method = String(body._method ?? "").toUpperCase();
    if (method === "DELETE") {
      const pendaftaran = await prisma.pendaftaran.findFirst({
        where: { id, userId: auth.user.id },
      });

      if (!pendaftaran) {
        return {
          redirect: {
            destination: "/pendaftaran-saya?error=Data%20pendaftaran%20tidak%20ditemukan.",
            permanent: false,
          },
        };
      }

      if (String(pendaftaran.status ?? "").toLowerCase() === "diterima") {
        return {
          redirect: {
            destination:
              "/pendaftaran-saya?error=Maaf%20pendaftaran%20tidak%20bisa%20dihapus,%20karena%20sudah%20diterima%20oleh%20dokter!",
            permanent: false,
          },
        };
      }

      await prisma.pendaftaran.delete({
        where: { id: pendaftaran.id },
      });

      return {
        redirect: {
          destination: "/pendaftaran-saya?success=Pendaftaran%20berhasil%20dihapus.",
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/pendaftaran-saya",
      permanent: false,
    },
  };
};

export default function PendaftaranActionPage() {
  return null;
}
