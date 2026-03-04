import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MENUNGGU_STATUSES = ["menunggu_konfirmasi", "menunggu konfirmasi", "menunggu", "pending", "baru"];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis", "admin"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    const idParam = ctx.params?.id;
    const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
    const pendaftaran = await prisma.pendaftaran.findUnique({ where: { id } });

    if (!pendaftaran) {
      return {
        redirect: {
          destination: "/resepsionis/pasien-aktif?error=Data%20pendaftaran%20tidak%20ditemukan.",
          permanent: false,
        },
      };
    }

    const status = String(pendaftaran.status ?? "").toLowerCase();
    if (!MENUNGGU_STATUSES.includes(status)) {
      return {
        redirect: {
          destination: "/resepsionis/pasien-aktif?error=Hanya%20pendaftaran%20yang%20masih%20menunggu%20yang%20bisa%20diterima.",
          permanent: false,
        },
      };
    }

    await prisma.pendaftaran.update({
      where: { id: pendaftaran.id },
      data: { status: "diterima" },
    });

    return {
      redirect: {
        destination: "/resepsionis/pasien-aktif?success=Pendaftaran%20berhasil%20diterima.",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/resepsionis/pasien-aktif",
      permanent: false,
    },
  };
};

export default function ResepsionisTerimaActionPage() {
  return null;
}
