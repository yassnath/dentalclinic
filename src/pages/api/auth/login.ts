import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionCookie, createSessionPayloadFromUser, getRoleHome } from "@/lib/auth";
import { withQuery } from "@/lib/http";

function pickBodyString(value: unknown) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const first = value[0];
    if (typeof first === "string") return first;
  }
  return "";
}

function redirectTo(res: NextApiResponse, path: string, params?: Record<string, string | undefined>) {
  const location = params ? withQuery(path, params) : path;
  res.status(303).setHeader("Location", location).end();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const email = pickBodyString(req.body?.email).trim().toLowerCase();
  const password = pickBodyString(req.body?.password);

  if (!email || !password) {
    redirectTo(res, "/login", { error: "Email dan password wajib diisi.", email });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      redirectTo(res, "/login", {
        error: "Login gagal. Email atau password salah.",
        email,
      });
      return;
    }

    await createSessionCookie(res, createSessionPayloadFromUser(user));
    redirectTo(res, getRoleHome(user.role), {
      success: "Login berhasil. Selamat datang!",
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    redirectTo(res, "/login", {
      error:
        process.env.NODE_ENV === "development"
          ? `Database error: ${reason}`
          : "Database belum terhubung. Pastikan koneksi Supabase (DATABASE_URL/DIRECT_URL) sudah benar.",
      email,
    });
  }
}
