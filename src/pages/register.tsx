import Head from "next/head";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import PasswordInput from "@/components/PasswordInput";
import ValidationPopup, { type ValidationType } from "@/components/ValidationPopup";

type RegisterValues = {
  provinsi: string;
  kota_kabupaten: string;
  nik: string;
  name: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "Laki-laki" | "Perempuan" | "";
  golongan_darah: string;
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
  error?: string | null;
  values: RegisterValues;
};

function emptyValues(): RegisterValues {
  return {
    provinsi: "",
    kota_kabupaten: "",
    nik: "",
    name: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    golongan_darah: "-",
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

export const getServerSideProps: GetServerSideProps<RegisterPageProps> = async (ctx) => {
  return {
    props: {
      error: typeof ctx.query.error === "string" ? ctx.query.error : null,
      values: emptyValues(),
    },
  };
};

type KtpFieldKey =
  | "provinsi"
  | "kota_kabupaten"
  | "nik"
  | "name"
  | "tempat_lahir"
  | "tanggal_lahir"
  | "jenis_kelamin"
  | "golongan_darah"
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

type OcrWorkerBundle = {
  tesseract: typeof import("tesseract.js");
  worker: Awaited<ReturnType<(typeof import("tesseract.js"))["createWorker"]>>;
};

type ScanLightStatus = "unknown" | "low" | "adequate" | "ideal";

let sharedOcrWorkerPromise: Promise<OcrWorkerBundle> | null = null;

async function getSharedOcrWorker(): Promise<OcrWorkerBundle> {
  if (!sharedOcrWorkerPromise) {
    sharedOcrWorkerPromise = (async () => {
      const tesseract = await import("tesseract.js");
      const worker = await tesseract.createWorker(["ind", "eng"]);
      return { tesseract, worker };
    })().catch((error) => {
      sharedOcrWorkerPromise = null;
      throw error;
    });
  }

  return sharedOcrWorkerPromise;
}

async function warmupOcrWorker() {
  try {
    await getSharedOcrWorker();
  } catch {
    // no-op: warmup gagal tidak boleh memblokir alur scan
  }
}

const KTP_FIELDS: KtpFieldKey[] = [
  "provinsi",
  "kota_kabupaten",
  "nik",
  "name",
  "tempat_lahir",
  "tanggal_lahir",
  "jenis_kelamin",
  "golongan_darah",
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
  return raw
    .replace(/[OoQqDd]/g, "0")
    .replace(/[Il|!]/g, "1")
    .replace(/[Zz]/g, "2")
    .replace(/[Ss]/g, "5")
    .replace(/[Gg]/g, "6")
    .replace(/[Bb]/g, "8");
}

function normalizeAlphaOcr(raw: string) {
  const value = cleanLine(raw).toUpperCase();
  if (!value) return "";
  return value
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

function normalizeGolonganDarah(raw: string) {
  const value = cleanLine(raw).toUpperCase();
  if (!value) return "";
  if (value.includes("-")) return "-";
  const match = value.match(/\b(AB|A|B|O)\b/);
  return match?.[1] ?? "";
}

function trimAtNextLabel(value: string) {
  return value
    .replace(
      /\b(?:RT\s*\/?\s*RW|KEL\s*\/?\s*DESA|KELURAHAN|DESA|KECAMATAN|AGAMA|STATUS\s*PERKAWINAN|STATUS\s*KAWIN|PEKERJAAN|KEWARGANEGARAAN|BERLAKU\s*HINGGA|PROVINSI|KABUPATEN|KOTA|GOL\.?\s*DARAH)\b.*$/i,
      "",
    )
    .trim();
}

function detectLabel(line: string): KtpFieldKey | null {
  const token = normalizeLabelToken(line);
  if (!token) return null;
  if (token.startsWith("PROVINSI")) return "provinsi";
  if (token.startsWith("KABUPATEN") || token.startsWith("KOTA")) return "kota_kabupaten";
  if (token.includes("NIK")) return "nik";
  if (token.includes("NAMA")) return "name";
  if ((token.includes("TEMPAT") || token.includes("TMP")) && token.includes("LAHIR")) return "tempat_lahir";
  if (token.includes("JENISKELAMIN")) return "jenis_kelamin";
  if (token.includes("GOLDARAH") || token.includes("GOLDRH")) return "golongan_darah";
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
    provinsi: /^PROVINSI\s*[:\-]?\s*/i,
    kota_kabupaten: /^(KABUPATEN|KOTA)\s*[:\-]?\s*/i,
    nik: /^N[IL1]?K\s*[:\-]?\s*/i,
    name: /^NAMA\s*[:\-]?\s*/i,
    tempat_lahir: /^(TEMPAT\s*\/?\s*TGL\s*LAHIR|TEMPAT\s*LAHIR|TMP\s*\/?\s*TGL\s*LAHIR|TMP\s*LAHIR)\s*[:\-]?\s*/i,
    tanggal_lahir: /^(TEMPAT\s*\/?\s*TGL\s*LAHIR|TGL\s*LAHIR)\s*[:\-]?\s*/i,
    jenis_kelamin: /^JENIS\s*KELAMIN\s*[:\-]?\s*/i,
    golongan_darah: /^GOL\.?\s*DARAH\s*[:\-]?\s*/i,
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

function collectRtRwCandidates(raw: string) {
  const normalized = normalizeOcrNumeric(raw).replace(/\s+/g, "");
  const matches = [...normalized.matchAll(/(\d{1,3})[\/\\-](\d{1,3})/g)];
  return matches.map((match) => ({
    rt: match[1],
    rw: match[2],
  }));
}

function scoreRtRwCandidate(input: { rt: string; rw: string }, hasLabelContext: boolean) {
  const rt = input.rt.replace(/\D/g, "");
  const rw = input.rw.replace(/\D/g, "");
  if (!rt || !rw) return -100;
  let score = 0;
  if (hasLabelContext) score += 4;
  if (rt.length === 3) score += 3;
  else if (rt.length === 2) score += 1;
  if (rw.length === 3) score += 3;
  else if (rw.length === 2) score += 1;

  const rtNum = Number(rt);
  const rwNum = Number(rw);
  if (Number.isFinite(rtNum) && Number.isFinite(rwNum)) {
    // Penalize date-like pair such as 30/01 that often appears in TTL.
    if (rtNum >= 1 && rtNum <= 31 && rwNum >= 1 && rwNum <= 12) score -= 2;
    if (rtNum === 0 && rwNum === 0) score -= 3;
  }

  return score;
}

function pickLikelyRtRw(raw: string, hasLabelContext = false) {
  const candidates = collectRtRwCandidates(raw);
  if (!candidates.length) return "";
  const ranked = candidates
    .map((candidate) => ({
      value: `${candidate.rt.padStart(3, "0")}/${candidate.rw.padStart(3, "0")}`,
      score: scoreRtRwCandidate(candidate, hasLabelContext),
    }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.value ?? "";
}

function normalizeRtRw(raw: string) {
  const picked = pickLikelyRtRw(raw, /RT\s*\/?\s*RW/i.test(raw));
  if (picked) return picked;
  const compact = normalizeOcrNumeric(raw).replace(/\s+/g, "");
  return compact.replace(/[^0-9/\\-]/g, "").slice(0, 15).toUpperCase();
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

function collectNikCandidates(raw: string) {
  const normalized = normalizeOcrNumeric(raw);
  const compact = normalized.replace(/[^\d]/g, "");
  const candidates = new Set<string>();

  for (const match of normalized.matchAll(/\b\d{16}\b/g)) {
    candidates.add(match[0]);
  }

  for (let i = 0; i + 16 <= compact.length; i += 1) {
    const slice = compact.slice(i, i + 16);
    if (/^\d{16}$/.test(slice)) candidates.add(slice);
  }

  return [...candidates];
}

function scoreNikCandidate(nik: string) {
  if (!/^\d{16}$/.test(nik)) return -1;
  let score = 0;
  if (!/^0+$/.test(nik)) score += 2;
  if (!/^(\d)\1{5}$/.test(nik.slice(0, 6))) score += 1;
  const info = decodeNikInfo(nik);
  if (info.jenis_kelamin) score += 1;
  if (info.tanggal_lahir) score += 4;
  return score;
}

function pickLikelyNik(raw: string) {
  const candidates = collectNikCandidates(raw);
  if (!candidates.length) return "";
  const ranked = candidates.sort((a, b) => scoreNikCandidate(b) - scoreNikCandidate(a));
  return ranked[0] ?? "";
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
    golongan_darah: "-",
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
      const nik = pickLikelyNik(`${line}\n${value}\n${nextLine}`);
      if (nik) result.nik = nik;
      continue;
    }

    if (label === "jenis_kelamin") {
      const truncated = value.split(/GOL\.?\s*DARAH/i)[0]?.trim() ?? value;
      const gender = normalizeGender(truncated);
      if (gender) result.jenis_kelamin = gender;
      const blood = normalizeGolonganDarah(value);
      if (blood) result.golongan_darah = blood;
      continue;
    }

    if (label === "golongan_darah") {
      const blood = normalizeGolonganDarah(value || nextLine);
      if (blood) result.golongan_darah = blood;
      continue;
    }

    if (label === "rt_rw") {
      const parsedRtRw = pickLikelyRtRw(`${line} ${value} ${nextLine}`, true) || normalizeRtRw(value || nextLine);
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

    if (label === "provinsi" && value) result.provinsi = value;
    if (label === "kota_kabupaten" && value) {
      const cityPrefix = /KABUPATEN/i.test(line) ? "KABUPATEN" : /KOTA/i.test(line) ? "KOTA" : "";
      result.kota_kabupaten = cityPrefix ? `${cityPrefix} ${value}`.trim() : value;
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
    const nikFallback = pickLikelyNik(fullTextNormalized);
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
    if (rtRwFallback) result.rt_rw = pickLikelyRtRw(rtRwFallback, true) || normalizeRtRw(rtRwFallback);
  }
  if (!result.rt_rw) {
    const genericRtRw = pickLikelyRtRw(fullTextNormalized, false);
    if (/^\d{3}\/\d{3}$/.test(genericRtRw)) result.rt_rw = genericRtRw;
  }

  if (!result.provinsi) {
    const provinsi = pickRegexGroup(fullText, [/(?:^|\n)\s*PROVINSI\s+([^\n]+)/i]);
    if (provinsi) result.provinsi = provinsi;
  }
  if (!result.kota_kabupaten) {
    const kotaKabupatenLine = fullText.match(/(?:^|\n)\s*((?:KABUPATEN|KOTA)\s+[^\n]+)/i)?.[1];
    if (kotaKabupatenLine) result.kota_kabupaten = cleanLine(kotaKabupatenLine);
  }
  if (!result.golongan_darah) {
    const golDarah = pickRegexGroup(fullText, [/GOL\.?\s*DARAH\s*[:\-]?\s*([ABO\-]{1,2})/i]);
    if (golDarah) result.golongan_darah = normalizeGolonganDarah(golDarah);
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
    provinsi: normalizeFieldForVote("provinsi", result.provinsi ?? ""),
    kota_kabupaten: normalizeFieldForVote("kota_kabupaten", result.kota_kabupaten ?? ""),
    nik: (result.nik ?? "").replace(/\D/g, "").slice(0, 16),
    name: normalizeFieldForVote("name", (result.name ?? "").replace(/\b(?:PROVINSI|KOTA|KABUPATEN)\b.*$/i, "")),
    tempat_lahir: normalizeFieldForVote("tempat_lahir", result.tempat_lahir ?? ""),
    tanggal_lahir: parseKtpDate(result.tanggal_lahir ?? ""),
    jenis_kelamin: normalizeGender(result.jenis_kelamin ?? ""),
    golongan_darah: normalizeGolonganDarah(result.golongan_darah ?? "-") || "-",
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
  if (field === "golongan_darah") {
    return normalizeGolonganDarah(value) || "-";
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

  const upper = normalizeAlphaOcr(value);
  if (field === "provinsi" || field === "kota_kabupaten") {
    return upper.replace(/[^A-Z0-9 '.,/-]/g, " ").replace(/\s+/g, " ").trim();
  }
  if (field === "name") return upper.replace(/[^A-Z '.-]/g, " ").replace(/\s+/g, " ").trim();
  if (field === "tempat_lahir") return upper.replace(/[^A-Z '.,-]/g, " ").replace(/\s+/g, " ").trim();
  if (field === "alamat") return upper.replace(/[^A-Z0-9 '.,/()-]/g, " ").replace(/\s+/g, " ").trim();
  if (field === "kelurahan_desa" || field === "kecamatan" || field === "pekerjaan") {
    return upper.replace(/[^A-Z0-9 '.,/-]/g, " ").replace(/\s+/g, " ").trim();
  }
  return upper;
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
      if (field === "golongan_darah" && !["-", "A", "B", "AB", "O"].includes(normalized)) continue;

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

async function rotateCanvasBlob(sourceCanvas: HTMLCanvasElement, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const absDeg = Math.abs(angleDeg) % 180;
  const swapAxis = absDeg === 90;
  const rotatedCanvas = document.createElement("canvas");
  rotatedCanvas.width = swapAxis ? sourceCanvas.height : sourceCanvas.width;
  rotatedCanvas.height = swapAxis ? sourceCanvas.width : sourceCanvas.height;
  const ctx = rotatedCanvas.getContext("2d");
  if (!ctx) return canvasToBlob(sourceCanvas, "image/png");

  ctx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
  ctx.rotate(rad);
  ctx.drawImage(sourceCanvas, -sourceCanvas.width / 2, -sourceCanvas.height / 2);
  return canvasToBlob(rotatedCanvas, "image/png");
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
  let luminanceSum = 0;
  const pixels = enhanced.data.length / 4;
  for (let i = 0; i < enhanced.data.length; i += 4) {
    const r = enhanced.data[i];
    const g = enhanced.data[i + 1];
    const b = enhanced.data[i + 2];
    luminanceSum += 0.299 * r + 0.587 * g + 0.114 * b;
  }
  const avgLuminance = pixels > 0 ? luminanceSum / pixels : 140;
  const lowLightMode = avgLuminance < 148;
  const gamma = lowLightMode ? 0.72 : 0.86;
  const gain = lowLightMode ? 1.54 : 1.35;
  const offset = lowLightMode ? 22 : 10;

  for (let i = 0; i < enhanced.data.length; i += 4) {
    const r = enhanced.data[i];
    const g = enhanced.data[i + 1];
    const b = enhanced.data[i + 2];
    const rawGray = 0.299 * r + 0.587 * g + 0.114 * b;
    const gammaAdjusted = 255 * Math.pow(rawGray / 255, gamma);
    let gray = clamp(gammaAdjusted + offset, 0, 255);
    gray = clamp((gray - 128) * gain + 128, 0, 255);
    enhanced.data[i] = gray;
    enhanced.data[i + 1] = gray;
    enhanced.data[i + 2] = gray;
  }
  enhancedCtx.putImageData(enhanced, 0, 0);

  const lowLightCanvas = document.createElement("canvas");
  lowLightCanvas.width = scaledWidth;
  lowLightCanvas.height = scaledHeight;
  const lowLightCtx = lowLightCanvas.getContext("2d", { willReadFrequently: true });
  if (lowLightCtx) {
    const lowLight = new ImageData(new Uint8ClampedArray(enhanced.data), scaledWidth, scaledHeight);
    for (let i = 0; i < lowLight.data.length; i += 4) {
      const boosted = clamp((lowLight.data[i] - 108) * (lowLightMode ? 1.7 : 1.52) + 132, 0, 255);
      lowLight.data[i] = boosted;
      lowLight.data[i + 1] = boosted;
      lowLight.data[i + 2] = boosted;
    }
    lowLightCtx.putImageData(lowLight, 0, 0);
  }

  const cropMarginX = Math.floor(scaledWidth * 0.03);
  const cropMarginY = Math.floor(scaledHeight * 0.05);
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

  const textFocusCanvas = document.createElement("canvas");
  textFocusCanvas.width = scaledWidth;
  textFocusCanvas.height = scaledHeight;
  const textFocusCtx = textFocusCanvas.getContext("2d");
  if (textFocusCtx) {
    const sx = Math.floor(scaledWidth * 0.01);
    const sy = Math.floor(scaledHeight * 0.12);
    const sw = Math.floor(scaledWidth * 0.82);
    const sh = Math.floor(scaledHeight * 0.83);
    textFocusCtx.fillStyle = "#fff";
    textFocusCtx.fillRect(0, 0, scaledWidth, scaledHeight);
    textFocusCtx.drawImage(croppedCanvas, sx, sy, sw, sh, 0, 0, scaledWidth, scaledHeight);
  }

  const enhancedBlob = await canvasToBlob(enhancedCanvas, "image/png");
  const lowLightBlob = lowLightCtx ? await canvasToBlob(lowLightCanvas, "image/png") : enhancedBlob;
  const croppedBlob = croppedCtx ? await canvasToBlob(croppedCanvas, "image/png") : enhancedBlob;
  const textFocusBlob = textFocusCtx ? await canvasToBlob(textFocusCanvas, "image/png") : croppedBlob;
  const rotated90Blob = textFocusCtx ? await rotateCanvasBlob(textFocusCanvas, 90) : textFocusBlob;
  const rotated270Blob = textFocusCtx ? await rotateCanvasBlob(textFocusCanvas, -90) : textFocusBlob;

  return [
    { name: "original", blob: source },
    { name: "enhanced", blob: enhancedBlob },
    { name: "text-focus", blob: textFocusBlob },
    { name: "cropped", blob: croppedBlob },
    { name: "low-light", blob: lowLightBlob },
    { name: "rotated-90", blob: rotated90Blob },
    { name: "rotated-270", blob: rotated270Blob },
  ];
}

const OCR_EARLY_STOP_FIELDS: KtpFieldKey[] = [
  "provinsi",
  "kota_kabupaten",
  "nik",
  "name",
  "tempat_lahir",
  "tanggal_lahir",
  "jenis_kelamin",
  "golongan_darah",
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

function countFilledKtpFields(data: Partial<RegisterValues>) {
  return OCR_EARLY_STOP_FIELDS.reduce((count, field) => {
    const value = data[field];
    return typeof value === "string" && value.trim().length > 0 ? count + 1 : count;
  }, 0);
}

async function runKtpOcr(source: Blob, onProgress?: (percent: number) => void): Promise<OcrCandidate[]> {
  const { tesseract, worker } = await getSharedOcrWorker();
  const primaryModes = [tesseract.PSM.SINGLE_BLOCK, tesseract.PSM.SPARSE_TEXT];
  const fallbackModes = [tesseract.PSM.AUTO];
  const sources = await buildOcrSources(source);
  const fallbackSourceNames = new Set(["low-light", "rotated-90", "rotated-270"]);
  const primarySources = sources.filter((item) => !fallbackSourceNames.has(item.name));
  const fallbackSources = sources.filter((item) => fallbackSourceNames.has(item.name));
  const seen = new Map<string, OcrCandidate>();
  const candidates: OcrCandidate[] = [];
  let bestFilled = 0;
  let bestConfidence = 0;

  const upsertCandidate = (candidate: OcrCandidate) => {
    const key = candidate.text.replace(/\s+/g, " ").trim();
    if (key.length < 18) return;
    const existing = seen.get(key);
    if (!existing || candidate.confidence > existing.confidence) {
      seen.set(key, candidate);
    }
  };

  const considerCandidate = (text: string, confidence: number, sourceName: string, mode: string) => {
    upsertCandidate({
      text,
      confidence,
      source: sourceName,
      mode,
    });

    const parsed = parseKtpText(text);
    const filled = countFilledKtpFields(parsed);
    if (filled > bestFilled || (filled === bestFilled && confidence > bestConfidence)) {
      bestFilled = filled;
      bestConfidence = confidence;
    }
  };

  const primaryTotal = Math.max(1, primarySources.length * primaryModes.length);
  let primaryDone = 0;
  let stopPrimary = false;

  for (const item of primarySources) {
    for (const mode of primaryModes) {
      await worker.setParameters({
        tessedit_pageseg_mode: mode,
        preserve_interword_spaces: "1",
        user_defined_dpi: "300",
        tessedit_char_blacklist: "[]{}<>`~",
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;/-()'",
        tessedit_do_invert: "0",
        load_system_dawg: "0",
        load_freq_dawg: "0",
      });

      const result = await worker.recognize(item.blob, { rotateAuto: true });
      const text = result.data.text?.trim();
      if (text) {
        const sourceBonus = item.name === "text-focus" ? 6 : item.name === "enhanced" ? 2 : 0;
        const confidence = Number(result.data.confidence ?? 0) + sourceBonus;
        considerCandidate(text, confidence, item.name, String(mode));

        if (bestFilled >= OCR_EARLY_STOP_FIELDS.length && bestConfidence >= 64) {
          stopPrimary = true;
        } else if (
          bestFilled >= OCR_EARLY_STOP_FIELDS.length - 1 &&
          bestConfidence >= 78 &&
          primaryDone >= Math.ceil(primaryTotal * 0.45)
        ) {
          stopPrimary = true;
        }
      }

      primaryDone += 1;
      const progress = 42 + Math.round((primaryDone / primaryTotal) * 42);
      onProgress?.(Math.min(84, progress));
      if (stopPrimary) break;
    }
    if (stopPrimary) break;
  }

  const needFallback = bestFilled < OCR_EARLY_STOP_FIELDS.length - 1 || bestConfidence < 72;
  if (needFallback && fallbackSources.length > 0) {
    const fallbackTotal = Math.max(1, fallbackSources.length * fallbackModes.length);
    let fallbackDone = 0;

    for (const item of fallbackSources) {
      for (const mode of fallbackModes) {
        await worker.setParameters({
          tessedit_pageseg_mode: mode,
          preserve_interword_spaces: "1",
          user_defined_dpi: "300",
          tessedit_char_blacklist: "[]{}<>`~",
          tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;/-()'",
          tessedit_do_invert: "0",
        });

        const result = await worker.recognize(item.blob, { rotateAuto: true });
        const text = result.data.text?.trim();
        if (text) {
          const sourceBonus = item.name.startsWith("rotated-") ? 3 : 2;
          const confidence = Number(result.data.confidence ?? 0) + sourceBonus;
          considerCandidate(text, confidence, item.name, String(mode));
        }

        fallbackDone += 1;
        const progress = 84 + Math.round((fallbackDone / fallbackTotal) * 8);
        onProgress?.(Math.min(92, progress));
      }
    }
  }

  onProgress?.(92);
  for (const value of seen.values()) {
    candidates.push(value);
  }
  candidates.sort((a, b) => b.confidence - a.confidence);
  return candidates;
}

export default function RegisterPage({ error, values }: RegisterPageProps) {
  void error;

  const [formValues, setFormValues] = useState<RegisterValues>(values);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const [scanError, setScanError] = useState("");
  const [scanBusy, setScanBusy] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPreviewUrl, setScanPreviewUrl] = useState("");
  const [lightScore, setLightScore] = useState(0);
  const [lightStatus, setLightStatus] = useState<ScanLightStatus>("unknown");
  const [scanPopup, setScanPopup] = useState<{ type: ValidationType; message: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analysisCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setFormValues(values);
  }, [values]);

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
      if (scanPreviewUrl) URL.revokeObjectURL(scanPreviewUrl);
    };
  }, [scanPreviewUrl]);

  useEffect(() => {
    const startCamera = async () => {
      if (!scanOpen) return;
      setCameraReady(false);
      setScanProgress(0);
      setScanPreviewUrl("");
      setLightScore(0);
      setLightStatus("unknown");
      setScanMessage("Menyiapkan kamera...");
      setScanError("");
      void warmupOcrWorker();

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
        setScanMessage("Kamera siap. Arahkan KTP lalu klik Scan.");
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
  }, [scanOpen]);

  useEffect(() => {
    if (!scanOpen || !cameraReady) return;
    if (scanBusy) return;

    const sampleLight = () => {
      const video = videoRef.current;
      const canvas = analysisCanvasRef.current;
      if (!video || !canvas || video.videoWidth <= 0 || video.videoHeight <= 0) return;

      const targetWidth = 220;
      const targetHeight = Math.max(120, Math.round((video.videoHeight / video.videoWidth) * targetWidth));
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
      const data = ctx.getImageData(0, 0, targetWidth, targetHeight).data;
      if (!data.length) return;

      let luminanceSum = 0;
      let sampleCount = 0;
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        luminanceSum += 0.299 * r + 0.587 * g + 0.114 * b;
        sampleCount += 1;
      }
      if (!sampleCount) return;

      const avgLuminance = luminanceSum / sampleCount;
      const normalized = Math.round(clamp(((avgLuminance - 38) / 172) * 100, 0, 100));
      const nextStatus: ScanLightStatus = normalized < 36 ? "low" : normalized < 64 ? "adequate" : "ideal";
      setLightScore(normalized);
      setLightStatus(nextStatus);
    };

    sampleLight();
    const timer = window.setInterval(sampleLight, 360);
    return () => {
      window.clearInterval(timer);
    };
  }, [scanOpen, cameraReady, scanBusy]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        name === "rt_rw"
          ? normalizeRtRw(value)
          : name === "golongan_darah"
            ? normalizeGolonganDarah(value) || value
            : value,
    }));
  };

  const applyKtpResult = (payload: Partial<RegisterValues>) => {
    setFormValues((prev) => ({
      ...prev,
      provinsi: payload.provinsi?.trim() ? payload.provinsi.trim() : prev.provinsi,
      kota_kabupaten: payload.kota_kabupaten?.trim() ? payload.kota_kabupaten.trim() : prev.kota_kabupaten,
      nik: payload.nik?.trim() ? payload.nik.trim() : prev.nik,
      name: payload.name?.trim() ? payload.name.trim() : prev.name,
      tempat_lahir: payload.tempat_lahir?.trim() ? payload.tempat_lahir.trim() : prev.tempat_lahir,
      tanggal_lahir: payload.tanggal_lahir?.trim() ? payload.tanggal_lahir.trim() : prev.tanggal_lahir,
      jenis_kelamin:
        payload.jenis_kelamin === "Laki-laki" || payload.jenis_kelamin === "Perempuan"
          ? payload.jenis_kelamin
          : prev.jenis_kelamin,
      golongan_darah: payload.golongan_darah?.trim() ? payload.golongan_darah.trim() : prev.golongan_darah,
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

  const captureAndScan = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      setScanError("Komponen kamera belum siap.");
      setScanPopup({ type: "error", message: "Scan gagal: komponen kamera belum siap." });
      return;
    }
    if (!cameraReady || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || video.videoWidth === 0 || video.videoHeight === 0) {
      setScanError("Kamera belum siap. Tunggu sampai preview muncul jelas.");
      setScanPopup({ type: "warning", message: "Kamera belum siap. Tunggu preview terlihat jelas." });
      return;
    }
    if (lightStatus === "unknown" || lightStatus === "low") {
      setScanError("Cahaya masih kurang. Tingkatkan cahaya sampai minimal status Cukup Cahaya.");
      setScanPopup({ type: "warning", message: "Pencahayaan belum cukup. Tingkatkan cahaya sebelum scan." });
      return;
    }

    setScanBusy(true);
    setScanProgress(8);
    setScanError("");
    setScanMessage("Menganalisa KTP");

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
      const previewUrl = URL.createObjectURL(blob);
      setScanPreviewUrl(previewUrl);
      setScanProgress(20);
      const ocrCandidates = await runKtpOcr(blob, (percent) => {
        setScanProgress((prev) => Math.max(prev, percent));
      });
      if (!ocrCandidates.length) {
        throw new Error("Tidak ada teks terbaca dari OCR.");
      }

      setScanProgress((prev) => Math.max(prev, 93));
      const weightedCandidates = ocrCandidates.map((item) => ({
        data: parseKtpText(item.text),
        weight:
          Math.max(1, Math.round(item.confidence / 16)) +
          (item.source === "text-focus" ? 2 : item.source === "enhanced" ? 1 : 0),
      }));
      const combinedParse = parseKtpText(ocrCandidates.map((item) => item.text).join("\n"));
      const extracted = mergeParsedKtpResults([...weightedCandidates, { data: combinedParse, weight: 3 }]);
      applyKtpResult(extracted);

      const requiredKeys: KtpFieldKey[] = [
        "provinsi",
        "kota_kabupaten",
        "nik",
        "name",
        "tempat_lahir",
        "tanggal_lahir",
        "jenis_kelamin",
        "golongan_darah",
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
        provinsi: "Provinsi",
        kota_kabupaten: "Kab/Kota",
        nik: "NIK",
        name: "Nama",
        tempat_lahir: "Tempat Lahir",
        tanggal_lahir: "Tanggal Lahir",
        jenis_kelamin: "Jenis Kelamin",
        golongan_darah: "Golongan Darah",
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
      setScanProgress(100);
      if (filledCount === 0) {
        setScanError("Teks KTP tidak terbaca jelas. Coba posisi lebih terang dan fokus.");
        setScanMessage("");
        setScanPopup({ type: "error", message: "Scan gagal. Teks KTP tidak terbaca jelas." });
      } else if (missing.length > 0) {
        const previewMissing = missing
          .slice(0, 4)
          .map((key) => labels[key])
          .join(", ");
        const suffix = missing.length > 4 ? ` +${missing.length - 4} kolom lain` : "";
        const topConfidence = ocrCandidates[0]?.confidence ? ` (confidence terbaik: ${Math.round(ocrCandidates[0].confidence)}%)` : "";
        setScanMessage(`Scan berhasil sebagian. ${filledCount} kolom terisi otomatis${topConfidence}.`);
        setScanError(`Kolom yang belum terbaca: ${previewMissing}${suffix}. Silakan koreksi manual atau scan ulang.`);
        setScanPopup({ type: "warning", message: `Scan berhasil sebagian. ${filledCount}/${requiredKeys.length} kolom terisi.` });
      } else {
        const topConfidence = ocrCandidates[0]?.confidence ? ` (confidence terbaik: ${Math.round(ocrCandidates[0].confidence)}%)` : "";
        setScanMessage(`Scan selesai. Semua kolom KTP berhasil diisi otomatis${topConfidence}.`);
        setScanError("");
        setScanPopup({ type: "success", message: "Scan KTP berhasil. Semua kolom berhasil dipetakan." });
      }
    } catch {
      setScanError("Scan KTP gagal diproses. Coba ulangi dengan pencahayaan lebih baik.");
      setScanMessage("");
      setScanProgress(0);
      setScanPopup({ type: "error", message: "Scan KTP gagal diproses. Silakan scan ulang." });
    } finally {
      setScanBusy(false);
      setScanPreviewUrl("");
    }
  };

  const closeScan = () => {
    stopCameraStream();
    setScanOpen(false);
    setScanBusy(false);
    setScanProgress(0);
    setCameraReady(false);
    setScanError("");
    setScanMessage("");
    setScanPreviewUrl("");
    setLightScore(0);
    setLightStatus("unknown");
  };

  const lightStatusLabel =
    lightStatus === "low"
      ? "Kekurangan Cahaya"
      : lightStatus === "adequate"
        ? "Cukup Cahaya (Minimal)"
        : lightStatus === "ideal"
          ? "Cahaya Pas (Rekomendasi)"
          : "Mendeteksi Cahaya...";
  const lightStatusHint =
    lightStatus === "low"
      ? "Tambah pencahayaan atau dekatkan KTP ke sumber cahaya."
      : lightStatus === "adequate"
        ? "Sudah bisa scan, tapi hasil terbaik didapat saat Cahaya Pas."
        : lightStatus === "ideal"
          ? "Pencahayaan sudah optimal. Silakan lanjut scan."
          : "Arahkan KTP dan tunggu indikator stabil.";

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

            <form
              action="/api/auth/register"
              method="POST"
              className="auth-form rounded-3xl border border-soft bg-surface p-5 sm:p-8"
              data-confirm="Pastikan semua data sudah benar?"
              data-confirm-title="Konfirmasi Registrasi"
              data-confirm-confirm-label="Ya, Register"
            >
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
                  <label className="auth-label">Provinsi</label>
                  <input type="text" name="provinsi" required value={formValues.provinsi} onChange={onFieldChange} className="auth-input" placeholder="PROVINSI JAWA TIMUR" />
                </div>
                <div>
                  <label className="auth-label">Kabupaten/Kota</label>
                  <input type="text" name="kota_kabupaten" required value={formValues.kota_kabupaten} onChange={onFieldChange} className="auth-input" placeholder="KOTA MALANG" />
                </div>
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
                  <label className="auth-label">Golongan Darah</label>
                  <select name="golongan_darah" required value={formValues.golongan_darah} onChange={onFieldChange} className="auth-input">
                    <option value="-">-</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
                <div>
                  <label className="auth-label">RT/RW</label>
                  <input
                    type="text"
                    name="rt_rw"
                    required
                    value={formValues.rt_rw}
                    onChange={onFieldChange}
                    className="auth-input"
                    placeholder="001/002"
                    inputMode="numeric"
                    pattern="^[0-9]{3}/[0-9]{3}$"
                    maxLength={7}
                  />
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

              <label className="mt-4 flex items-start gap-2 text-sm" style={{ color: "var(--text-70)" }}>
                <input
                  type="checkbox"
                  name="ktp_verified"
                  value="1"
                  required
                  className="mt-0.5 rounded border-soft"
                />
                <span>Saya memastikan data hasil scan/isi manual sudah benar dan sesuai KTP asli.</span>
              </label>

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
                  Arahkan KTP ke kamera lalu tekan Scan untuk proses otomatis.
                </p>
              </div>
              <button type="button" onClick={closeScan} className="ktp-scan-close" aria-label="Tutup">
                ×
              </button>
            </div>

            <div className="ktp-scan-video-shell">
              <video ref={videoRef} className="ktp-scan-video" autoPlay muted playsInline />
              {scanBusy && scanPreviewUrl ? (
                <img src={scanPreviewUrl} alt="Hasil tangkapan KTP" className="ktp-scan-freeze-frame" />
              ) : null}
              {scanBusy ? (
                <div className="ktp-scan-progress-layer">
                  <div className="ktp-scan-progress-mask" style={{ width: `${scanProgress}%` }} />
                  <div className="ktp-scan-progress-track">
                    <div className="ktp-scan-progress-fill" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <div className="ktp-scan-progress-dot" style={{ left: `${Math.min(95, Math.max(5, scanProgress))}%` }}>
                    <span>{scanProgress}%</span>
                  </div>
                </div>
              ) : null}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <canvas ref={analysisCanvasRef} className="hidden" />

            <div className="mt-3 rounded-xl border border-soft bg-surface-soft px-3 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">Indikator Pencahayaan</p>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${
                    lightStatus === "ideal"
                      ? "bg-emerald-100 text-emerald-700"
                      : lightStatus === "adequate"
                        ? "bg-amber-100 text-amber-700"
                        : lightStatus === "low"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {lightStatusLabel}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all ${
                    lightStatus === "ideal"
                      ? "bg-emerald-500"
                      : lightStatus === "adequate"
                        ? "bg-amber-500"
                        : lightStatus === "low"
                          ? "bg-red-500"
                          : "bg-slate-400"
                  }`}
                  style={{ width: `${Math.max(8, lightScore)}%` }}
                />
              </div>
              <p className="mt-2 text-[11px]" style={{ color: "var(--text-70)" }}>
                {lightStatusHint}
              </p>
              <div className="mt-2 grid gap-1 text-[11px]">
                <p className={`${lightStatus === "low" ? "text-red-600" : "text-secondary"}`}>
                  {lightStatus === "low" ? "!" : "•"} Kekurangan cahaya
                </p>
                <p
                  className={`${lightStatus === "adequate" || lightStatus === "ideal" ? "text-amber-600" : ""}`}
                  style={lightStatus === "adequate" || lightStatus === "ideal" ? undefined : { color: "var(--text-70)" }}
                >
                  {lightStatus === "adequate" || lightStatus === "ideal" ? "✓" : "•"} Cukup cahaya (minimal bisa scan)
                </p>
                <p className={`${lightStatus === "ideal" ? "text-emerald-600" : ""}`} style={lightStatus === "ideal" ? undefined : { color: "var(--text-70)" }}>
                  {lightStatus === "ideal" ? "✓" : "•"} Cahaya pas (rekomendasi terbaik)
                </p>
              </div>
            </div>

            {scanMessage ? (
              <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">{scanMessage}</div>
            ) : null}
            {scanError ? (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{scanError}</div>
            ) : null}

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={closeScan} className="rounded-xl border border-soft px-4 py-2 text-sm font-semibold text-secondary">
                Batal
              </button>
              <button
                type="button"
                onClick={captureAndScan}
                disabled={scanBusy || !cameraReady || lightStatus === "unknown" || lightStatus === "low"}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {scanBusy ? "Memproses..." : lightStatus === "unknown" || lightStatus === "low" ? "Atur Cahaya" : "Scan"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {scanPopup ? <ValidationPopup type={scanPopup.type} message={scanPopup.message} onClose={() => setScanPopup(null)} /> : null}
    </>
  );
}
