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
  process.env.DATABASE_URL = withSslMode(resolvedDatabaseUrl);
}
if (process.env.DIRECT_URL) {
  process.env.DIRECT_URL = withSslMode(stripWrappingQuotes(process.env.DIRECT_URL));
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
