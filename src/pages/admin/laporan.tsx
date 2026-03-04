import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Periode = "minggu" | "bulan" | "tahun" | "semua";

type Row = {
  id: string;
  nama: string;
  kode_tagihan: string;
  nominal: string;
  status: string;
  created_at: string | null;
};

type Props = {
  user: SessionUser;
  laporan: Row[];
  periode: Periode;
  from: string | null;
  to: string;
  totalKeseluruhan: string;
};

const ALLOWED_PERIODE: Periode[] = ["minggu", "bulan", "tahun", "semua"];
const PAID_STATUSES = ["lunas", "dibayar", "dikonfirmasi", "paid", "confirmed", "success", "selesai"];

function resolvePeriode(value: string | undefined): Periode {
  if (value && ALLOWED_PERIODE.includes(value as Periode)) {
    return value as Periode;
  }
  return "bulan";
}

function getRange(periode: Periode) {
  const to = new Date();
  let from: Date | null = null;
  if (periode === "minggu") {
    from = new Date(to);
    from.setDate(from.getDate() - 7);
  } else if (periode === "bulan") {
    from = new Date(to);
    from.setMonth(from.getMonth() - 1);
  } else if (periode === "tahun") {
    from = new Date(to);
    from.setFullYear(from.getFullYear() - 1);
  }
  return { from, to };
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const periode = resolvePeriode(typeof ctx.query.periode === "string" ? ctx.query.periode : undefined);
  const { from, to } = getRange(periode);

  const statusFilter = PAID_STATUSES.map((status) => ({
    status: { equals: status, mode: "insensitive" as const },
  }));

  const where = from
    ? {
        OR: statusFilter,
        createdAt: {
          gte: from,
          lte: to,
        },
      }
    : {
        OR: statusFilter,
      };

  const loadData = async () => {
    const laporan = await prisma.pembayaran.findMany({
      where,
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

    const totalKeseluruhan = laporan.reduce((acc, row) => acc + Number(row.jumlah), 0);
    return { laporan, totalKeseluruhan };
  };

  const cacheKey = makeSsrCacheKey("admin-laporan", ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      laporan: data.laporan.map((row) => ({
        id: row.id.toString(),
        nama: row.user?.name ?? "Tidak diketahui",
        kode_tagihan: row.kodeTagihan ?? "-",
        nominal: row.jumlah.toString(),
        status: row.status ?? "-",
        created_at: row.createdAt ? row.createdAt.toISOString() : null,
      })),
      periode,
      from: from ? from.toISOString() : null,
      to: to.toISOString(),
      totalKeseluruhan: data.totalKeseluruhan.toString(),
    },
  };
};

export default function AdminLaporanPage({ user, laporan, periode, from, to, totalKeseluruhan }: Props) {
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    const key = "laporan_auto_refresh";
    const saved = window.localStorage.getItem(key) === "1";
    setAutoRefresh(saved);
  }, []);

  useEffect(() => {
    const key = "laporan_auto_refresh";
    window.localStorage.setItem(key, autoRefresh ? "1" : "0");
  }, [autoRefresh]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (autoRefresh) window.location.reload();
    }, 20000);
    return () => window.clearInterval(timer);
  }, [autoRefresh]);

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-blue-700">Laporan Pemasukan</h1>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
            >
              <i className="fas fa-print mr-2" /> Print
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <form method="GET" action="/admin/laporan" className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="periode" className="text-sm font-semibold text-gray-700">
                Filter Periode:
              </label>
              <select
                name="periode"
                id="periode"
                defaultValue={periode}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-blue-200"
              >
                <option value="minggu">Seminggu</option>
                <option value="bulan">Sebulan</option>
                <option value="tahun">Setahun</option>
                <option value="semua">Semua</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700"
              >
                Terapkan
              </button>
              <label className="inline-flex select-none items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  className="rounded border-gray-300"
                  checked={autoRefresh}
                  onChange={(event) => setAutoRefresh(event.currentTarget.checked)}
                />
                Auto refresh
              </label>
            </div>

            <div className="text-sm text-gray-600 md:ml-auto">
              {from ? (
                <>
                  Rentang: <span className="font-semibold">{new Date(from).toLocaleDateString("id-ID")}</span> -{" "}
                  <span className="font-semibold">{new Date(to).toLocaleDateString("id-ID")}</span>
                </>
              ) : (
                <>
                  Rentang: <span className="font-semibold">Semua waktu</span>
                </>
              )}
            </div>
          </form>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="responsive-table min-w-full table-auto text-sm theme-table">
            <thead className="bg-blue-600 text-center text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nama Pasien</th>
                <th className="px-4 py-3">Kode Tagihan</th>
                <th className="px-4 py-3">Nominal</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              {laporan.length ? (
                laporan.map((row, index) => (
                  <tr key={row.id} className="border-b text-center hover:bg-gray-100">
                    <td data-label="#" className="px-4 py-3">
                      {index + 1}
                    </td>
                    <td data-label="Nama Pasien" className="px-4 py-3">
                      {row.nama}
                    </td>
                    <td data-label="Kode Tagihan" className="px-4 py-3">
                      {row.kode_tagihan}
                    </td>
                    <td data-label="Nominal" className="px-4 py-3">
                      Rp {formatCurrency(row.nominal)}
                    </td>
                    <td data-label="Status" className="px-4 py-3">
                      {row.status}
                    </td>
                    <td data-label="Tanggal Bayar" className="px-4 py-3">
                      {row.created_at ? formatDateTime(new Date(row.created_at), "dd MMM yyyy HH:mm") : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    Belum ada pemasukan pada periode ini.
                  </td>
                </tr>
              )}
            </tbody>
            {laporan.length ? (
              <tfoot>
                <tr className="bg-blue-50">
                  <td colSpan={5} className="px-4 py-3 text-right font-semibold text-blue-800">
                    Total Keseluruhan:
                  </td>
                  <td data-label="Total Keseluruhan" className="px-4 py-3 font-bold text-blue-800">
                    Rp {formatCurrency(totalKeseluruhan)}
                  </td>
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>

        {laporan.length ? (
          <div className="mt-3 rounded-lg border border-soft bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800 sm:hidden">
            Total Keseluruhan: Rp {formatCurrency(totalKeseluruhan)}
          </div>
        ) : null}
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: var(--light-bg-surface) !important;
          }

          header,
          nav,
          aside,
          footer,
          button,
          #autoRefresh,
          label[for="periode"],
          select#periode,
          .sm\\:hidden {
            display: none !important;
          }

          .max-w-6xl {
            max-width: 100% !important;
          }

          .p-6 {
            padding: 0 !important;
          }

          h1 {
            margin: 0 0 6px 0 !important;
            font-size: 18px !important;
            color: var(--light-text-primary) !important;
          }

          table {
            width: 100% !important;
            border-collapse: collapse !important;
            font-size: 12px !important;
          }

          th,
          td {
            border: 1px solid var(--light-border) !important;
            padding: 8px 10px !important;
            text-align: center !important;
          }

          .overflow-x-auto {
            overflow: visible !important;
          }

          @page {
            margin: 14mm;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
