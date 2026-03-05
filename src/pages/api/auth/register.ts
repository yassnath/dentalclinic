import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withQuery } from "@/lib/http";

type RegisterValues = {
  nik: string;
  name: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "Laki-laki" | "Perempuan" | "";
  alamat: string;
  rt_rw: string;
  kelurahan_desa: string;
  kecamatan: string;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  kewarganegaraan: string;
  berlaku_hingga: string;
  email: string;
  password: string;
};

function pickBodyString(value: unknown) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    const first = value[0];
    if (typeof first === "string") return first;
  }
  return "";
}

function sanitizeInput(input: unknown) {
  return String(input ?? "").trim();
}

function normalizeGender(raw: string): "Laki-laki" | "Perempuan" | "" {
  const value = raw.toLowerCase();
  if (value.includes("laki")) return "Laki-laki";
  if (value.includes("perempuan")) return "Perempuan";
  return "";
}

function normalizeDateInput(raw: string) {
  const text = raw.trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  const dmyMatch = text.match(/^(\d{2})[\/.\-\s](\d{2})[\/.\-\s](\d{4})$/);
  if (dmyMatch) {
    const [, day, month, year] = dmyMatch;
    return `${year}-${month}-${day}`;
  }

  const ymdMatch = text.match(/^(\d{4})[\/.\-\s](\d{2})[\/.\-\s](\d{2})$/);
  if (ymdMatch) {
    const [, year, month, day] = ymdMatch;
    return `${year}-${month}-${day}`;
  }

  const compact = text.replace(/\D/g, "");
  if (/^\d{8}$/.test(compact)) {
    const day = compact.slice(0, 2);
    const month = compact.slice(2, 4);
    const year = compact.slice(4, 8);
    return `${year}-${month}-${day}`;
  }

  return "";
}

function normalizeForValidation(values: RegisterValues): RegisterValues {
  return {
    ...values,
    nik: values.nik.replace(/\D/g, "").slice(0, 16),
    name: values.name.trim(),
    tempat_lahir: values.tempat_lahir.trim(),
    tanggal_lahir: normalizeDateInput(values.tanggal_lahir),
    jenis_kelamin: normalizeGender(values.jenis_kelamin),
    alamat: values.alamat.trim(),
    rt_rw: values.rt_rw.replace(/\s+/g, "").toUpperCase(),
    kelurahan_desa: values.kelurahan_desa.trim(),
    kecamatan: values.kecamatan.trim(),
    agama: values.agama.trim(),
    status_perkawinan: values.status_perkawinan.trim(),
    pekerjaan: values.pekerjaan.trim(),
    kewarganegaraan: values.kewarganegaraan.trim().toUpperCase(),
    berlaku_hingga: values.berlaku_hingga.trim().toUpperCase(),
    email: values.email.trim().toLowerCase(),
    password: values.password,
  };
}

function usernameFromIdentity(name: string, nik: string) {
  const nameChunk = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 14) || "pasien";
  return `${nameChunk}${nik.slice(-6)}`.slice(0, 50);
}

async function ensureUniqueUsername(name: string, nik: string) {
  const base = usernameFromIdentity(name, nik);
  for (let i = 0; i < 200; i += 1) {
    const candidate = i === 0 ? base : `${base}${i}`.slice(0, 50);
    const exists = await prisma.user.findFirst({
      where: { username: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }
  throw new Error("Gagal membuat username unik.");
}

function composeAddress(values: RegisterValues) {
  const joined = `${values.alamat}, RT/RW ${values.rt_rw}, Kel/Desa ${values.kelurahan_desa}, Kecamatan ${values.kecamatan}`;
  return joined.slice(0, 255);
}

function isValidIsoDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}

const registerSchema = z.object({
  nik: z.string().regex(/^[0-9]{16}$/, "NIK harus 16 digit."),
  name: z.string().min(2, "Nama minimal 2 karakter.").max(255),
  tempat_lahir: z.string().min(2, "Tempat lahir wajib diisi.").max(120),
  tanggal_lahir: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal lahir tidak valid.")
    .refine((value) => isValidIsoDate(value), "Tanggal lahir tidak valid."),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
  alamat: z.string().min(4, "Alamat wajib diisi.").max(255),
  rt_rw: z.string().min(3, "RT/RW wajib diisi.").max(15),
  kelurahan_desa: z.string().min(2, "Kel/Desa wajib diisi.").max(120),
  kecamatan: z.string().min(2, "Kecamatan wajib diisi.").max(120),
  agama: z.string().min(2, "Agama wajib diisi.").max(32),
  status_perkawinan: z.string().min(2, "Status perkawinan wajib diisi.").max(64),
  pekerjaan: z.string().min(2, "Pekerjaan wajib diisi.").max(120),
  kewarganegaraan: z.string().min(2, "Kewarganegaraan wajib diisi.").max(8),
  berlaku_hingga: z.string().min(2, "Berlaku hingga wajib diisi.").max(32),
  email: z.string().email("Email tidak valid."),
  password: z.string().min(6, "Password minimal 6 karakter."),
});

function redirectTo(res: NextApiResponse, path: string, params?: Record<string, string | undefined>) {
  const location = params ? withQuery(path, params) : path;
  res.status(303).setHeader("Location", location).end();
}

function resolveRegisterErrorMessage(reason: string) {
  const text = reason.toLowerCase();
  if (
    text.includes("can't reach database server") ||
    text.includes("tenant or user not found") ||
    text.includes("authentication failed") ||
    text.includes("p1000") ||
    text.includes("p1001") ||
    text.includes("p1017")
  ) {
    return "Database belum terhubung. Cek environment deployment: DATABASE_URL, DIRECT_URL, dan password Supabase.";
  }

  if (text.includes("unique constraint")) {
    return "Data sudah terdaftar. Cek kembali email atau NIK.";
  }

  return "Pendaftaran gagal diproses. Silakan coba lagi.";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const submittedValues: RegisterValues = {
    nik: sanitizeInput(pickBodyString(req.body?.nik)),
    name: sanitizeInput(pickBodyString(req.body?.name)),
    tempat_lahir: sanitizeInput(pickBodyString(req.body?.tempat_lahir)),
    tanggal_lahir: sanitizeInput(pickBodyString(req.body?.tanggal_lahir)),
    jenis_kelamin: normalizeGender(sanitizeInput(pickBodyString(req.body?.jenis_kelamin))),
    alamat: sanitizeInput(pickBodyString(req.body?.alamat)),
    rt_rw: sanitizeInput(pickBodyString(req.body?.rt_rw)),
    kelurahan_desa: sanitizeInput(pickBodyString(req.body?.kelurahan_desa)),
    kecamatan: sanitizeInput(pickBodyString(req.body?.kecamatan)),
    agama: sanitizeInput(pickBodyString(req.body?.agama)),
    status_perkawinan: sanitizeInput(pickBodyString(req.body?.status_perkawinan)),
    pekerjaan: sanitizeInput(pickBodyString(req.body?.pekerjaan)),
    kewarganegaraan: sanitizeInput(pickBodyString(req.body?.kewarganegaraan)),
    berlaku_hingga: sanitizeInput(pickBodyString(req.body?.berlaku_hingga)),
    email: sanitizeInput(pickBodyString(req.body?.email)),
    password: pickBodyString(req.body?.password),
  };
  const ktpVerified = pickBodyString(req.body?.ktp_verified).trim() === "1";
  if (!ktpVerified) {
    redirectTo(res, "/register", {
      error: "Konfirmasi data KTP wajib dicentang sebelum register.",
    });
    return;
  }

  const normalized = normalizeForValidation(submittedValues);
  const parsed = registerSchema.safeParse(normalized);
  if (!parsed.success) {
    redirectTo(res, "/register", {
      error: parsed.error.issues[0]?.message ?? "Input tidak valid.",
    });
    return;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;

    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ email: parsed.data.email }, { nik: parsed.data.nik }],
      },
      select: { id: true },
    });

    if (exists) {
      redirectTo(res, "/register", { error: "Email atau NIK sudah terdaftar." });
      return;
    }

    const hash = await bcrypt.hash(parsed.data.password, 10);
    const username = await ensureUniqueUsername(parsed.data.name, parsed.data.nik);

    const now = new Date();
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: parsed.data.name,
          username,
          email: parsed.data.email,
          password: hash,
          role: "pasien",
          tanggalLahir: new Date(parsed.data.tanggal_lahir),
          jenisKelamin: parsed.data.jenis_kelamin,
          nik: parsed.data.nik,
          alamat: composeAddress(parsed.data),
        },
      });

      await tx.patientIdentity.create({
        data: {
          userId: user.id,
          nik: parsed.data.nik,
          nama: parsed.data.name,
          tempatLahir: parsed.data.tempat_lahir,
          tanggalLahir: new Date(parsed.data.tanggal_lahir),
          jenisKelamin: parsed.data.jenis_kelamin,
          alamat: parsed.data.alamat,
          rtRw: parsed.data.rt_rw,
          kelurahanDesa: parsed.data.kelurahan_desa,
          kecamatan: parsed.data.kecamatan,
          agama: parsed.data.agama,
          statusPerkawinan: parsed.data.status_perkawinan,
          pekerjaan: parsed.data.pekerjaan,
          kewarganegaraan: parsed.data.kewarganegaraan,
          berlakuHingga: parsed.data.berlaku_hingga,
          isVerified: true,
          verifiedAt: now,
          createdAt: now,
          updatedAt: now,
        },
      });
    });

    redirectTo(res, "/login", {
      success: "Registrasi berhasil. Silakan login.",
      email: parsed.data.email,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    redirectTo(res, "/register", {
      error: process.env.NODE_ENV === "development" ? `Database error: ${reason}` : resolveRegisterErrorMessage(reason),
    });
  }
}
