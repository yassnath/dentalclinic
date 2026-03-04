import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    if (status !== "diterima") {
      return {
        redirect: {
          destination: "/resepsionis/pasien-aktif?error=Check-in%20hanya%20bisa%20untuk%20pasien%20dengan%20status%20diterima.",
          permanent: false,
        },
      };
    }

    if (pendaftaran.checkedInAt) {
      return {
        redirect: {
          destination: "/resepsionis/pasien-aktif?error=Pasien%20sudah%20di-check-in.",
          permanent: false,
        },
      };
    }

    if (pendaftaran.noShowAt) {
      return {
        redirect: {
          destination: "/resepsionis/pasien-aktif?error=Pasien%20sudah%20ditandai%20Tidak%20Hadir.",
          permanent: false,
        },
      };
    }

    await prisma.pendaftaran.update({
      where: { id: pendaftaran.id },
      data: {
        status: "hadir",
        checkedInAt: new Date(),
        checkedInBy: auth.user.id,
      },
    });

    return {
      redirect: {
        destination: "/resepsionis/pasien-aktif?success=Pasien%20berhasil%20di-check-in%20(Hadir).",
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

export default function ResepsionisCheckinActionPage() {
  return null;
}
