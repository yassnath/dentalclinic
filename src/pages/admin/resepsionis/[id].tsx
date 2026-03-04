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
    const resepsionis = await prisma.user.findFirst({
      where: { id, role: "resepsionis" },
    });

    if (!resepsionis) {
      return {
        redirect: {
          destination: "/admin/resepsionis",
          permanent: false,
        },
      };
    }

    if (method === "DELETE") {
      await prisma.user.delete({ where: { id: resepsionis.id } });
      return {
        redirect: {
          destination: "/admin/resepsionis?success=Resepsionis%20berhasil%20dihapus.",
          permanent: false,
        },
      };
    }

    if (method === "PUT") {
      const email = String(body.email ?? resepsionis.email).toLowerCase();
      const username = String(body.username ?? resepsionis.username);
      const duplicate = await prisma.user.findFirst({
        where: {
          role: "resepsionis",
          id: { not: resepsionis.id },
          OR: [{ email }, { username }],
        },
        select: { id: true },
      });
      if (duplicate) {
        return {
          redirect: {
            destination: `/admin/resepsionis/${resepsionis.id.toString()}/edit?error=${encodeURIComponent(
              "Email atau username sudah dipakai.",
            )}`,
            permanent: false,
          },
        };
      }

      const data: {
        name: string;
        email: string;
        username: string;
        password?: string;
      } = {
        name: String(body.nama ?? resepsionis.name),
        email,
        username,
      };

      const password = String(body.password ?? "").trim();
      if (password) {
        data.password = await bcrypt.hash(password, 10);
      }

      await prisma.user.update({
        where: { id: resepsionis.id },
        data,
      });

      return {
        redirect: {
          destination: "/admin/resepsionis?success=Data%20resepsionis%20berhasil%20diperbarui.",
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/admin/resepsionis",
      permanent: false,
    },
  };
};

export default function AdminResepsionisActionPage() {
  return null;
}
