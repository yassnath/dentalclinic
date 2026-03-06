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

const rawPrisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = rawPrisma;
}

const READ_METHODS = new Set([
  "findUnique",
  "findFirst",
  "findMany",
  "count",
  "aggregate",
  "groupBy",
  "$queryRaw",
  "$queryRawUnsafe",
]);

function aggregateFallback() {
  return {
    _sum: {},
    _avg: {},
    _min: {},
    _max: {},
    _count: 0,
  };
}

function fallbackValueFor(method: string) {
  if (method === "findMany" || method === "groupBy" || method === "$queryRaw" || method === "$queryRawUnsafe") return [];
  if (method === "findUnique" || method === "findFirst") return null;
  if (method === "count") return 0;
  if (method === "aggregate") return aggregateFallback();
  return null;
}

function withReadFailsafe<T extends object>(client: T): T {
  return new Proxy(client, {
    get(target, prop, receiver) {
      const rootValue = Reflect.get(target, prop, receiver);
      if (typeof rootValue === "function") {
        const method = String(prop);
        if (!READ_METHODS.has(method)) return rootValue.bind(target);
        return async (...args: unknown[]) => {
          try {
            return await rootValue.apply(target, args);
          } catch (error) {
            console.error(`[prisma-failsafe] ${method} failed:`, error instanceof Error ? error.message : String(error));
            return fallbackValueFor(method);
          }
        };
      }

      if (!rootValue || typeof rootValue !== "object") return rootValue;

      return new Proxy(rootValue as object, {
        get(delegateTarget, delegateProp, delegateReceiver) {
          const delegateValue = Reflect.get(delegateTarget, delegateProp, delegateReceiver);
          if (typeof delegateValue !== "function") return delegateValue;

          const method = String(delegateProp);
          if (!READ_METHODS.has(method)) return delegateValue.bind(delegateTarget);

          return async (...args: unknown[]) => {
            try {
              return await delegateValue.apply(delegateTarget, args);
            } catch (error) {
              const delegateName = String(prop);
              console.error(
                `[prisma-failsafe] ${delegateName}.${method} failed:`,
                error instanceof Error ? error.message : String(error),
              );
              return fallbackValueFor(method);
            }
          };
        },
      });
    },
  });
}

const failsafeFlag = (process.env.PRISMA_READ_FAILSAFE ?? "").trim().toLowerCase();
const useReadFailsafe = failsafeFlag
  ? failsafeFlag === "1" || failsafeFlag === "true" || failsafeFlag === "yes"
  : process.env.NODE_ENV === "production";

export const prisma = (useReadFailsafe ? withReadFailsafe(rawPrisma) : rawPrisma) as PrismaClient;
