import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma";
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

function toErrorReason(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unknown error";
}

function isConnectivityReason(reason: string) {
  const text = reason.toLowerCase();
  return (
    text.includes("can't reach database server") ||
    text.includes("tenant or user not found") ||
    text.includes("authentication failed") ||
    text.includes("p1000") ||
    text.includes("p1001") ||
    text.includes("p1017")
  );
}

function resolveLoginErrorMessage(error: unknown) {
  const reason = toErrorReason(error);
  if (error instanceof Prisma.PrismaClientInitializationError || isConnectivityReason(reason)) {
    return "Database belum terhubung. Cek environment deployment: DATABASE_URL, DIRECT_URL, dan password Supabase.";
  }
  if (reason.toLowerCase().includes("timed out") || reason.toLowerCase().includes("timeout")) {
    return "Koneksi database timeout. Coba ulang beberapa saat lagi.";
  }
  return "Login gagal diproses. Silakan coba lagi.";
}

type SupabaseUserRow = {
  id: number | string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  spesialis: string | null;
  alamat: string | null;
  telepon: string | null;
  no_hp: string | null;
  tanggal_lahir: string | null;
  jenis_kelamin: string | null;
  nik: string | null;
  no_rm: string | null;
  qr_token: string | null;
  qr_path: string | null;
};

function normalizeRole(role: string): "admin" | "dokter" | "pasien" | "resepsionis" {
  if (role === "admin" || role === "dokter" || role === "pasien" || role === "resepsionis") return role;
  return "pasien";
}

async function trySupabaseLoginFallback(email: string, password: string, res: NextApiResponse) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return { status: "skip" as const };

  try {
    const endpoint = new URL("/rest/v1/users", supabaseUrl);
    endpoint.searchParams.set(
      "select",
      "id,name,username,email,password,role,spesialis,alamat,telepon,no_hp,tanggal_lahir,jenis_kelamin,nik,no_rm,qr_token,qr_path",
    );
    endpoint.searchParams.set("email", `eq.${email}`);
    endpoint.searchParams.set("limit", "1");

    const response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Supabase REST login fallback failed: HTTP ${response.status} ${body.slice(0, 300)}`);
    }

    const rows = (await response.json()) as SupabaseUserRow[];
    const row = rows[0];
    if (!row || !row.password) return { status: "invalid" as const };
    const passwordOk = await bcrypt.compare(password, row.password);
    if (!passwordOk) return { status: "invalid" as const };

    const role = normalizeRole(row.role);
    const tanggalLahirIso = row.tanggal_lahir ? new Date(row.tanggal_lahir).toISOString() : null;
    await createSessionCookie(res, {
      userId: String(row.id),
      role,
      user: {
        name: row.name || "",
        username: row.username || "",
        email: row.email || email,
        spesialis: row.spesialis ?? null,
        noHp: row.no_hp ?? null,
        telepon: row.telepon ?? null,
        nik: row.nik ?? null,
        alamat: row.alamat ?? null,
        tanggalLahir: tanggalLahirIso,
        jenisKelamin: row.jenis_kelamin ?? null,
        noRm: row.no_rm ?? null,
        qrToken: row.qr_token ?? null,
        qrPath: row.qr_path ?? null,
      },
    });
    return { status: "success" as const, role };
  } catch (fallbackError) {
    const reason = toErrorReason(fallbackError);
    console.error("[login] supabase fallback failed:", reason);
    return { status: "error" as const, reason };
  }
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
    const reason = toErrorReason(error);
    console.error("[login] prisma failed:", reason);

    const fallback = await trySupabaseLoginFallback(email, password, res);
    if (fallback.status === "success") {
      redirectTo(res, getRoleHome(fallback.role), {
        success: "Login berhasil. Selamat datang!",
      });
      return;
    }
    if (fallback.status === "invalid") {
      redirectTo(res, "/login", {
        error: "Login gagal. Email atau password salah.",
        email,
      });
      return;
    }

    redirectTo(res, "/login", {
      error:
        process.env.NODE_ENV === "development"
          ? `Database error: ${reason}`
          : resolveLoginErrorMessage(error),
      email,
    });
  }
}
