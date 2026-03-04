import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  nama_pasien: string;
  tanggal_kunjungan: string | null;
  jam_kunjungan: string | null;
  dokter: string;
  spesialis: string;
  keluhan: string;
  status: string;
  kode_antrian: string | null;
};

type Props = {
  user: SessionUser;
  pasienAktif: Row[];
  from: string;
  to: string;
  success?: string;
  error?: string;
};

function toDateInputValue(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function statusFlags(statusRaw: string) {
  const value = String(statusRaw || "").toLowerCase();
  const isMenunggu = ["menunggu_konfirmasi", "menunggu konfirmasi", "menunggu", "pending", "baru"].includes(value);
  const isDiterima = ["diterima", "disetujui"].includes(value);
  const isHadir = ["hadir", "checkin", "check-in"].includes(value);
  const isNoShow = ["tidak_hadir", "tidak hadir", "no-show", "noshow"].includes(value);
  return { isMenunggu, isDiterima, isHadir, isNoShow };
}

function timeLabel(value: string | null) {
  if (!value) return "";
  return value.slice(11, 16);
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis", "admin"] });
  if ("redirect" in auth) return auth;

  const fromDate = typeof ctx.query.from === "string" ? new Date(`${ctx.query.from}T00:00:00`) : new Date();
  const toDate =
    typeof ctx.query.to === "string"
      ? new Date(`${ctx.query.to}T23:59:59`)
      : new Date(new Date().setDate(new Date().getDate() + 7));

  if (Number.isNaN(fromDate.getTime())) fromDate.setTime(Date.now());
  if (Number.isNaN(toDate.getTime())) toDate.setTime(Date.now() + 7 * 24 * 3600 * 1000);

  const loadData = async () => {
    const pasienAktif = await prisma.pendaftaran.findMany({
      where: {
        tanggalKunjungan: {
          gte: new Date(toDateInputValue(fromDate)),
          lte: new Date(`${toDateInputValue(toDate)}T23:59:59`),
        },
      },
      select: {
        id: true,
        nama: true,
        tanggalKunjungan: true,
        jamKunjungan: true,
        keluhan: true,
        status: true,
        kodeAntrian: true,
        spesialis: true,
        user: {
          select: {
            name: true,
          },
        },
        dokter: {
          select: {
            name: true,
            spesialis: true,
          },
        },
      },
      orderBy: [{ tanggalKunjungan: "asc" }, { jamKunjungan: "asc" }],
      take: 200,
    });
    return { pasienAktif };
  };

  const cacheKey = makeSsrCacheKey(`resepsionis-pasien-aktif:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 6000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      pasienAktif: data.pasienAktif.map((item) => ({
        id: item.id.toString(),
        nama_pasien: item.user?.name ?? item.nama ?? "-",
        tanggal_kunjungan: item.tanggalKunjungan ? item.tanggalKunjungan.toISOString() : null,
        jam_kunjungan: item.jamKunjungan ? item.jamKunjungan.toISOString() : null,
        dokter: item.dokter?.name ?? "-",
        spesialis: item.dokter?.spesialis ?? item.spesialis ?? "-",
        keluhan: item.keluhan ?? "-",
        status: item.status ?? "menunggu_konfirmasi",
        kode_antrian: item.kodeAntrian ?? null,
      })),
      from: toDateInputValue(fromDate),
      to: toDateInputValue(toDate),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

export default function PasienAktifPage({ user, pasienAktif, from, to, success, error }: Props) {
  void success;
  void error;

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto w-full max-w-screen-xl px-3 py-4 sm:px-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-700">Pasien Aktif</h1>
            <p className="mt-1 text-sm text-gray-600">
              Menampilkan daftar konsultasi pasien (hari ini s/d 7 hari ke depan).
            </p>
          </div>

          <form method="GET" className="flex flex-col gap-2 sm:flex-row">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Dari</label>
              <input type="date" name="from" defaultValue={from} className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sampai</label>
              <input type="date" name="to" defaultValue={to} className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Filter
            </button>
          </form>
        </div>

        <div className="mb-3 text-sm text-gray-600">
          Range: <span className="font-semibold text-gray-800">{from}</span> s/d{" "}
          <span className="font-semibold text-gray-800">{to}</span>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow sm:p-4">
          <div className="overflow-x-auto">
            <table className="responsive-table w-full table-fixed text-sm theme-table">
              <thead className="bg-blue-50 text-blue-800">
                <tr>
                  <th className="px-3 py-2 text-left">No</th>
                  <th className="px-3 py-2 text-left">Nama Pasien</th>
                  <th className="px-3 py-2 text-left">Tanggal Kunjungan</th>
                  <th className="px-3 py-2 text-left">Diterima Oleh</th>
                  <th className="px-3 py-2 text-left">No Antrian</th>
                  <th className="px-3 py-2 text-left">Dokter</th>
                  <th className="px-3 py-2 text-left">Spesialis</th>
                  <th className="px-3 py-2 text-left">Keluhan</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pasienAktif.length ? (
                  pasienAktif.map((row, index) => {
                    const { isMenunggu, isDiterima, isHadir, isNoShow } = statusFlags(row.status);
                    const badgeClass = isMenunggu
                      ? "bg-yellow-100 text-yellow-700"
                      : isDiterima
                        ? "bg-blue-100 text-blue-700"
                        : isHadir
                          ? "bg-green-100 text-green-700"
                          : isNoShow
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700";

                    return (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td data-label="No" className="px-3 py-2">
                          {index + 1}
                        </td>
                        <td data-label="Nama Pasien" className="px-3 py-2 font-semibold text-gray-800 break-words">
                          {row.nama_pasien}
                        </td>
                        <td data-label="Tanggal Kunjungan" className="px-3 py-2">
                          {(row.tanggal_kunjungan ?? "").slice(0, 10)} {timeLabel(row.jam_kunjungan)}
                        </td>
                        <td data-label="Diterima Oleh" className="px-3 py-2 break-words">
                          {row.dokter}
                        </td>
                        <td data-label="No Antrian" className="px-3 py-2">
                          {row.kode_antrian ?? "-"}
                        </td>
                        <td data-label="Dokter" className="px-3 py-2 break-words">
                          {row.dokter}
                        </td>
                        <td data-label="Spesialis" className="px-3 py-2 break-words">
                          {row.spesialis}
                        </td>
                        <td data-label="Keluhan" className="px-3 py-2 text-gray-700 break-words">
                          {row.keluhan}
                        </td>
                        <td data-label="Status" className="px-3 py-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${badgeClass}`}>
                            {row.status}
                          </span>
                        </td>
                        <td data-label="Aksi" className="px-3 py-2">
                          {isMenunggu ? (
                            <div className="flex flex-col gap-2 sm:flex-row">
                              <form method="POST" action={`/resepsionis/pendaftaran/${row.id}/terima`}>
                                <input type="hidden" name="_method" value="PATCH" />
                                <button
                                  type="submit"
                                  className="w-full rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 sm:w-auto"
                                >
                                  Terima
                                </button>
                              </form>
                              <form
                                method="POST"
                                action={`/resepsionis/pendaftaran/${row.id}/tolak`}
                                data-confirm="Yakin ingin menolak pendaftaran ini?"
                                data-confirm-title="Konfirmasi Tolak"
                                data-confirm-confirm-label="Ya, Tolak"
                              >
                                <input type="hidden" name="_method" value="PATCH" />
                                <button
                                  type="submit"
                                  className="w-full rounded-lg bg-gray-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 sm:w-auto"
                                >
                                  Tolak
                                </button>
                              </form>
                            </div>
                          ) : isDiterima ? (
                            <div className="flex flex-col gap-2 sm:flex-row">
                              <form method="POST" action={`/resepsionis/pendaftaran/${row.id}/checkin`}>
                                <input type="hidden" name="_method" value="PATCH" />
                                <button
                                  type="submit"
                                  className="w-full rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 sm:w-auto"
                                >
                                  Check-in
                                </button>
                              </form>
                              <form
                                method="POST"
                                action={`/resepsionis/pendaftaran/${row.id}/no-show`}
                                data-confirm="Yakin ingin menandai pasien sebagai tidak hadir (No-show)?"
                                data-confirm-title="Konfirmasi No-show"
                                data-confirm-confirm-label="Ya, Tandai"
                              >
                                <input type="hidden" name="_method" value="PATCH" />
                                <button
                                  type="submit"
                                  className="w-full rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 sm:w-auto"
                                >
                                  Tidak Hadir
                                </button>
                              </form>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="px-3 py-8 text-center text-gray-500">
                      Tidak ada data pasien aktif pada rentang tanggal ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
