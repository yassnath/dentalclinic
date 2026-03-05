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

const resolvedDatabaseUrl = (process.env.DATABASE_URL || process.env.DIRECT_URL || "").trim();
if (resolvedDatabaseUrl) {
  process.env.DATABASE_URL = withSslMode(resolvedDatabaseUrl);
}
if (process.env.DIRECT_URL) {
  process.env.DIRECT_URL = withSslMode(process.env.DIRECT_URL.trim());
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
