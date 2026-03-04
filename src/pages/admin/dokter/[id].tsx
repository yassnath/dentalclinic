import type { GetServerSideProps } from "next";
import bcrypt from "bcryptjs";
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
    const method = String(body._method ?? "").toUpperCase();
    const dokter = await prisma.user.findFirst({
      where: { id, role: "dokter" },
    });

    if (!dokter) {
      return {
        redirect: {
          destination: "/admin/dokter",
          permanent: false,
        },
      };
    }

    if (method === "DELETE") {
      await prisma.user.delete({ where: { id: dokter.id } });
      return {
        redirect: {
          destination: "/admin/dokter?success=Dokter%20berhasil%20dihapus.",
          permanent: false,
        },
      };
    }

    if (method === "PUT") {
      const data: {
        name: string;
        username: string;
        email: string;
        spesialis: string;
        password?: string;
      } = {
        name: String(body.nama ?? dokter.name),
        username: String(body.username ?? dokter.username),
        email: String(body.email ?? dokter.email).toLowerCase(),
        spesialis: String(body.spesialis ?? dokter.spesialis ?? ""),
      };

      const password = String(body.password ?? "").trim();
      if (password) {
        data.password = await bcrypt.hash(password, 10);
      }

      await prisma.user.update({
        where: { id: dokter.id },
        data,
      });
      return {
        redirect: {
          destination: "/admin/dokter?success=Data%20dokter%20berhasil%20diperbarui.",
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/admin/dokter",
      permanent: false,
    },
  };
};

export default function AdminDokterActionPage() {
  return null;
}
