import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function withSslMode(url: string) {
  if (!url) return url;
  if (/sslmode=/i.test(url)) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}sslmode=require`;
}

function ensureQueryParam(url: string, key: string, value: string) {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has(key)) {
      parsed.searchParams.set(key, value);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

function withSupabasePoolerDefaults(url: string) {
  if (!url) return url;
  if (!/pooler\.supabase\.com/i.test(url)) return url;
  let next = ensureQueryParam(url, "pgbouncer", "true");
  next = ensureQueryParam(next, "connection_limit", "1");
  next = ensureQueryParam(next, "pool_timeout", "20");
  return next;
}

function normalizeDirectUrl(url: string) {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const isPoolerHost = /pooler\.supabase\.com/i.test(parsed.hostname);
    const isPooler5432 = isPoolerHost && parsed.port === "5432";
    if (!isPooler5432) return url;

    const username = decodeURIComponent(parsed.username);
    const refMatch = username.match(/^postgres\.([a-z0-9]+)/i);
    if (!refMatch) return url;

    parsed.hostname = `db.${refMatch[1]}.supabase.co`;
    return parsed.toString();
  } catch {
    return url;
  }
}

function stripWrappingQuotes(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

const resolvedDatabaseUrl = stripWrappingQuotes(process.env.DATABASE_URL || process.env.DIRECT_URL || "");
if (resolvedDatabaseUrl) {
  process.env.DATABASE_URL = withSupabasePoolerDefaults(withSslMode(resolvedDatabaseUrl));
}
if (process.env.DIRECT_URL) {
  const direct = normalizeDirectUrl(stripWrappingQuotes(process.env.DIRECT_URL));
  process.env.DIRECT_URL = withSslMode(direct);
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
