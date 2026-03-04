import type { GetServerSideProps } from "next";
import { clearSessionCookie } from "@/lib/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  clearSessionCookie(ctx.res);
  return {
    redirect: {
      destination: `/login?success=${encodeURIComponent("Logout berhasil.")}`,
      permanent: false,
    },
  };
};

export default function LogoutPage() {
  return null;
}
