import type { GetServerSideProps } from "next";
import bcrypt from "bcryptjs";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PasswordInput from "@/components/PasswordInput";
import { createSessionCookie, createSessionPayloadFromUser, requireAuth } from "@/lib/auth";
import { parseFormBody } from "@/lib/http";
import { createLanguageCookie, getLanguageFromRequest, normalizeLanguage, appendSetCookie, type AppLanguage } from "@/lib/language";
import { prisma } from "@/lib/prisma";
import { safeUnreadNotifCount } from "@/lib/notifications";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type Props = {
  user: SessionUser;
  unreadNotifCount: number;
  language: AppLanguage;
  success?: string;
  error?: string;
};

function normalizeUsername(value: unknown) {
  return String(value ?? "").trim();
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const language = getLanguageFromRequest(ctx);
  let dbUser = null;
  try {
    dbUser = await prisma.user.findUnique({
      where: { id: auth.user.id },
    });
  } catch (error) {
    console.error("[pasien/pengaturan] failed to fetch user:", error instanceof Error ? error.message : String(error));
  }

  const effectiveUser = dbUser ?? auth.user;

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const action = String(body.action ?? "");

    if (action === "language") {
      const nextLanguage = normalizeLanguage(String(body.language ?? "id").toLowerCase());
      appendSetCookie(ctx.res, createLanguageCookie(nextLanguage));
      return {
        redirect: {
          destination: "/pasien/pengaturan?success=Bahasa%20berhasil%20diperbarui.",
          permanent: false,
        },
      };
    }

    if (action === "account") {
      if (!dbUser) {
        return {
          redirect: {
            destination: "/pasien/pengaturan?error=Data%20akun%20tidak%20siap.%20Silakan%20refresh%20halaman.",
            permanent: false,
          },
        };
      }

      const username = normalizeUsername(body.username ?? dbUser.username);
      const currentPassword = String(body.current_password ?? "");
      const newPassword = String(body.new_password ?? "");
      const confirmPassword = String(body.confirm_password ?? "");

      const wantsPasswordChange = newPassword.length > 0 || confirmPassword.length > 0;
      const usernameChanged = username.length > 0 && username !== dbUser.username;

      if (!usernameChanged && !wantsPasswordChange) {
        return {
          redirect: {
            destination: "/pasien/pengaturan?error=Tidak%20ada%20perubahan%20yang%20disimpan.",
            permanent: false,
          },
        };
      }

      if (username.length < 3 || username.length > 50) {
        return {
          redirect: {
            destination: "/pasien/pengaturan?error=Username%20harus%203-50%20karakter.",
            permanent: false,
          },
        };
      }

      if (!(await bcrypt.compare(currentPassword, dbUser.password))) {
        return {
          redirect: {
            destination: "/pasien/pengaturan?error=Password%20saat%20ini%20tidak%20sesuai.",
            permanent: false,
          },
        };
      }

      if (wantsPasswordChange) {
        if (newPassword.length < 6) {
          return {
            redirect: {
              destination: "/pasien/pengaturan?error=Password%20baru%20minimal%206%20karakter.",
              permanent: false,
            },
          };
        }
        if (newPassword !== confirmPassword) {
          return {
            redirect: {
              destination: "/pasien/pengaturan?error=Konfirmasi%20password%20baru%20tidak%20cocok.",
              permanent: false,
            },
          };
        }
      }

      if (usernameChanged) {
        const duplicate = await prisma.user.findFirst({
          where: {
            username,
            id: { not: dbUser.id },
          },
          select: { id: true },
        });

        if (duplicate) {
          return {
            redirect: {
              destination: "/pasien/pengaturan?error=Username%20sudah%20dipakai.%20Gunakan%20username%20lain.",
              permanent: false,
            },
          };
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          ...(usernameChanged ? { username } : {}),
          ...(wantsPasswordChange ? { password: await bcrypt.hash(newPassword, 10) } : {}),
        },
      });
      await createSessionCookie(ctx.res, createSessionPayloadFromUser(updatedUser));

      return {
        redirect: {
          destination: "/pasien/pengaturan?success=Pengaturan%20akun%20berhasil%20diperbarui.",
          permanent: false,
        },
      };
    }
  }

  const unreadNotifCount = await safeUnreadNotifCount(effectiveUser.id);

  return {
    props: {
      user: toSessionUser(effectiveUser),
      unreadNotifCount,
      language,
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

export default function PasienPengaturanPage({ user, unreadNotifCount, language, success, error }: Props) {
  void success;
  void error;

  const isEn = language === "en";

  useEffect(() => {
    window.localStorage.setItem("healtease_lang", language);
    window.dispatchEvent(new Event("healtease-language-change"));
  }, [language]);

  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto w-full max-w-4xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">{isEn ? "Patient Settings" : "Pengaturan Pasien"}</h1>

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-bold text-secondary">{isEn ? "Language" : "Bahasa"}</h2>
          <p className="mb-4 text-sm" style={{ color: "var(--text-70)" }}>
            {isEn ? "Choose dashboard language for patient menus." : "Pilih bahasa dashboard untuk menu pasien."}
          </p>
          <form action="/pasien/pengaturan" method="POST" className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <input type="hidden" name="action" value="language" />
            <div className="w-full sm:max-w-xs">
              <label className="mb-1 block text-sm font-semibold">{isEn ? "Language Option" : "Pilihan Bahasa"}</label>
              <select name="language" defaultValue={language} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm">
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
            <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              {isEn ? "Save Language" : "Simpan Bahasa"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-bold text-secondary">{isEn ? "Account Security" : "Keamanan Akun"}</h2>
          <p className="mb-4 text-sm" style={{ color: "var(--text-70)" }}>
            {isEn
              ? "Update your username or password. Enter your current password to validate changes."
              : "Perbarui username atau password akun Anda. Masukkan password saat ini untuk validasi perubahan."}
          </p>

          <form
            action="/pasien/pengaturan"
            method="POST"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            data-confirm={isEn ? "Save account changes now?" : "Simpan perubahan akun sekarang?"}
            data-confirm-title={isEn ? "Confirm Update" : "Konfirmasi Update"}
            data-confirm-confirm-label={isEn ? "Save" : "Simpan"}
          >
            <input type="hidden" name="action" value="account" />

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold">{isEn ? "Username" : "Username"}</label>
              <input
                type="text"
                name="username"
                defaultValue={user.username}
                minLength={3}
                maxLength={50}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder={isEn ? "Choose a unique username" : "Pilih username yang unik"}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-semibold">{isEn ? "Current Password" : "Password Saat Ini"}</label>
              <PasswordInput
                name="current_password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder={isEn ? "Required for validation" : "Wajib untuk validasi"}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">{isEn ? "New Password" : "Password Baru"}</label>
              <PasswordInput
                name="new_password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder={isEn ? "Leave empty if unchanged" : "Kosongkan jika tidak diubah"}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">{isEn ? "Confirm New Password" : "Konfirmasi Password Baru"}</label>
              <PasswordInput
                name="confirm_password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                placeholder={isEn ? "Repeat new password" : "Ulangi password baru"}
              />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                {isEn ? "Save Account Changes" : "Simpan Perubahan Akun"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}
