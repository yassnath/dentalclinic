import { SignJWT, jwtVerify } from "jose";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { prisma } from "@/lib/prisma";
import type { User } from "@/generated/prisma";

export type UserRole = "admin" | "dokter" | "pasien" | "resepsionis";

type SessionUserSnapshot = {
  name: string;
  username: string;
  email: string;
  spesialis: string | null;
  noHp: string | null;
  telepon: string | null;
  nik: string | null;
  alamat: string | null;
  tanggalLahir: string | null;
  jenisKelamin: string | null;
  noRm: string | null;
  qrToken: string | null;
  qrPath: string | null;
};

type SessionPayload = {
  userId: string;
  role: UserRole;
  user?: SessionUserSnapshot;
};

const COOKIE_NAME = "healtease_session";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET belum di-set.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionCookie(
  res: NextApiResponse | GetServerSidePropsContext["res"],
  payload: SessionPayload,
) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    }),
  );
}

export function createSessionPayloadFromUser(user: User): SessionPayload {
  return {
    userId: user.id.toString(),
    role: user.role as UserRole,
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      spesialis: user.spesialis ?? null,
      noHp: user.noHp ?? null,
      telepon: user.telepon ?? null,
      nik: user.nik ?? null,
      alamat: user.alamat ?? null,
      tanggalLahir: user.tanggalLahir ? user.tanggalLahir.toISOString() : null,
      jenisKelamin: user.jenisKelamin ?? null,
      noRm: user.noRm ?? null,
      qrToken: user.qrToken ?? null,
      qrPath: user.qrPath ?? null,
    },
  };
}

export function clearSessionCookie(res: NextApiResponse | GetServerSidePropsContext["res"]) {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    }),
  );
}

function pickString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length ? text : null;
}

function pickNullableString(value: unknown): string | null {
  const text = pickString(value);
  return text ?? null;
}

function pickRole(value: unknown): UserRole | null {
  const role = pickString(value);
  if (!role) return null;
  if (role === "admin" || role === "dokter" || role === "pasien" || role === "resepsionis") return role;
  return null;
}

function normalizeSnapshot(value: unknown): SessionUserSnapshot | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const name = pickString(raw.name);
  const username = pickString(raw.username);
  const email = pickString(raw.email);
  if (!name || !username || !email) return null;

  return {
    name,
    username,
    email,
    spesialis: pickNullableString(raw.spesialis),
    noHp: pickNullableString(raw.noHp),
    telepon: pickNullableString(raw.telepon),
    nik: pickNullableString(raw.nik),
    alamat: pickNullableString(raw.alamat),
    tanggalLahir: pickNullableString(raw.tanggalLahir),
    jenisKelamin: pickNullableString(raw.jenisKelamin),
    noRm: pickNullableString(raw.noRm),
    qrToken: pickNullableString(raw.qrToken),
    qrPath: pickNullableString(raw.qrPath),
  };
}

export async function getSessionFromToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const userId = pickString(payload.userId);
    const role = pickRole(payload.role);
    if (!userId || !role) return null;
    return { userId, role, user: normalizeSnapshot(payload.user) ?? undefined };
  } catch {
    return null;
  }
}

function userFromSessionPayload(session: SessionPayload): User | null {
  const userId = pickString(session.userId);
  if (!userId || !session.user) return null;

  try {
    const id = BigInt(userId);
    const snapshot = session.user;
    const tanggalLahir = snapshot.tanggalLahir ? new Date(snapshot.tanggalLahir) : null;

    return {
      id,
      name: snapshot.name,
      username: snapshot.username,
      email: snapshot.email,
      emailVerifiedAt: null,
      password: "",
      role: session.role,
      spesialis: snapshot.spesialis,
      alamat: snapshot.alamat,
      telepon: snapshot.telepon,
      noHp: snapshot.noHp,
      tanggalLahir: tanggalLahir && !Number.isNaN(tanggalLahir.getTime()) ? tanggalLahir : null,
      jenisKelamin: snapshot.jenisKelamin,
      nik: snapshot.nik,
      noRm: snapshot.noRm,
      qrToken: snapshot.qrToken,
      qrPath: snapshot.qrPath,
      roleId: null,
      rememberToken: null,
      createdAt: null,
      updatedAt: null,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(ctx: GetServerSidePropsContext) {
  const token = ctx.req.cookies[COOKIE_NAME];
  const session = await getSessionFromToken(token);
  if (!session) return null;

  const userFromSession = userFromSessionPayload(session);
  if (userFromSession) return userFromSession;

  try {
    const id = BigInt(session.userId);
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      await createSessionCookie(ctx.res, createSessionPayloadFromUser(user));
    }
    return user;
  } catch {
    return null;
  }
}

export async function getApiUser(req: NextApiRequest) {
  const token = req.cookies[COOKIE_NAME];
  const session = await getSessionFromToken(token);
  if (!session) return null;

  const userFromSession = userFromSessionPayload(session);
  if (userFromSession) return userFromSession;

  try {
    return prisma.user.findUnique({
      where: { id: BigInt(session.userId) },
    });
  } catch {
    return null;
  }
}

export async function requireAuth(
  ctx: GetServerSidePropsContext,
  options?: { roles?: UserRole[]; redirectTo?: string },
): Promise<{ redirect: { destination: string; permanent: false } } | { user: User }> {
  const user = await getCurrentUser(ctx);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (options?.roles && !options.roles.includes(user.role as UserRole)) {
    return {
      redirect: {
        destination: options.redirectTo ?? "/",
        permanent: false,
      },
    };
  }

  return { user };
}

export function getRoleHome(role: string) {
  if (role === "admin") return "/admin";
  if (role === "dokter") return "/dokter";
  if (role === "resepsionis") return "/resepsionis";
  return "/pasien";
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
