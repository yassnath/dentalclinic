import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const status = String(body.status ?? "").trim();
    if (!status) {
      return {
        redirect: {
          destination: "/admin/pembayaran/konfirmasi?success=Status%20pembayaran%20tidak%20valid.",
          permanent: false,
        },
      };
    }

    const pembayaran = await prisma.pembayaran.findUnique({
      where: { id },
    });
    if (!pembayaran) {
      return {
        redirect: {
          destination: "/admin/pembayaran/konfirmasi",
          permanent: false,
        },
      };
    }

    const oldStatus = String(pembayaran.status);
    await prisma.pembayaran.update({
      where: { id: pembayaran.id },
      data: { status },
    });

    if (oldStatus.toLowerCase().trim() !== status.toLowerCase().trim()) {
      const isLunas = status.toLowerCase().trim() === "lunas";
      await prisma.notifikasi.create({
        data: {
          userId: pembayaran.userId,
          judul: isLunas ? "Pembayaran Lunas" : "Status Pembayaran Diperbarui",
          pesan: isLunas
            ? `Pembayaran tagihan ${pembayaran.kodeTagihan} telah dikonfirmasi LUNAS. Terima kasih.`
            : `Status tagihan ${pembayaran.kodeTagihan} berubah dari "${oldStatus}" menjadi "${status}".`,
          tipe: "pembayaran",
          link: "/pasien/tagihan",
          dibaca: false,
        },
      });
    }

    return {
      redirect: {
        destination: "/admin/pembayaran/konfirmasi?success=Status%20pembayaran%20berhasil%20diperbarui.",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/admin/pembayaran/konfirmasi",
      permanent: false,
    },
  };
};

export default function AdminPembayaranKonfirmasiUpdatePage() {
  return null;
}
