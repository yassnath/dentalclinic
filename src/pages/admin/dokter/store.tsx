import type { GetServerSideProps } from "next";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";

const schema = z.object({
  nama: z.string().min(2).max(255),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  spesialis: z.string().min(1).max(255),
  password: z.string().min(6),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return {
        redirect: {
          destination: "/admin/dokter/create?error=Data%20dokter%20tidak%20valid.",
          permanent: false,
        },
      };
    }

    const data = parsed.data;
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email.toLowerCase() }, { username: data.username }],
      },
      select: { id: true },
    });
    if (exists) {
      return {
        redirect: {
          destination: "/admin/dokter/create?error=Email%20atau%20username%20sudah%20digunakan.",
          permanent: false,
        },
      };
    }

    await prisma.user.create({
      data: {
        name: data.nama,
        username: data.username,
        email: data.email.toLowerCase(),
        spesialis: data.spesialis,
        password: await bcrypt.hash(data.password, 10),
        role: "dokter",
      },
    });

    return {
      redirect: {
        destination: "/admin/dokter?success=Dokter%20berhasil%20ditambahkan.",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/admin/dokter/create",
      permanent: false,
    },
  };
};

export default function AdminDokterStorePage() {
  return null;
}
