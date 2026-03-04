import type { GetServerSideProps } from "next";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";

const schema = z.object({
  status: z.enum(["menunggu_konfirmasi", "diterima", "ditolak"]),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return {
        redirect: {
          destination: "/dokter/pendaftar",
          permanent: false,
        },
      };
    }

    const pendaftaran = await prisma.pendaftaran.findFirst({
      where: {
        id,
        OR: [{ dokterId: auth.user.id }, { diterimaOlehDokterId: auth.user.id }],
      },
    });

    if (pendaftaran) {
      const oldStatus = pendaftaran.status;
      const newStatus = parsed.data.status;
      const updateData: {
        status: string;
        diterimaOlehDokterId?: bigint;
        dokterId?: bigint;
      } = {
        status: newStatus,
      };

      if (newStatus === "diterima") {
        updateData.diterimaOlehDokterId = auth.user.id;
        if (!pendaftaran.dokterId) {
          updateData.dokterId = auth.user.id;
        }
      }

      await prisma.pendaftaran.update({
        where: { id: pendaftaran.id },
        data: updateData,
      });

      if (pendaftaran.userId && oldStatus.toLowerCase() !== newStatus.toLowerCase()) {
        await prisma.notifikasi.create({
          data: {
            userId: pendaftaran.userId,
            judul: "Status Pendaftaran",
            pesan: `Status pendaftaran Anda berubah dari "${oldStatus || "-"}" menjadi "${newStatus}".`,
            tipe: "pendaftaran",
            link: "/pendaftaran-saya",
            dibaca: false,
          },
        });
      }
    }
  }

  return {
    redirect: {
      destination: "/dokter/pendaftar",
      permanent: false,
    },
  };
};

export default function UpdateStatusPage() {
  return null;
}
