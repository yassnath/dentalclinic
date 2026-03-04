import type { GetServerSideProps } from "next";
import { parseFormBody } from "@/lib/http";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const method = String(body._method ?? "").toUpperCase();
    const idParam = ctx.params?.id;
    const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");

    if (method === "DELETE") {
      const jadwal = await prisma.jadwalDokter.findUnique({ where: { id } });
      if (!jadwal || jadwal.dokterId !== auth.user.id) {
        return {
          redirect: {
            destination: "/dokter/jadwal?error=Jadwal%20tidak%20ditemukan.",
            permanent: false,
          },
        };
      }

      await prisma.jadwalDokter.delete({
        where: { id: jadwal.id },
      });
    }
  }

  return {
    redirect: {
      destination: "/dokter/jadwal?success=Jadwal%20berhasil%20dihapus.",
      permanent: false,
    },
  };
};

export default function DeleteJadwalPage() {
  return null;
}
