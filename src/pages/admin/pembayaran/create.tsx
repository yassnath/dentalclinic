import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type PasienOption = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  user: SessionUser;
  pasiens: PasienOption[];
  previewKode: string;
  error?: string;
};

function jakartaYmd(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const map = new Map(parts.map((part) => [part.type, part.value]));
  return `${map.get("year")}${map.get("month")}${map.get("day")}`;
}

async function getEligibleUserIds() {
  const rows = await prisma.$queryRaw<Array<{ user_id: bigint }>>`
    SELECT DISTINCT p.user_id
    FROM rekam_medis rm
    INNER JOIN pendaftarans p ON rm.pendaftaran_id = p.id
    WHERE rm.diagnosa IS NOT NULL
      AND rm.diagnosa <> ''
      AND rm.tindakan IS NOT NULL
      AND rm.tindakan <> ''
  `;
  return rows.map((row) => row.user_id);
}

async function buildPreviewKode() {
  const datePart = jakartaYmd();
  const prefix = `INV-${datePart}-`;
  const last = await prisma.pembayaran.findFirst({
    where: { kodeTagihan: { startsWith: prefix } },
    orderBy: { kodeTagihan: "desc" },
    select: { kodeTagihan: true },
  });
  const next = last?.kodeTagihan ? Number(last.kodeTagihan.slice(-4)) + 1 : 1;
  return `${prefix}${String(next).padStart(4, "0")}`;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const eligibleIds = await getEligibleUserIds();
  const pasiens = eligibleIds.length
    ? await prisma.user.findMany({
        where: {
          role: "pasien",
          id: { in: eligibleIds },
        },
        orderBy: { name: "asc" },
      })
    : [];

  return {
    props: {
      user: toSessionUser(auth.user),
      pasiens: pasiens.map((pasien) => ({
        id: pasien.id.toString(),
        name: pasien.name,
        email: pasien.email,
      })),
      previewKode: await buildPreviewKode(),
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

export default function AdminPembayaranCreatePage({ user, pasiens, previewKode, error }: Props) {
  const disabled = pasiens.length === 0;

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Buat Tagihan</h1>

        <div className="rounded-lg bg-white p-6 shadow">
<form action="/admin/pembayaran" method="POST">
            <div className="mb-4">
              <label className="mb-1 block font-semibold text-gray-700">Pasien</label>
              <select
                name="user_id"
                required
                disabled={disabled}
                className="w-full rounded border border-gray-300 px-4 py-2"
              >
                <option value="">
                  {disabled ? "-- Belum ada pasien yang sudah diperiksa dokter --" : "-- Pilih Pasien --"}
                </option>
                {pasiens.map((pasien) => (
                  <option key={pasien.id} value={pasien.id}>
                    {pasien.name} ({pasien.email})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Pasien hanya bisa dipilih jika sudah diperiksa dokter dan rekam medis terisi.
              </p>
            </div>

            <div className="mb-4">
              <label className="mb-1 block font-semibold text-gray-700">Kode Tagihan</label>
              <input
                type="text"
                value={previewKode}
                disabled
                className="w-full cursor-not-allowed rounded border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700"
              />
              <p className="mt-1 text-xs text-gray-500">Kode tagihan dibuat otomatis dan tidak bisa diubah.</p>
            </div>

            <div className="mb-4">
              <label className="mb-1 block font-semibold text-gray-700">Jumlah (Rp)</label>
              <input
                type="number"
                name="jumlah"
                min="0"
                required
                disabled={disabled}
                className="w-full rounded border border-gray-300 px-4 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={disabled}
              className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Simpan Tagihan
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
