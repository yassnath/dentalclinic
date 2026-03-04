import type { User } from "@/generated/prisma";

export type SessionUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  spesialis: string | null;
  no_hp: string | null;
  telepon: string | null;
  nik: string | null;
  alamat: string | null;
  tanggal_lahir: string | null;
  jenis_kelamin: string | null;
  no_rm: string | null;
  qr_token: string | null;
  qr_path: string | null;
};

export function toSessionUser(user: User): SessionUser {
  return {
    id: user.id.toString(),
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    spesialis: user.spesialis,
    no_hp: user.noHp,
    telepon: user.telepon,
    nik: user.nik,
    alamat: user.alamat,
    tanggal_lahir: user.tanggalLahir ? user.tanggalLahir.toISOString() : null,
    jenis_kelamin: user.jenisKelamin,
    no_rm: user.noRm,
    qr_token: user.qrToken,
    qr_path: user.qrPath,
  };
}
