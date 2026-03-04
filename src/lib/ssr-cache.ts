import type { ParsedUrlQuery } from "querystring";

type CacheEntry = {
  expiresAt: number;
  value: unknown;
};

const globalStore = globalThis as unknown as {
  __healtEaseSsrCache?: Map<string, CacheEntry>;
  __healtEaseSsrCachePending?: Map<string, Promise<unknown>>;
};

const cache = globalStore.__healtEaseSsrCache ?? new Map<string, CacheEntry>();
const pending = globalStore.__healtEaseSsrCachePending ?? new Map<string, Promise<unknown>>();

if (!globalStore.__healtEaseSsrCache) {
  globalStore.__healtEaseSsrCache = cache;
}
if (!globalStore.__healtEaseSsrCachePending) {
  globalStore.__healtEaseSsrCachePending = pending;
}

function normalizedQueryValue(value: string | string[] | undefined) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(",");
  return "";
}

function serializeQuery(query: ParsedUrlQuery) {
  const pairs = Object.entries(query)
    .map(([key, value]) => [key, normalizedQueryValue(value)] as const)
    .filter(([, value]) => value.length > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (pairs.length === 0) return "";
  return pairs.map(([key, value]) => `${key}=${value}`).join("&");
}

export function makeSsrCacheKey(base: string, query: ParsedUrlQuery) {
  const qs = serializeQuery(query);
  return qs ? `${base}?${qs}` : base;
}

export function shouldBypassSsrCache(query: ParsedUrlQuery) {
  const bypassKeys = ["success", "error", "warning", "warn", "fail", "failed", "message", "msg", "ok", "info"];
  return bypassKeys.some((key) => typeof query[key] === "string");
}

export async function withSsrCache<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
  if (ttlMs <= 0) {
    return loader();
  }

  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) {
    return hit.value as T;
  }

  const inFlight = pending.get(key);
  if (inFlight) {
    return inFlight as Promise<T>;
  }

  const job = (async () => {
    const value = await loader();
    cache.set(key, {
      expiresAt: Date.now() + ttlMs,
      value,
    });
    return value;
  })();

  pending.set(key, job);
  try {
    return await job;
  } finally {
    pending.delete(key);
  }
}

