import type { IncomingMessage } from "http";
import { parse } from "querystring";

export async function parseFormBody(req: IncomingMessage): Promise<Record<string, string>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }
  const body = Buffer.concat(chunks).toString("utf8");
  const parsed = parse(body);
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(parsed)) {
    if (Array.isArray(value)) {
      result[key] = String(value[0] ?? "");
    } else {
      result[key] = String(value ?? "");
    }
  }

  return result;
}

export function withQuery(path: string, params: Record<string, string | undefined>) {
  const url = new URL(path, "http://localhost");
  for (const [key, value] of Object.entries(params)) {
    if (value && value.trim() !== "") {
      url.searchParams.set(key, value);
    }
  }
  return `${url.pathname}${url.search}`;
}
