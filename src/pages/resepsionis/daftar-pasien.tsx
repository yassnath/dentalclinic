import fs from "fs/promises";
import path from "path";
import QRCode from "qrcode";
import bcrypt from "bcryptjs";
import { z } from "zod";
import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import PasswordInput from "@/components/PasswordInput";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

const schema = z.object({
  name: z.string().min(1).max(255),
  username: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  alamat: z.string().min(1).max(255),
  no_hp: z.string().min(1).max(20),
  nik: z.string().regex(/^[0-9]{16}$/),
  tanggal_lahir: z.string().min(1),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
  keluhan: z.string().min(1),
});

type FormValues = {
  name: string;
  username: string;
  email: string;
  alamat: string;
  no_hp: string;
  nik: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  keluhan: string;
  password: string;
};

type Props = {
  user: SessionUser;
  errors: string[];
  values: FormValues;
};

function emptyValues(): FormValues {
  return {
    name: "",
    username: "",
    email: "",
    alamat: "",
    no_hp: "",
    nik: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    keluhan: "",
    password: "",
  };
}

function baseUrlFromReq(headers: Record<string, string | string[] | undefined>) {
  const host = typeof headers.host === "string" ? headers.host : "localhost:3000";
  const protoHeader = headers["x-forwarded-proto"];
  const proto = typeof protoHeader === "string" ? protoHeader : "http";
  return `${proto}://${host}`;
}

function ymd(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis"] });
  if ("redirect" in auth) return auth;

  let values = emptyValues();
  const errors: string[] = [];

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    values = {
      name: String(body.name ?? ""),
      username: String(body.username ?? ""),
      email: String(body.email ?? ""),
      alamat: String(body.alamat ?? ""),
      no_hp: String(body.no_hp ?? ""),
      nik: String(body.nik ?? ""),
      tanggal_lahir: String(body.tanggal_lahir ?? ""),
      jenis_kelamin: String(body.jenis_kelamin ?? ""),
      keluhan: String(body.keluhan ?? ""),
      password: String(body.password ?? ""),
    };

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      errors.push("Data pasien tidak valid.");
    } else {
      const data = parsed.data;

      const duplicate = await prisma.user.findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email.toLowerCase() }, { nik: data.nik }],
        },
        select: { id: true },
      });
      if (duplicate) {
        errors.push("Username, email, atau NIK sudah terdaftar.");
      } else {
        try {
          const createdUser = await prisma.user.create({
            data: {
              name: data.name,
              username: data.username,
              email: data.email.toLowerCase(),
              password: await bcrypt.hash(data.password, 10),
              role: "pasien",
              alamat: data.alamat,
              noHp: data.no_hp,
              nik: data.nik,
              tanggalLahir: new Date(data.tanggal_lahir),
              jenisKelamin: data.jenis_kelamin,
            },
          });

          const noRm = `RM-${ymd().slice(0, 6)}-${createdUser.id.toString().padStart(5, "0")}`;
          const qrToken = crypto.randomUUID();
          const qrPath = `patient_qr/${qrToken}.png`;

          const publicDir = path.join(process.cwd(), "public", "patient_qr");
          await fs.mkdir(publicDir, { recursive: true });
          const scanBase = process.env.APP_URL ?? baseUrlFromReq(ctx.req.headers);
          const scanUrl = `${scanBase}/scan/pasien/${qrToken}`;
          const png = await QRCode.toBuffer(scanUrl, { type: "png", width: 250, margin: 1 });
          await fs.writeFile(path.join(publicDir, `${qrToken}.png`), png);

          await prisma.user.update({
            where: { id: createdUser.id },
            data: {
              noRm,
              qrToken,
              qrPath,
            },
          });

          const today = new Date();
          const start = new Date(today);
          start.setHours(0, 0, 0, 0);
          const end = new Date(today);
          end.setHours(23, 59, 59, 999);

          const last = await prisma.pendaftaran.aggregate({
            where: {
              createdAt: {
                gte: start,
                lte: end,
              },
            },
            _max: {
              nomorUrut: true,
            },
          });
          const nomorUrut = Number(last._max.nomorUrut ?? 0) + 1;
          const kodeAntrian = `A${String(nomorUrut).padStart(3, "0")}`;

          const pendaftaran = await prisma.pendaftaran.create({
            data: {
              userId: createdUser.id,
              nama: createdUser.name,
              tanggalLahir: new Date(data.tanggal_lahir),
              jenisKelamin: data.jenis_kelamin,
              noHp: data.no_hp,
              nik: data.nik,
              keluhan: data.keluhan,
              status: "menunggu",
              nomorUrut,
              kodeAntrian,
            },
          });

          return {
            redirect: {
              destination: `/resepsionis/pendaftaran/${pendaftaran.id.toString()}/cetak`,
              permanent: false,
            },
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : "Gagal menyimpan data pasien.";
          errors.push(message);
        }
      }
    }
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      errors,
      values,
    },
  };
};

export default function ResepsionisDaftarPasienPage({ user, errors, values }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="min-h-screen px-3 py-3">
        <div className="mx-auto w-full max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3">
              <h1 className="text-lg font-bold text-white">Daftar Pasien Baru</h1>
              <p className="text-xs text-blue-50">Input data pasien dan cetak kartu pasien.</p>
            </div>

            <div className="p-4">
              {errors.length ? (
                <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  <div className="mb-1 font-semibold">Terjadi kesalahan:</div>
                  <ul className="list-inside list-disc">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <form action="/resepsionis/daftar-pasien" method="POST" target="_blank" className="space-y-2">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={values.name}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Contoh: Ahmad Rizki"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={values.username}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="contoh: ahmadrizki"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={values.email}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Password</label>
                    <PasswordInput
                      name="password"
                      defaultValue={values.password}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Minimal 6 karakter"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Alamat</label>
                    <input
                      type="text"
                      name="alamat"
                      defaultValue={values.alamat}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Contoh: Jl. Merdeka No. 10"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">No HP</label>
                    <input
                      type="text"
                      name="no_hp"
                      defaultValue={values.no_hp}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">NIK</label>
                    <input
                      type="text"
                      name="nik"
                      defaultValue={values.nik}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="16 digit"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Tanggal Lahir</label>
                    <input
                      type="date"
                      name="tanggal_lahir"
                      defaultValue={values.tanggal_lahir}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Jenis Kelamin</label>
                    <select
                      name="jenis_kelamin"
                      defaultValue={values.jenis_kelamin || ""}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      required
                    >
                      <option value="" disabled>
                        -- Pilih --
                      </option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-0.5 block text-[11px] font-semibold text-gray-700">Keluhan</label>
                    <textarea
                      name="keluhan"
                      rows={2}
                      defaultValue={values.keluhan}
                      className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Tuliskan keluhan pasien..."
                      required
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow transition hover:bg-blue-700"
                  >
                    Simpan & Cetak Kartu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
