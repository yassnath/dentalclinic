import Head from "next/head";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionCookie, createSessionPayloadFromUser, getRoleHome, getSessionFromToken } from "@/lib/auth";
import { parseFormBody } from "@/lib/http";
import PasswordInput from "@/components/PasswordInput";

type LoginPageProps = {
  error?: string;
  success?: string | null;
  email?: string;
};

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (ctx) => {
  const existing = await getSessionFromToken(ctx.req.cookies.healtease_session);
  if (existing) {
    return {
      redirect: {
        destination: getRoleHome(existing.role),
        permanent: false,
      },
    };
  }

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          props: {
            error: "Login gagal. Email atau password salah.",
            email,
          },
        };
      }

      await createSessionCookie(ctx.res, createSessionPayloadFromUser(user));

      return {
        redirect: {
          destination: `${getRoleHome(user.role)}?success=${encodeURIComponent("Login berhasil. Selamat datang!")}`,
          permanent: false,
        },
      };
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      return {
        props: {
          error:
            process.env.NODE_ENV === "development"
              ? `Database error: ${reason}`
              : "Database belum terhubung. Pastikan koneksi Supabase (DATABASE_URL/DIRECT_URL) sudah benar.",
          email,
        },
      };
    }
  }

  return {
    props: {
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
      email: typeof ctx.query.email === "string" ? ctx.query.email : "",
    },
  };
};

export default function LoginPage({ error, success, email }: LoginPageProps) {
  void success;
  void error;

  return (
    <>
      <Head>
        <title>Login - SIM HealtEase</title>
      </Head>

      <div className="auth-shell min-h-screen font-modify text-body">
        <div className="auth-orb auth-orb-a" />
        <div className="auth-orb auth-orb-b" />

        <div className="mx-auto flex min-h-screen w-full max-w-5xl items-start px-4 py-6 sm:items-center sm:py-10">
          <div className="auth-card grid w-full gap-3 p-2 sm:gap-4 sm:p-3 lg:grid-cols-2 lg:p-4">
            <aside className="auth-panel hidden p-8 lg:block">
              <span className="auth-badge">
                <i className="fas fa-shield-heart" />
                Secure Login
              </span>
              <h1 className="auth-title mt-5">Masuk ke Akun HealthEase</h1>
              <p className="auth-subtitle">
                Kelola pendaftaran pasien, jadwal dokter, dan layanan klinik dengan antarmuka modern yang cepat dan aman.
              </p>

              <div className="mt-8 space-y-3">
                <div className="dashboard-action-link !cursor-default">
                  <span className="dashboard-stat-icon dashboard-stat-icon-sm primary">
                    <i className="fas fa-lock" />
                  </span>
                  <div>
                    <p className="font-semibold text-secondary">Akses Aman</p>
                    <p className="text-xs" style={{ color: "var(--text-70)" }}>
                      Session terenkripsi dan role-based access.
                    </p>
                  </div>
                </div>
                <div className="dashboard-action-link !cursor-default">
                  <span className="dashboard-stat-icon dashboard-stat-icon-sm success">
                    <i className="fas fa-gauge-high" />
                  </span>
                  <div>
                    <p className="font-semibold text-secondary">Kinerja Cepat</p>
                    <p className="text-xs" style={{ color: "var(--text-70)" }}>
                      Navigasi dashboard lebih ringan dan responsif.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <form action="/login" method="POST" autoComplete="off" className="auth-form rounded-3xl border border-soft bg-surface p-5 sm:p-8">
              <div className="mb-4 lg:hidden">
                <span className="auth-badge">
                  <i className="fas fa-shield-heart" />
                  Secure Login
                </span>
              </div>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-3">
                  <img src="/images/logo2.png" alt="Logo" className="h-11 w-11 rounded-xl border border-soft bg-white p-1" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">Klinik HealthEase</p>
                    <p className="text-xs" style={{ color: "var(--text-70)" }}>
                      Sistem Klinik Terintegrasi
                    </p>
                  </div>
                </div>
                <Link href="/" className="text-xs font-semibold text-blue-600 hover:underline">
                  Kembali
                </Link>
              </div>

              <h2 className="mb-1 text-xl font-bold text-secondary sm:text-2xl">Sign In</h2>
              <p className="mb-6 text-sm" style={{ color: "var(--text-70)" }}>
                Silakan login untuk melanjutkan ke dashboard Anda.
              </p>

              <div className="mb-4">
                <label className="auth-label">Email</label>
                <input type="email" name="email" defaultValue={email ?? ""} required autoComplete="email" className="auth-input" />
              </div>

              <div className="mb-4">
                <label className="auth-label">Password</label>
                <PasswordInput name="password" required autoComplete="current-password" className="auth-input" />
              </div>

              <div className="mb-6 flex items-center justify-between">
                <label className="flex items-center text-sm" style={{ color: "var(--text-70)" }}>
                  <input type="checkbox" name="remember" className="mr-2 rounded border-soft" />
                  Ingat saya
                </label>
              </div>

              <button type="submit" className="auth-btn">
                <i className="fas fa-right-to-bracket" />
                Login
              </button>

              <div className="mt-4 text-center text-sm" style={{ color: "var(--text-70)" }}>
                Belum punya akun?{" "}
                <Link href="/register" className="font-semibold text-blue-700 hover:underline">
                  Daftar di sini
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
