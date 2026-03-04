import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatCurrency, formatDate } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  nama: string;
  kode_tagihan: string;
  jumlah: string;
  status: string;
  tanggal: string | null;
};

type Props = {
  user: SessionUser;
  pembayarans: Row[];
  success?: string;
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

async function createKodeTagihan() {
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

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const userIdRaw = String(body.user_id ?? "").trim();
    const jumlahRaw = String(body.jumlah ?? "").trim();
    const jumlah = Number(jumlahRaw);

    if (!userIdRaw || !Number.isFinite(jumlah) || jumlah < 0) {
      return {
        redirect: {
          destination: "/admin/pembayaran/create?error=Input%20tagihan%20tidak%20valid.",
          permanent: false,
        },
      };
    }

    const userId = BigInt(userIdRaw);
    const eligibleIds = await getEligibleUserIds();
    if (!eligibleIds.some((id) => id === userId)) {
      return {
        redirect: {
          destination:
            "/admin/pembayaran/create?error=Pasien%20belum%20memiliki%20rekam%20medis%20lengkap%20(diagnosa%20dan%20tindakan).",
          permanent: false,
        },
      };
    }

    const pasien = await prisma.user.findFirst({
      where: { id: userId, role: "pasien" },
      select: { id: true },
    });
    if (!pasien) {
      return {
        redirect: {
          destination: "/admin/pembayaran/create?error=Pasien%20tidak%20valid.",
          permanent: false,
        },
      };
    }

    const kodeTagihan = await createKodeTagihan();
    const pembayaran = await prisma.pembayaran.create({
      data: {
        userId,
        kodeTagihan,
        jumlah: jumlahRaw,
        status: "belum dibayar",
        buktiPembayaran: null,
      },
    });

    await prisma.notifikasi.create({
      data: {
        userId: pembayaran.userId,
        judul: "Tagihan Baru",
        pesan: `Tagihan baru telah dibuat dengan kode ${pembayaran.kodeTagihan} sebesar Rp ${new Intl.NumberFormat(
          "id-ID",
        ).format(Number(jumlah))}. Silakan cek menu Tagihan.`,
        tipe: "pembayaran",
        link: "/pasien/tagihan",
        dibaca: false,
      },
    });

    return {
      redirect: {
        destination: "/admin/pembayaran?success=Tagihan%20berhasil%20dibuat.",
        permanent: false,
      },
    };
  }

  const loadData = async () => {
    const pembayarans = await prisma.pembayaran.findMany({
      select: {
        id: true,
        kodeTagihan: true,
        jumlah: true,
        status: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { pembayarans };
  };

  const cacheKey = makeSsrCacheKey("admin-pembayaran-index", ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      pembayarans: data.pembayarans.map((item) => ({
        id: item.id.toString(),
        nama: item.user.name,
        kode_tagihan: item.kodeTagihan,
        jumlah: item.jumlah.toString(),
        status: item.status,
        tanggal: item.createdAt ? item.createdAt.toISOString() : null,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

export default function AdminPembayaranIndexPage({ user, pembayarans, success }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Data Tagihan Pembayaran</h1>
<div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="responsive-table min-w-full table-auto text-sm theme-table">
            <thead className="bg-blue-600 text-left text-white">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Pasien</th>
                <th className="px-4 py-3">Kode Tagihan</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {pembayarans.length ? (
                pembayarans.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td data-label="No" className="px-4 py-3">
                      {index + 1}
                    </td>
                    <td data-label="Pasien" className="px-4 py-3">
                      {item.nama}
                    </td>
                    <td data-label="Kode Tagihan" className="px-4 py-3">
                      {item.kode_tagihan}
                    </td>
                    <td data-label="Jumlah" className="px-4 py-3">
                      Rp{formatCurrency(item.jumlah)}
                    </td>
                    <td data-label="Status" className="px-4 py-3">
                      {item.status === "lunas" ? (
                        <span className="font-semibold text-green-600">Lunas</span>
                      ) : (
                        <span className="font-semibold text-red-600">Belum Dibayar</span>
                      )}
                    </td>
                    <td data-label="Tanggal" className="px-4 py-3">
                      {item.tanggal ? formatDate(new Date(item.tanggal), "dd MMM yyyy") : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    Belum ada data tagihan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
