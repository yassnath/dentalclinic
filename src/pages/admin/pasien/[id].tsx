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
    const pasien = await prisma.user.findFirst({
      where: { id, role: "pasien" },
    });

    if (!pasien) {
      return {
        redirect: {
          destination: "/admin/pasien",
          permanent: false,
        },
      };
    }

    if (method === "DELETE") {
      await prisma.user.delete({ where: { id: pasien.id } });
      return {
        redirect: {
          destination: "/admin/pasien?success=Pasien%20berhasil%20dihapus.",
          permanent: false,
        },
      };
    }

    if (method === "PUT") {
      const payload: {
        name: string;
        username: string;
        email: string;
        tanggalLahir: Date;
        jenisKelamin: string;
        noHp: string;
        nik: string;
        alamat: string | null;
        password?: string;
      } = {
        name: String(body.nama ?? pasien.name),
        username: String(body.username ?? pasien.username),
        email: String(body.email ?? pasien.email).toLowerCase(),
        tanggalLahir: new Date(String(body.tanggal_lahir ?? "2000-01-01")),
        jenisKelamin: String(body.jenis_kelamin ?? pasien.jenisKelamin ?? ""),
        noHp: String(body.no_hp ?? pasien.noHp ?? ""),
        nik: String(body.nik ?? pasien.nik ?? ""),
        alamat: String(body.alamat ?? pasien.alamat ?? "") || null,
      };

      const password = String(body.password ?? "").trim();
      if (password) {
        payload.password = await bcrypt.hash(password, 10);
      }

      await prisma.user.update({
        where: { id: pasien.id },
        data: payload,
      });

      return {
        redirect: {
          destination: "/admin/pasien?success=Data%20pasien%20berhasil%20diperbarui.",
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/admin/pasien",
      permanent: false,
    },
  };
};

export default function AdminPasienActionPage() {
  return null;
}
