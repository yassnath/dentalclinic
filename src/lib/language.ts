import type { GetServerSidePropsContext, NextApiResponse } from "next";
import { parse, serialize } from "cookie";

export type AppLanguage = "id" | "en";

export const LANGUAGE_COOKIE = "healtease_lang";

export function normalizeLanguage(input: unknown): AppLanguage {
  return input === "en" ? "en" : "id";
}

export function getLanguageFromCookieHeader(cookieHeader: string | undefined): AppLanguage {
  if (!cookieHeader) return "id";
  const cookies = parse(cookieHeader);
  return normalizeLanguage(cookies[LANGUAGE_COOKIE]);
}

export function getLanguageFromRequest(ctx: GetServerSidePropsContext): AppLanguage {
  return normalizeLanguage(ctx.req.cookies?.[LANGUAGE_COOKIE]);
}

export function createLanguageCookie(language: AppLanguage) {
  return serialize(LANGUAGE_COOKIE, normalizeLanguage(language), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

type ResponseLike = NextApiResponse | GetServerSidePropsContext["res"];

export function appendSetCookie(res: ResponseLike, cookieValue: string) {
  const current = res.getHeader("Set-Cookie");
  if (!current) {
    res.setHeader("Set-Cookie", cookieValue);
    return;
  }
  if (Array.isArray(current)) {
    res.setHeader("Set-Cookie", [...current, cookieValue]);
    return;
  }
  res.setHeader("Set-Cookie", [String(current), cookieValue]);
}
