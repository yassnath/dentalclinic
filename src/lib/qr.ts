import type { IncomingHttpHeaders } from "http";

function pickHeader(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }
  if (typeof value === "string") {
    return value.split(",")[0]?.trim() ?? "";
  }
  return "";
}

function normalizeConfiguredBaseUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  if (/^[a-z]+:\/\//i.test(trimmed)) return trimmed;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(trimmed)) {
    return `http://${trimmed}`;
  }
  return `https://${trimmed}`;
}

export function getAppBaseUrl(headers?: IncomingHttpHeaders) {
  const configured = [process.env.APP_URL, process.env.NEXT_PUBLIC_APP_URL]
    .find((value) => typeof value === "string" && value.trim().length > 0);

  if (configured) {
    return normalizeConfiguredBaseUrl(configured);
  }

  const host = pickHeader(headers?.["x-forwarded-host"]) || pickHeader(headers?.host) || "localhost:3000";
  const proto =
    pickHeader(headers?.["x-forwarded-proto"]) ||
    (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host) ? "http" : "https");

  return `${proto}://${host}`.replace(/\/+$/, "");
}

export function buildPatientScanUrl(token: string, headers?: IncomingHttpHeaders) {
  return `${getAppBaseUrl(headers)}/scan/pasien/${encodeURIComponent(String(token).trim())}`;
}

export function getPatientQrUrl(token: string | null | undefined) {
  const value = String(token ?? "").trim();
  if (!value) return null;
  return `/qr/pasien/${encodeURIComponent(value)}`;
}
