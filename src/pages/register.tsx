import Head from "next/head";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import bcrypt from "bcryptjs";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";
import { getSessionFromToken, getRoleHome } from "@/lib/auth";
import PasswordInput from "@/components/PasswordInput";

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

type RegisterPageProps = {
  error?: string;
  values: RegisterValues;
};

const registerSchema = z.object({
  nik: z.string().regex(/^[0-9]{16}$/, "NIK harus 16 digit."),
  name: z.string().min(2, "Nama minimal 2 karakter.").max(255),
  tempat_lahir: z.string().min(2, "Tempat lahir wajib diisi.").max(120),
  tanggal_lahir: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal lahir tidak valid."),
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

function emptyValues(): RegisterValues {
  return {
    nik: "",
    name: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    rt_rw: "",
    kelurahan_desa: "",
    kecamatan: "",
    agama: "",
    status_perkawinan: "",
    pekerjaan: "",
    kewarganegaraan: "WNI",
    berlaku_hingga: "SEUMUR HIDUP",
    email: "",
    password: "",
  };
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

export const getServerSideProps: GetServerSideProps<RegisterPageProps> = async (ctx) => {
  const session = await getSessionFromToken(ctx.req.cookies.healtease_session);
  if (session) {
    return {
      redirect: {
        destination: getRoleHome(session.role),
        permanent: false,
      },
    };
  }

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const submittedValues: RegisterValues = {
      nik: sanitizeInput(body.nik),
      name: sanitizeInput(body.name),
      tempat_lahir: sanitizeInput(body.tempat_lahir),
      tanggal_lahir: sanitizeInput(body.tanggal_lahir),
      jenis_kelamin: normalizeGender(sanitizeInput(body.jenis_kelamin)),
      alamat: sanitizeInput(body.alamat),
      rt_rw: sanitizeInput(body.rt_rw),
      kelurahan_desa: sanitizeInput(body.kelurahan_desa),
      kecamatan: sanitizeInput(body.kecamatan),
      agama: sanitizeInput(body.agama),
      status_perkawinan: sanitizeInput(body.status_perkawinan),
      pekerjaan: sanitizeInput(body.pekerjaan),
      kewarganegaraan: sanitizeInput(body.kewarganegaraan),
      berlaku_hingga: sanitizeInput(body.berlaku_hingga),
      email: sanitizeInput(body.email),
      password: String(body.password ?? ""),
    };

    const normalized = normalizeForValidation(submittedValues);
    const parsed = registerSchema.safeParse(normalized);
    if (!parsed.success) {
      return {
        props: {
          error: parsed.error.issues[0]?.message ?? "Input tidak valid.",
          values: { ...normalized, password: "" },
        },
      };
    }

    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ email: parsed.data.email }, { nik: parsed.data.nik }],
      },
      select: { id: true },
    });

    if (exists) {
      return {
        props: { error: "Email atau NIK sudah terdaftar.", values: { ...parsed.data, password: "" } },
      };
    }

    const hash = await bcrypt.hash(parsed.data.password, 10);
    const username = await ensureUniqueUsername(parsed.data.name, parsed.data.nik);

    await prisma.user.create({
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

    return {
      redirect: {
        destination: "/login?success=Registrasi%20berhasil.%20Silakan%20login.",
        permanent: false,
      },
    };
  }

  return { props: { values: emptyValues() } };
};

type KtpFieldKey =
  | "nik"
  | "name"
  | "tempat_lahir"
  | "tanggal_lahir"
  | "jenis_kelamin"
  | "alamat"
  | "rt_rw"
  | "kelurahan_desa"
  | "kecamatan"
  | "agama"
  | "status_perkawinan"
  | "pekerjaan"
  | "kewarganegaraan"
  | "berlaku_hingga";

type OcrCandidate = {
  text: string;
  confidence: number;
  source: string;
  mode: string;
};

const KTP_FIELDS: KtpFieldKey[] = [
  "nik",
  "name",
  "tempat_lahir",
  "tanggal_lahir",
  "jenis_kelamin",
  "alamat",
  "rt_rw",
  "kelurahan_desa",
  "kecamatan",
  "agama",
  "status_perkawinan",
  "pekerjaan",
  "kewarganegaraan",
  "berlaku_hingga",
];

function parseKtpDate(raw: string) {
  return normalizeDateInput(raw.trim());
}

function cleanLine(line: string) {
  return line
    .replace(/\s+/g, " ")
    .replace(/[|`~]/g, "")
    .replace(/[؛]/g, ":")
    .trim();
}

function normalizeOcrNumeric(raw: string) {
  return raw.replace(/[Oo]/g, "0").replace(/[Il]/g, "1");
}

function normalizeLabelToken(line: string) {
  return line
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/0/g, "O")
    .replace(/1/g, "I")
    .replace(/2/g, "Z")
    .replace(/3/g, "E")
    .replace(/4/g, "A")
    .replace(/5/g, "S")
    .replace(/6/g, "G")
    .replace(/7/g, "T")
    .replace(/8/g, "B");
}

function pickRegexGroup(input: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = input.match(pattern);
    const value = match?.[1]?.trim();
    if (value) return cleanLine(value);
  }
  return "";
}

function normalizeAgama(raw: string) {
  const token = normalizeLabelToken(raw);
  if (!token) return "";
  if (token.includes("ISLAM")) return "ISLAM";
  if (token.includes("KRISTENPROTESTAN")) return "KRISTEN";
  if (token.includes("KRISTEN")) return "KRISTEN";
  if (token.includes("KATOLIK")) return "KATOLIK";
  if (token.includes("HINDU")) return "HINDU";
  if (token.includes("BUDDHA") || token.includes("BUDHA")) return "BUDDHA";
  if (token.includes("KONGHUCU") || token.includes("KHONGHUCU")) return "KONGHUCU";
  return "";
}

function normalizeStatusPerkawinan(raw: string) {
  const token = normalizeLabelToken(raw);
  if (!token) return "";
  if (token.includes("BELUMKAWIN")) return "BELUM KAWIN";
  if (token.includes("KAWIN")) return "KAWIN";
  if (token.includes("CERAIHIDUP")) return "CERAI HIDUP";
  if (token.includes("CERAIMATI")) return "CERAI MATI";
  return cleanLine(raw).toUpperCase();
}

function normalizeKewarganegaraan(raw: string) {
  const token = normalizeLabelToken(raw);
  if (token.includes("WNA")) return "WNA";
  if (token.includes("WNI")) return "WNI";
  return cleanLine(raw).toUpperCase();
}

function normalizeBerlakuHingga(raw: string) {
  const text = cleanLine(raw).toUpperCase();
  if (!text) return "";
  if (/SEUMUR\s*HIDUP/i.test(text)) return "SEUMUR HIDUP";
  const dateMatch = text.match(/(\d{2}[\/.\-]\d{2}[\/.\-]\d{4})/);
  if (dateMatch) return dateMatch[1].replace(/[./]/g, "-");
  return text;
}

function trimAtNextLabel(value: string) {
  return value
    .replace(
      /\b(?:RT\s*\/?\s*RW|KEL\s*\/?\s*DESA|KELURAHAN|DESA|KECAMATAN|AGAMA|STATUS\s*PERKAWINAN|STATUS\s*KAWIN|PEKERJAAN|KEWARGANEGARAAN|BERLAKU\s*HINGGA)\b.*$/i,
      "",
    )
    .trim();
}

function detectLabel(line: string): KtpFieldKey | null {
  const token = normalizeLabelToken(line);
  if (!token) return null;
  if (token.includes("NIK")) return "nik";
  if (token.includes("NAMA")) return "name";
  if ((token.includes("TEMPAT") || token.includes("TMP")) && token.includes("LAHIR")) return "tempat_lahir";
  if (token.includes("JENISKELAMIN")) return "jenis_kelamin";
  if (token.startsWith("ALAMAT")) return "alamat";
  if (token.includes("RTRW") || (token.includes("RT") && token.includes("RW"))) return "rt_rw";
  if (token.includes("KELDESA") || token.includes("KELURAHAN") || token.includes("DESA")) return "kelurahan_desa";
  if (token.includes("KECAMATAN")) return "kecamatan";
  if (token.includes("AGAMA")) return "agama";
  if (token.includes("STATUSPERKAWINAN") || token.includes("STATUSKAWIN") || token.includes("PERKAWINAN")) return "status_perkawinan";
  if (token.includes("PEKERJAAN") || token.includes("PEKERIAAN") || token.includes("PEKERJAN")) return "pekerjaan";
  if (token.includes("KEWARGANEGARAAN") || token.includes("KEWARGANEGARAN")) return "kewarganegaraan";
  if (token.includes("BERLAKUHINGGA") || (token.includes("BERLAKU") && token.includes("HINGGA"))) return "berlaku_hingga";
  return null;
}

function stripLabelFromLine(line: string, field: KtpFieldKey) {
  const patterns: Record<KtpFieldKey, RegExp> = {
    nik: /^N[IL1]?K\s*[:\-]?\s*/i,
    name: /^NAMA\s*[:\-]?\s*/i,
    tempat_lahir: /^(TEMPAT\s*\/?\s*TGL\s*LAHIR|TEMPAT\s*LAHIR|TMP\s*\/?\s*TGL\s*LAHIR|TMP\s*LAHIR)\s*[:\-]?\s*/i,
    tanggal_lahir: /^(TEMPAT\s*\/?\s*TGL\s*LAHIR|TGL\s*LAHIR)\s*[:\-]?\s*/i,
    jenis_kelamin: /^JENIS\s*KELAMIN\s*[:\-]?\s*/i,
    alamat: /^ALAMAT\s*[:\-]?\s*/i,
    rt_rw: /^RT\s*\/?\s*RW\s*[:\-]?\s*/i,
    kelurahan_desa: /^(KEL\s*\/?\s*DESA|KELURAHAN|DESA)\s*[:\-]?\s*/i,
    kecamatan: /^KECAMATAN\s*[:\-]?\s*/i,
    agama: /^AGAMA\s*[:\-]?\s*/i,
    status_perkawinan: /^STATUS\s*PERKAWINAN\s*[:\-]?\s*/i,
    pekerjaan: /^PEKERJAAN\s*[:\-]?\s*/i,
    kewarganegaraan: /^KEWARGANEGARAAN\s*[:\-]?\s*/i,
    berlaku_hingga: /^BERLAKU\s*HINGGA\s*[:\-]?\s*/i,
  };

  const colonIndex = line.indexOf(":");
  if (colonIndex >= 0) {
    return line.slice(colonIndex + 1).trim();
  }

  return line.replace(patterns[field], "").trim();
}

function splitTempatTanggal(raw: string) {
  const normalized = raw.replace(/\s+/g, " ").trim();
  const dateMatch = normalized.match(/(\d{2}[\/.\-]\d{2}[\/.\-]\d{4})/);
  if (!dateMatch) {
    return { tempat: normalized.replace(/[,\s]+$/, ""), tanggal: "" };
  }
  const tanggal = parseKtpDate(dateMatch[1]);
  const tempat = normalized
    .replace(dateMatch[1], "")
    .replace(/[,\s]+$/, "")
    .trim();
  return { tempat, tanggal };
}

function normalizeRtRw(raw: string) {
  const compact = raw.replace(/\s+/g, "");
  const match = normalizeOcrNumeric(compact).match(/(\d{1,3})[\/|\\-](\d{1,3})/);
  if (!match) return compact.toUpperCase();
  return `${match[1].padStart(3, "0")}/${match[2].padStart(3, "0")}`;
}

function decodeNikInfo(nik: string): { tanggal_lahir?: string; jenis_kelamin?: "Laki-laki" | "Perempuan" } {
  if (!/^\d{16}$/.test(nik)) return {};
  let day = Number(nik.slice(6, 8));
  const month = Number(nik.slice(8, 10));
  const yy = Number(nik.slice(10, 12));

  let gender: "Laki-laki" | "Perempuan" | undefined;
  if (day > 40) {
    day -= 40;
    gender = "Perempuan";
  } else {
    gender = "Laki-laki";
  }

  const now = new Date();
  const currentYY = now.getFullYear() % 100;
  const fullYear = yy > currentYY ? 1900 + yy : 2000 + yy;
  const date = new Date(fullYear, month - 1, day);
  if (Number.isNaN(date.getTime()) || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return { jenis_kelamin: gender };
  }

  const iso = `${fullYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { tanggal_lahir: iso, jenis_kelamin: gender };
}

function parseKtpText(raw: string): Partial<RegisterValues> {
  const lines = raw
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => cleanLine(line))
    .filter(Boolean);

  const result: Partial<RegisterValues> = {
    kewarganegaraan: "WNI",
    berlaku_hingga: "SEUMUR HIDUP",
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const label = detectLabel(line);
    if (!label) continue;

    let value = stripLabelFromLine(line, label);
    const nextLine = lines[i + 1] ?? "";
    if (!value && nextLine && !detectLabel(nextLine)) {
      value = nextLine;
    }

    if (label === "tempat_lahir") {
      const ttl = splitTempatTanggal(value || nextLine);
      if (ttl.tempat) result.tempat_lahir = ttl.tempat;
      if (ttl.tanggal) result.tanggal_lahir = ttl.tanggal;
      continue;
    }

    if (label === "nik") {
      const nik = normalizeOcrNumeric(value).replace(/\D/g, "").slice(0, 16);
      if (nik.length >= 12) result.nik = nik;
      continue;
    }

    if (label === "jenis_kelamin") {
      const truncated = value.split(/GOL\.?\s*DARAH/i)[0]?.trim() ?? value;
      const gender = normalizeGender(truncated);
      if (gender) result.jenis_kelamin = gender;
      continue;
    }

    if (label === "rt_rw") {
      const parsedRtRw = normalizeRtRw(value || nextLine);
      if (parsedRtRw) result.rt_rw = parsedRtRw;
      continue;
    }

    if (label === "alamat") {
      const alamatParts = [value].filter(Boolean);
      let cursor = i + 1;
      while (cursor < lines.length) {
        const candidate = lines[cursor];
        if (detectLabel(candidate)) break;
        alamatParts.push(candidate);
        cursor += 1;
      }
      if (alamatParts.length) result.alamat = alamatParts.join(", ").replace(/\s+/g, " ").trim();
      continue;
    }

    if (label === "name") {
      if (value) result.name = value;
      continue;
    }

    if (label === "kelurahan_desa" && value) result.kelurahan_desa = value;
    if (label === "kecamatan" && value) result.kecamatan = value;
    if (label === "agama" && value) result.agama = value;
    if (label === "status_perkawinan" && value) result.status_perkawinan = value;
    if (label === "pekerjaan" && value) result.pekerjaan = value;
    if (label === "kewarganegaraan" && value) result.kewarganegaraan = value.toUpperCase();
    if (label === "berlaku_hingga" && value) result.berlaku_hingga = value.toUpperCase();
  }

  const fullText = lines.join("\n");
  const fullTextNormalized = normalizeOcrNumeric(fullText);
  if (!result.nik) {
    const nikFallback = fullTextNormalized
      .match(/N[IL1]?K[^\d]{0,10}([0-9]{16})/i)?.[1]
      ?.replace(/\D/g, "")
      ?.slice(0, 16);
    if (nikFallback) result.nik = nikFallback;
  }
  if (!result.nik) {
    const anyNik = fullTextNormalized.match(/\b(\d{16})\b/)?.[1];
    if (anyNik) result.nik = anyNik;
  }

  if (!result.name) {
    const nameFallback = fullText.match(/NAMA\s*[:\-]?\s*([A-Z '.-]{3,})/i)?.[1]?.trim();
    if (nameFallback) result.name = nameFallback;
  }
  if (!result.name) {
    const nameIndex = lines.findIndex((line) => normalizeLabelToken(line).includes("NAMA"));
    const nextLine = nameIndex >= 0 ? lines[nameIndex + 1] : "";
    if (nextLine && !detectLabel(nextLine)) result.name = nextLine;
  }

  if (!result.tempat_lahir || !result.tanggal_lahir) {
    const ttlRaw = pickRegexGroup(fullText, [
      /(?:TEMPAT|TMP)\s*\/?\s*(?:TGL)?\s*LAHIR\s*[:\-]?\s*([^\n]+)/i,
      /TEMPAT\s*LAHIR\s*[:\-]?\s*([^\n]+)/i,
    ]);
    if (ttlRaw) {
      const ttl = splitTempatTanggal(ttlRaw);
      if (!result.tempat_lahir && ttl.tempat) result.tempat_lahir = ttl.tempat;
      if (!result.tanggal_lahir && ttl.tanggal) result.tanggal_lahir = ttl.tanggal;
    }
  }
  if (!result.tanggal_lahir) {
    const genericDate = pickRegexGroup(fullText, [/\b(\d{2}[\/.\-]\d{2}[\/.\-]\d{4})\b/, /\b(\d{4}[\/.\-]\d{2}[\/.\-]\d{2})\b/]);
    if (genericDate) result.tanggal_lahir = parseKtpDate(genericDate);
  }
  if (!result.tempat_lahir) {
    const dateLine = lines.find(
      (line) => /\d{2}[\/.\-]\d{2}[\/.\-]\d{4}/.test(line) && !normalizeLabelToken(line).includes("BERLAKU"),
    );
    if (dateLine) {
      const stripped = dateLine.replace(/^(TEMPAT\s*\/?\s*(TGL\s*)?LAHIR|TMP\s*\/?\s*(TGL\s*)?LAHIR)\s*[:\-]?\s*/i, "");
      const ttl = splitTempatTanggal(stripped);
      if (ttl.tempat) result.tempat_lahir = ttl.tempat;
    }
  }

  if (!result.tanggal_lahir || !result.jenis_kelamin) {
    const nikInfo = decodeNikInfo(result.nik ?? "");
    if (!result.tanggal_lahir && nikInfo.tanggal_lahir) result.tanggal_lahir = nikInfo.tanggal_lahir;
    if (!result.jenis_kelamin && nikInfo.jenis_kelamin) result.jenis_kelamin = nikInfo.jenis_kelamin;
  }

  if (!result.rt_rw) {
    const rtRwFallback = fullTextNormalized.match(/RT\s*\/?\s*RW\s*[:\-]?\s*([0-9]{1,3}\s*[\/\\-]\s*[0-9]{1,3})/i)?.[1];
    if (rtRwFallback) result.rt_rw = normalizeRtRw(rtRwFallback);
  }
  if (!result.rt_rw) {
    const genericRtRw = fullTextNormalized.match(/\b([0-9]{1,3}\s*[\/\\-]\s*[0-9]{1,3})\b/)?.[1];
    if (genericRtRw) result.rt_rw = normalizeRtRw(genericRtRw);
  }

  if (!result.alamat) {
    const alamat = pickRegexGroup(fullText, [/(?:^|\n)\s*ALAMAT\s*[:\-]?\s*([^\n]+)/i]);
    if (alamat) result.alamat = trimAtNextLabel(alamat);
  }
  if (!result.kelurahan_desa) {
    const kelDesa = pickRegexGroup(fullText, [/(?:KEL\s*\/?\s*DESA|KELURAHAN|DESA)\s*[:\-]?\s*([^\n]+)/i]);
    if (kelDesa) result.kelurahan_desa = trimAtNextLabel(kelDesa);
  }
  if (!result.kecamatan) {
    const kecamatan = pickRegexGroup(fullText, [/KECAMATAN\s*[:\-]?\s*([^\n]+)/i]);
    if (kecamatan) result.kecamatan = trimAtNextLabel(kecamatan);
  }
  if (!result.agama) {
    const agama = pickRegexGroup(fullText, [/AGAMA\s*[:\-]?\s*([^\n]+)/i]);
    if (agama) result.agama = agama;
  }
  if (!result.agama) {
    const agamaFromKeywords = normalizeAgama(fullText);
    if (agamaFromKeywords) result.agama = agamaFromKeywords;
  }
  if (!result.status_perkawinan) {
    const status = pickRegexGroup(fullText, [/STATUS\s*PERKAWINAN\s*[:\-]?\s*([^\n]+)/i, /STATUS\s*KAWIN\s*[:\-]?\s*([^\n]+)/i]);
    if (status) result.status_perkawinan = trimAtNextLabel(status);
  }
  if (!result.status_perkawinan) {
    const statusFromKeywords = normalizeStatusPerkawinan(fullText);
    if (statusFromKeywords) result.status_perkawinan = statusFromKeywords;
  }
  if (!result.pekerjaan) {
    const pekerjaan = pickRegexGroup(fullText, [/PEKERJ(?:AAN|AN|IAAN)\s*[:\-]?\s*([^\n]+)/i]);
    if (pekerjaan) result.pekerjaan = trimAtNextLabel(pekerjaan);
  }
  if (!result.kewarganegaraan) {
    const kewarganegaraan = pickRegexGroup(fullText, [/KEWARGANEGARAAN\s*[:\-]?\s*([^\n]+)/i, /\b(WNI|WNA)\b/i]);
    if (kewarganegaraan) result.kewarganegaraan = kewarganegaraan;
  }
  if (!result.berlaku_hingga) {
    const berlaku = pickRegexGroup(fullText, [/BERLAKU\s*HINGGA\s*[:\-]?\s*([^\n]+)/i, /\b(SEUMUR\s*HIDUP)\b/i]);
    if (berlaku) result.berlaku_hingga = berlaku;
  }

  const normalizeTextField = (value: string | undefined) => (value ? cleanLine(value) : "");
  return {
    nik: (result.nik ?? "").replace(/\D/g, "").slice(0, 16),
    name: normalizeTextField(result.name),
    tempat_lahir: normalizeTextField(result.tempat_lahir),
    tanggal_lahir: parseKtpDate(result.tanggal_lahir ?? ""),
    jenis_kelamin: normalizeGender(result.jenis_kelamin ?? ""),
    alamat: normalizeTextField(result.alamat),
    rt_rw: normalizeRtRw(result.rt_rw ?? ""),
    kelurahan_desa: normalizeTextField(result.kelurahan_desa),
    kecamatan: normalizeTextField(result.kecamatan),
    agama: normalizeAgama(result.agama ?? "") || normalizeTextField(result.agama),
    status_perkawinan: normalizeStatusPerkawinan(result.status_perkawinan ?? "") || normalizeTextField(result.status_perkawinan),
    pekerjaan: normalizeTextField(result.pekerjaan),
    kewarganegaraan: normalizeKewarganegaraan(result.kewarganegaraan ?? "WNI") || "WNI",
    berlaku_hingga: normalizeBerlakuHingga(result.berlaku_hingga ?? "SEUMUR HIDUP") || "SEUMUR HIDUP",
  };
}

function normalizeFieldForVote(field: KtpFieldKey, raw: string) {
  const value = cleanLine(raw);
  if (!value) return "";

  if (field === "nik") {
    return normalizeOcrNumeric(value).replace(/\D/g, "").slice(0, 16);
  }
  if (field === "tanggal_lahir") {
    return parseKtpDate(value);
  }
  if (field === "jenis_kelamin") {
    return normalizeGender(value);
  }
  if (field === "rt_rw") {
    return normalizeRtRw(value);
  }
  if (field === "kewarganegaraan") {
    return normalizeKewarganegaraan(value);
  }
  if (field === "berlaku_hingga") {
    return normalizeBerlakuHingga(value);
  }
  if (field === "agama") {
    return normalizeAgama(value) || value.toUpperCase();
  }
  if (field === "status_perkawinan") {
    return normalizeStatusPerkawinan(value);
  }
  return value;
}

function mergeParsedKtpResults(votes: Array<{ data: Partial<RegisterValues>; weight: number }>): Partial<RegisterValues> {
  const merged: Partial<RegisterValues> = {};

  for (const field of KTP_FIELDS) {
    const scoreMap = new Map<string, { score: number; rawLength: number }>();
    for (const vote of votes) {
      const raw = vote.data[field];
      if (typeof raw !== "string") continue;

      const normalized = normalizeFieldForVote(field, raw);
      if (!normalized) continue;

      if (field === "nik" && normalized.length !== 16) continue;
      if (field === "tanggal_lahir" && !/^\d{4}-\d{2}-\d{2}$/.test(normalized)) continue;
      if (field === "jenis_kelamin" && normalized !== "Laki-laki" && normalized !== "Perempuan") continue;

      const current = scoreMap.get(normalized) ?? { score: 0, rawLength: 0 };
      current.score += Math.max(1, vote.weight);
      current.rawLength = Math.max(current.rawLength, raw.length);
      scoreMap.set(normalized, current);
    }

    const best = [...scoreMap.entries()].sort((a, b) => {
      if (b[1].score !== a[1].score) return b[1].score - a[1].score;
      return b[1].rawLength - a[1].rawLength;
    })[0]?.[0];

    if (!best) continue;

    if (field === "jenis_kelamin") {
      merged.jenis_kelamin = best as RegisterValues["jenis_kelamin"];
    } else {
      merged[field] = best;
    }
  }

  if (!merged.kewarganegaraan) merged.kewarganegaraan = "WNI";
  if (!merged.berlaku_hingga) merged.berlaku_hingga = "SEUMUR HIDUP";
  return merged;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

async function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality = 0.95) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Gagal konversi gambar."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

async function buildOcrSources(source: Blob): Promise<Array<{ name: string; blob: Blob }>> {
  if (typeof window === "undefined" || typeof createImageBitmap !== "function") {
    return [{ name: "original", blob: source }];
  }

  const bitmap = await createImageBitmap(source);
  const scaledWidth = Math.max(1200, Math.floor(bitmap.width * 1.7));
  const scaledHeight = Math.max(760, Math.floor(bitmap.height * 1.7));

  const baseCanvas = document.createElement("canvas");
  baseCanvas.width = scaledWidth;
  baseCanvas.height = scaledHeight;
  const baseCtx = baseCanvas.getContext("2d", { willReadFrequently: true });
  if (!baseCtx) return [{ name: "original", blob: source }];

  baseCtx.drawImage(bitmap, 0, 0, scaledWidth, scaledHeight);
  const baseData = baseCtx.getImageData(0, 0, scaledWidth, scaledHeight);

  const enhancedCanvas = document.createElement("canvas");
  enhancedCanvas.width = scaledWidth;
  enhancedCanvas.height = scaledHeight;
  const enhancedCtx = enhancedCanvas.getContext("2d", { willReadFrequently: true });
  if (!enhancedCtx) return [{ name: "original", blob: source }];

  const enhanced = new ImageData(new Uint8ClampedArray(baseData.data), scaledWidth, scaledHeight);
  for (let i = 0; i < enhanced.data.length; i += 4) {
    const r = enhanced.data[i];
    const g = enhanced.data[i + 1];
    const b = enhanced.data[i + 2];
    let gray = 0.299 * r + 0.587 * g + 0.114 * b;
    gray = clamp((gray - 128) * 1.35 + 128, 0, 255);
    enhanced.data[i] = gray;
    enhanced.data[i + 1] = gray;
    enhanced.data[i + 2] = gray;
  }
  enhancedCtx.putImageData(enhanced, 0, 0);

  const binaryCanvas = document.createElement("canvas");
  binaryCanvas.width = scaledWidth;
  binaryCanvas.height = scaledHeight;
  const binaryCtx = binaryCanvas.getContext("2d", { willReadFrequently: true });
  if (!binaryCtx) return [{ name: "original", blob: source }, { name: "enhanced", blob: await canvasToBlob(enhancedCanvas, "image/png") }];

  const binarySoftCanvas = document.createElement("canvas");
  binarySoftCanvas.width = scaledWidth;
  binarySoftCanvas.height = scaledHeight;
  const binarySoftCtx = binarySoftCanvas.getContext("2d", { willReadFrequently: true });

  const binary = new ImageData(new Uint8ClampedArray(enhanced.data), scaledWidth, scaledHeight);
  const binarySoft = new ImageData(new Uint8ClampedArray(enhanced.data), scaledWidth, scaledHeight);
  for (let i = 0; i < binary.data.length; i += 4) {
    const hard = binary.data[i] > 148 ? 255 : 0;
    const soft = binarySoft.data[i] > 172 ? 255 : 0;
    binary.data[i] = hard;
    binary.data[i + 1] = hard;
    binary.data[i + 2] = hard;
    binarySoft.data[i] = soft;
    binarySoft.data[i + 1] = soft;
    binarySoft.data[i + 2] = soft;
  }
  binaryCtx.putImageData(binary, 0, 0);
  if (binarySoftCtx) binarySoftCtx.putImageData(binarySoft, 0, 0);

  const cropMarginX = Math.floor(scaledWidth * 0.035);
  const cropMarginY = Math.floor(scaledHeight * 0.06);
  const cropWidth = Math.max(32, scaledWidth - cropMarginX * 2);
  const cropHeight = Math.max(32, scaledHeight - cropMarginY * 2);
  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = scaledWidth;
  croppedCanvas.height = scaledHeight;
  const croppedCtx = croppedCanvas.getContext("2d");
  if (croppedCtx) {
    croppedCtx.fillStyle = "#fff";
    croppedCtx.fillRect(0, 0, scaledWidth, scaledHeight);
    croppedCtx.drawImage(enhancedCanvas, cropMarginX, cropMarginY, cropWidth, cropHeight, 0, 0, scaledWidth, scaledHeight);
  }

  const enhancedBlob = await canvasToBlob(enhancedCanvas, "image/png");
  const binaryBlob = await canvasToBlob(binaryCanvas, "image/png");
  const binarySoftBlob = binarySoftCtx ? await canvasToBlob(binarySoftCanvas, "image/png") : binaryBlob;
  const croppedBlob = croppedCtx ? await canvasToBlob(croppedCanvas, "image/png") : enhancedBlob;

  return [
    { name: "original", blob: source },
    { name: "enhanced", blob: enhancedBlob },
    { name: "binary-hard", blob: binaryBlob },
    { name: "binary-soft", blob: binarySoftBlob },
    { name: "cropped", blob: croppedBlob },
  ];
}

async function runKtpOcr(source: Blob): Promise<OcrCandidate[]> {
  const tesseract = await import("tesseract.js");
  const worker = await tesseract.createWorker(["ind", "eng"]);
  const passModes = [tesseract.PSM.SPARSE_TEXT, tesseract.PSM.SINGLE_BLOCK, tesseract.PSM.SINGLE_COLUMN];

  try {
    const sources = await buildOcrSources(source);
    const seen = new Map<string, OcrCandidate>();
    const candidates: OcrCandidate[] = [];

    const upsertCandidate = (candidate: OcrCandidate) => {
      const key = candidate.text.replace(/\s+/g, " ").trim();
      if (key.length < 18) return;
      const existing = seen.get(key);
      if (!existing || candidate.confidence > existing.confidence) {
        seen.set(key, candidate);
      }
    };

    for (const item of sources) {
      for (const mode of passModes) {
        await worker.setParameters({
          tessedit_pageseg_mode: mode,
          preserve_interword_spaces: "1",
          user_defined_dpi: "300",
          tessedit_char_blacklist: "[]{}<>`~",
        });
        const result = await worker.recognize(item.blob, { rotateAuto: true });
        const text = result.data.text?.trim();
        if (text) {
          upsertCandidate({
            text,
            confidence: Number(result.data.confidence ?? 0),
            source: item.name,
            mode: String(mode),
          });
        }
      }
    }

    for (const value of seen.values()) {
      candidates.push(value);
    }

    candidates.sort((a, b) => b.confidence - a.confidence);
    return candidates;
  } finally {
    await worker.terminate();
  }
}

export default function RegisterPage({ error, values }: RegisterPageProps) {
  void error;

  const [formValues, setFormValues] = useState<RegisterValues>(values);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const [scanError, setScanError] = useState("");
  const [scanBusy, setScanBusy] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setFormValues(values);
  }, [values]);

  const replaceSelectedImage = (image: Blob | null) => {
    setSelectedImage((prev) => {
      if (prev === image) return prev;
      return image;
    });
    setSelectedImageUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return image ? URL.createObjectURL(image) : "";
    });
  };

  const stopCameraStream = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (selectedImageUrl) URL.revokeObjectURL(selectedImageUrl);
    };
  }, [selectedImageUrl]);

  useEffect(() => {
    const startCamera = async () => {
      if (!scanOpen || selectedImage) return;
      setCameraReady(false);
      setScanMessage("Menyiapkan kamera...");
      setScanError("");

      const bindStream = async (stream: MediaStream) => {
        if (!videoRef.current) return false;
        const video = videoRef.current;
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");

        await video.play();
        await new Promise<void>((resolve, reject) => {
          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth > 0) {
            resolve();
            return;
          }
          const done = () => {
            cleanup();
            resolve();
          };
          const fail = () => {
            cleanup();
            reject(new Error("Kamera belum mengirim frame."));
          };
          const cleanup = () => {
            video.removeEventListener("loadeddata", done);
            video.removeEventListener("canplay", done);
            clearTimeout(timeout);
          };
          video.addEventListener("loadeddata", done, { once: true });
          video.addEventListener("canplay", done, { once: true });
          const timeout = window.setTimeout(fail, 2500);
        });

        return video.videoWidth > 0 && video.videoHeight > 0;
      };

      try {
        const mediaDevices = navigator.mediaDevices;
        if (!mediaDevices?.getUserMedia) {
          throw new Error("Browser tidak mendukung akses kamera.");
        }

        if (!window.isSecureContext) {
          setScanMessage("Mencoba akses kamera. Jika tetap hitam, buka lewat HTTPS agar kamera HP stabil.");
        }

        const options: Array<MediaTrackConstraints | true> = [
          {
            facingMode: { exact: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          { facingMode: "user" },
          true,
        ];

        let ready = false;
        let lastError: unknown = null;

        for (const videoConstraints of options) {
          try {
            stopCameraStream();
            const stream = await mediaDevices.getUserMedia({ video: videoConstraints, audio: false });
            streamRef.current = stream;
            const attached = await bindStream(stream);
            if (attached) {
              ready = true;
              break;
            }
          } catch (error) {
            lastError = error;
            stopCameraStream();
          }
        }

        if (!ready) {
          const hint =
            lastError instanceof Error && /NotAllowedError|Permission denied/i.test(lastError.name + lastError.message)
              ? "Izin kamera ditolak."
              : "Stream kamera tidak mengirim gambar.";
          throw new Error(hint);
        }

        setCameraReady(true);
        setScanMessage("Kamera siap. Arahkan KTP lalu klik Ambil & Scan.");
      } catch (error) {
        const detail = error instanceof Error ? ` (${error.message})` : "";
        setScanError(`Gagal mengakses kamera${detail} Pastikan permission aktif dan gunakan HTTPS saat buka dari HP.`);
        setScanMessage("");
        setCameraReady(false);
      }
    };

    const cleanupVideo = videoRef.current;
    void startCamera();
    return () => {
      setCameraReady(false);
      if (cleanupVideo) {
        cleanupVideo.pause();
        cleanupVideo.srcObject = null;
      }
      stopCameraStream();
    };
  }, [scanOpen, selectedImage]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const applyKtpResult = (payload: Partial<RegisterValues>) => {
    setFormValues((prev) => ({
      ...prev,
      nik: payload.nik?.trim() ? payload.nik.trim() : prev.nik,
      name: payload.name?.trim() ? payload.name.trim() : prev.name,
      tempat_lahir: payload.tempat_lahir?.trim() ? payload.tempat_lahir.trim() : prev.tempat_lahir,
      tanggal_lahir: payload.tanggal_lahir?.trim() ? payload.tanggal_lahir.trim() : prev.tanggal_lahir,
      jenis_kelamin:
        payload.jenis_kelamin === "Laki-laki" || payload.jenis_kelamin === "Perempuan"
          ? payload.jenis_kelamin
          : prev.jenis_kelamin,
      alamat: payload.alamat?.trim() ? payload.alamat.trim() : prev.alamat,
      rt_rw: payload.rt_rw?.trim() ? payload.rt_rw.trim() : prev.rt_rw,
      kelurahan_desa: payload.kelurahan_desa?.trim() ? payload.kelurahan_desa.trim() : prev.kelurahan_desa,
      kecamatan: payload.kecamatan?.trim() ? payload.kecamatan.trim() : prev.kecamatan,
      agama: payload.agama?.trim() ? payload.agama.trim() : prev.agama,
      status_perkawinan: payload.status_perkawinan?.trim() ? payload.status_perkawinan.trim() : prev.status_perkawinan,
      pekerjaan: payload.pekerjaan?.trim() ? payload.pekerjaan.trim() : prev.pekerjaan,
      kewarganegaraan: payload.kewarganegaraan?.trim() ? payload.kewarganegaraan.trim() : prev.kewarganegaraan,
      berlaku_hingga: payload.berlaku_hingga?.trim() ? payload.berlaku_hingga.trim() : prev.berlaku_hingga,
    }));
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      setScanError("Komponen kamera belum siap.");
      return;
    }
    if (!cameraReady || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || video.videoWidth === 0 || video.videoHeight === 0) {
      setScanError("Kamera belum siap. Tunggu sampai preview muncul jelas.");
      return;
    }

    setScanBusy(true);
    setScanError("");
    setScanMessage("Mengambil foto KTP...");

    try {
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas tidak tersedia.");
      context.drawImage(video, 0, 0, width, height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((file) => {
          if (!file) {
            reject(new Error("Gagal mengambil gambar."));
            return;
          }
          resolve(file);
        }, "image/jpeg", 0.95);
      });

      replaceSelectedImage(blob);
      stopCameraStream();
      setCameraReady(false);
      setScanMessage("Foto KTP berhasil diambil. Lanjutkan dengan klik Proses OCR.");
      setScanError("");
    } catch {
      setScanError("Gagal mengambil foto KTP. Coba ulangi.");
      setScanMessage("");
    } finally {
      setScanBusy(false);
    }
  };

  const processSelectedImage = async () => {
    if (!selectedImage) {
      setScanError("Belum ada foto KTP. Ambil foto atau pilih file terlebih dahulu.");
      return;
    }

    setScanBusy(true);
    setScanError("");
    setScanMessage("Menganalisa teks KTP (OCR multi-pass & voting)...");

    try {
      const ocrCandidates = await runKtpOcr(selectedImage);
      if (!ocrCandidates.length) {
        throw new Error("Tidak ada teks terbaca dari OCR.");
      }

      const weightedCandidates = ocrCandidates.map((item) => ({
        data: parseKtpText(item.text),
        weight: Math.max(1, Math.round(item.confidence / 18)),
      }));
      const combinedParse = parseKtpText(ocrCandidates.map((item) => item.text).join("\n"));
      const extracted = mergeParsedKtpResults([...weightedCandidates, { data: combinedParse, weight: 3 }]);
      applyKtpResult(extracted);

      const requiredKeys: KtpFieldKey[] = [
        "nik",
        "name",
        "tempat_lahir",
        "tanggal_lahir",
        "jenis_kelamin",
        "alamat",
        "rt_rw",
        "kelurahan_desa",
        "kecamatan",
        "agama",
        "status_perkawinan",
        "pekerjaan",
        "kewarganegaraan",
        "berlaku_hingga",
      ];
      const labels: Record<KtpFieldKey, string> = {
        nik: "NIK",
        name: "Nama",
        tempat_lahir: "Tempat Lahir",
        tanggal_lahir: "Tanggal Lahir",
        jenis_kelamin: "Jenis Kelamin",
        alamat: "Alamat",
        rt_rw: "RT/RW",
        kelurahan_desa: "Kel/Desa",
        kecamatan: "Kecamatan",
        agama: "Agama",
        status_perkawinan: "Status Perkawinan",
        pekerjaan: "Pekerjaan",
        kewarganegaraan: "Kewarganegaraan",
        berlaku_hingga: "Berlaku Hingga",
      };
      const missing = requiredKeys.filter((key) => {
        const value = extracted[key];
        return !(typeof value === "string" && value.trim().length > 0);
      });
      const filledCount = requiredKeys.length - missing.length;
      if (filledCount === 0) {
        setScanError("Teks KTP tidak terbaca jelas. Coba posisi lebih terang dan fokus.");
        setScanMessage("");
      } else if (missing.length > 0) {
        const previewMissing = missing
          .slice(0, 4)
          .map((key) => labels[key])
          .join(", ");
        const suffix = missing.length > 4 ? ` +${missing.length - 4} kolom lain` : "";
        const topConfidence = ocrCandidates[0]?.confidence ? ` (confidence terbaik: ${Math.round(ocrCandidates[0].confidence)}%)` : "";
        setScanMessage(`Scan berhasil sebagian. ${filledCount} kolom terisi otomatis${topConfidence}.`);
        setScanError(`Kolom yang belum terbaca: ${previewMissing}${suffix}. Silakan koreksi manual atau scan ulang.`);
      } else {
        const topConfidence = ocrCandidates[0]?.confidence ? ` (confidence terbaik: ${Math.round(ocrCandidates[0].confidence)}%)` : "";
        setScanMessage(`Scan selesai. Semua kolom KTP berhasil diisi otomatis${topConfidence}.`);
        setScanError("");
      }
    } catch {
      setScanError("Scan KTP gagal diproses. Coba ulangi dengan pencahayaan lebih baik.");
      setScanMessage("");
    } finally {
      setScanBusy(false);
    }
  };

  const onPickImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setScanError("File harus berupa gambar.");
      return;
    }

    replaceSelectedImage(file);
    stopCameraStream();
    setCameraReady(false);
    setScanError("");
    setScanMessage("Foto KTP dipilih. Lanjutkan dengan klik Proses OCR.");
  };

  const retakePhoto = () => {
    replaceSelectedImage(null);
    setScanError("");
    setScanMessage("Menyiapkan kamera...");
    setCameraReady(false);
  };

  const closeScan = () => {
    stopCameraStream();
    replaceSelectedImage(null);
    setScanOpen(false);
    setScanBusy(false);
    setCameraReady(false);
    setScanError("");
    setScanMessage("");
  };

  return (
    <>
      <Head>
        <title>Register Pasien</title>
      </Head>

      <div className="auth-shell min-h-[100svh] font-modify text-body">
        <div className="auth-orb auth-orb-a" />
        <div className="auth-orb auth-orb-b" />

        <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl items-center px-4 py-4 sm:py-8">
          <div className="auth-card grid w-full gap-3 p-2 sm:gap-4 sm:p-3 lg:grid-cols-2 lg:p-4">
            <aside className="auth-panel hidden p-8 lg:block">
              <span className="auth-badge">
                <i className="fas fa-id-card-clip" />
                Pendaftaran Pasien
              </span>
              <h1 className="auth-title mt-5">Buat Akun Pasien Baru</h1>
              <p className="auth-subtitle">
                Kolom data mengikuti format KTP. Gunakan scan kamera agar data masuk otomatis ke form.
              </p>

              <div className="mt-8 space-y-3">
                <div className="dashboard-action-link !cursor-default">
                  <span className="dashboard-stat-icon dashboard-stat-icon-sm primary">
                    <i className="fas fa-camera" />
                  </span>
                  <div>
                    <p className="font-semibold text-secondary">Scan KTP Otomatis</p>
                    <p className="text-xs" style={{ color: "var(--text-70)" }}>
                      OCR akan membaca KTP dan mengisi kolom form.
                    </p>
                  </div>
                </div>
                <div className="dashboard-action-link !cursor-default">
                  <span className="dashboard-stat-icon dashboard-stat-icon-sm success">
                    <i className="fas fa-shield-check" />
                  </span>
                  <div>
                    <p className="font-semibold text-secondary">Akun Siap Pakai</p>
                    <p className="text-xs" style={{ color: "var(--text-70)" }}>
                      Akun pasien langsung siap dipakai setelah registrasi selesai.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <form action="/register" method="POST" className="auth-form rounded-3xl border border-soft bg-surface p-5 sm:p-8">
              <div className="mb-4 lg:hidden">
                <span className="auth-badge">
                  <i className="fas fa-id-card-clip" />
                  Pendaftaran Pasien
                </span>
              </div>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-3">
                  <img src="/images/logo2.png" alt="Logo" className="h-11 w-11 rounded-xl border border-soft bg-white p-1" />
                  <div>
                    <p className="text-sm font-semibold text-secondary">Klinik HealthEase</p>
                    <p className="text-xs" style={{ color: "var(--text-70)" }}>
                      Registrasi Akun Pasien
                    </p>
                  </div>
                </div>
                <Link href="/" className="text-xs font-semibold text-blue-600 hover:underline">
                  Kembali
                </Link>
              </div>

              <h2 className="mb-1 text-xl font-bold text-secondary sm:text-2xl">Sign Up</h2>
              <p className="mb-3 text-sm" style={{ color: "var(--text-70)" }}>
                Gunakan scan KTP atau isi manual sesuai data KTP.
              </p>

              <div className="mb-6 rounded-xl border border-soft bg-blue-50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-secondary">Scan KTP by Camera</p>
                    <p className="text-xs" style={{ color: "var(--text-70)" }}>
                      Data KTP akan dipetakan otomatis ke kolom form.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScanOpen(true)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <i className="fas fa-camera mr-2" />
                    Scan KTP
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="auth-label">NIK</label>
                  <input type="text" name="nik" required value={formValues.nik} onChange={onFieldChange} inputMode="numeric" pattern="^[0-9]{16}$" maxLength={16} className="auth-input" placeholder="16 digit" />
                </div>
                <div>
                  <label className="auth-label">Nama</label>
                  <input type="text" name="name" required value={formValues.name} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Tempat Lahir</label>
                  <input type="text" name="tempat_lahir" required value={formValues.tempat_lahir} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Tanggal Lahir</label>
                  <input type="date" name="tanggal_lahir" required max={new Date().toISOString().slice(0, 10)} value={formValues.tanggal_lahir} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Jenis Kelamin</label>
                  <select name="jenis_kelamin" required value={formValues.jenis_kelamin} onChange={onFieldChange} className="auth-input">
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">RT/RW</label>
                  <input type="text" name="rt_rw" required value={formValues.rt_rw} onChange={onFieldChange} className="auth-input" placeholder="001/002" />
                </div>
                <div className="sm:col-span-2">
                  <label className="auth-label">Alamat</label>
                  <textarea name="alamat" required value={formValues.alamat} onChange={onFieldChange} className="auth-input" rows={2} />
                </div>
                <div>
                  <label className="auth-label">Kel/Desa</label>
                  <input type="text" name="kelurahan_desa" required value={formValues.kelurahan_desa} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Kecamatan</label>
                  <input type="text" name="kecamatan" required value={formValues.kecamatan} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Agama</label>
                  <input type="text" name="agama" required value={formValues.agama} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Status Perkawinan</label>
                  <input type="text" name="status_perkawinan" required value={formValues.status_perkawinan} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Pekerjaan</label>
                  <input type="text" name="pekerjaan" required value={formValues.pekerjaan} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Kewarganegaraan</label>
                  <input type="text" name="kewarganegaraan" required value={formValues.kewarganegaraan} onChange={onFieldChange} className="auth-input" />
                </div>
                <div>
                  <label className="auth-label">Berlaku Hingga</label>
                  <input type="text" name="berlaku_hingga" required value={formValues.berlaku_hingga} onChange={onFieldChange} className="auth-input" placeholder="SEUMUR HIDUP / DD-MM-YYYY" />
                </div>
                <div>
                  <label className="auth-label">Email</label>
                  <input type="email" name="email" required value={formValues.email} onChange={onFieldChange} className="auth-input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="auth-label">Password</label>
                  <PasswordInput name="password" required minLength={6} className="auth-input" defaultValue={formValues.password} />
                </div>
              </div>

              <button type="submit" className="auth-btn mt-6">
                <i className="fas fa-user-plus" />
                Register
              </button>

              <p className="mt-4 text-center text-sm" style={{ color: "var(--text-70)" }}>
                Sudah punya akun?{" "}
                <Link href="/login" className="font-medium text-blue-700 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {scanOpen ? (
        <div className="ktp-scan-overlay">
          <div className="ktp-scan-card">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-secondary">Scan KTP</h3>
                <p className="text-xs" style={{ color: "var(--text-70)" }}>
                  Ambil/pilih foto KTP terlebih dahulu, lalu proses OCR dari foto.
                </p>
              </div>
              <button type="button" onClick={closeScan} className="ktp-scan-close" aria-label="Tutup">
                ×
              </button>
            </div>

            <div className="ktp-scan-video-shell">
              {selectedImageUrl ? (
                <img src={selectedImageUrl} alt="Preview foto KTP" className="ktp-scan-video" />
              ) : (
                <video ref={videoRef} className="ktp-scan-video" autoPlay muted playsInline />
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />

            {scanMessage ? (
              <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">{scanMessage}</div>
            ) : null}
            {scanError ? (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{scanError}</div>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <label className="inline-flex cursor-pointer items-center rounded-xl border border-soft px-4 py-2 text-sm font-semibold text-secondary hover:bg-white/60">
                <i className="fas fa-image mr-2" />
                Pilih Foto
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onPickImageFile} />
              </label>

              <div className="flex flex-wrap justify-end gap-2">
                {selectedImage ? (
                  <button type="button" onClick={retakePhoto} className="rounded-xl border border-soft px-4 py-2 text-sm font-semibold text-secondary">
                    Ambil Ulang
                  </button>
                ) : null}
                <button type="button" onClick={closeScan} className="rounded-xl border border-soft px-4 py-2 text-sm font-semibold text-secondary">
                  Batal
                </button>
                {selectedImage ? (
                  <button
                    type="button"
                    onClick={processSelectedImage}
                    disabled={scanBusy}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    {scanBusy ? "Memproses..." : "Proses OCR"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={capturePhoto}
                    disabled={scanBusy || !cameraReady}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    {scanBusy ? "Memproses..." : "Ambil Foto"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
