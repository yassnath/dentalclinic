import type { GetServerSideProps } from "next";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { safeUnreadNotifCount } from "@/lib/notifications";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatCurrency } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type TagihanRow = {
  id: string;
  jumlah: string;
  status: string;
  bukti_pembayaran: string | null;
};

type PageProps = {
  user: SessionUser;
  unreadNotifCount: number;
  pembayarans: TagihanRow[];
  success?: string;
  error?: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const [unreadNotifCount, pembayarans] = await Promise.all([
      safeUnreadNotifCount(auth.user.id),
      prisma.pembayaran.findMany({
        where: { userId: auth.user.id },
        select: {
          id: true,
          jumlah: true,
          status: true,
          buktiPembayaran: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);
    return { unreadNotifCount, pembayarans };
  };

  const cacheKey = makeSsrCacheKey(`pasien-tagihan:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 5000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount: data.unreadNotifCount,
      pembayarans: data.pembayarans.map((item) => ({
        id: item.id.toString(),
        jumlah: item.jumlah.toString(),
        status: item.status,
        bukti_pembayaran: item.buktiPembayaran,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

export default function TagihanPage({ user, unreadNotifCount, pembayarans, success, error }: PageProps) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Tagihan & Pembayaran</h1>
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="responsive-table min-w-full table-auto text-sm theme-table">
            <thead className="bg-blue-600 text-center text-white">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Total Pembayaran</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Bukti</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pembayarans.length ? (
                pembayarans.map((item, index) => (
                  <tr key={item.id} className="border-b text-center hover:bg-gray-50">
                    <td data-label="ID" className="px-4 py-3">
                      {index + 1}
                    </td>
                    <td data-label="Total Pembayaran" className="px-4 py-3">
                      Rp {formatCurrency(item.jumlah)}
                    </td>
                    <td data-label="Status" className="px-4 py-3 capitalize">
                      {item.status}
                    </td>
                    <td data-label="Bukti" className="px-4 py-3">
                      {item.bukti_pembayaran ? (
                        <button
                          type="button"
                          onClick={() => setPreview(`/api/pembayaran/bukti/${item.id}?t=${Date.now()}`)}
                          className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                          Lihat
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">Belum Diupload</span>
                      )}
                    </td>
                    <td data-label="Aksi" className="px-4 py-3">
                      {!item.bukti_pembayaran ? (
                        <form action={`/api/pasien/tagihan/upload/${item.id}`} method="POST" encType="multipart/form-data">
                          <input type="file" name="bukti_pembayaran" accept="image/*" className="mb-2 text-sm" required />
                          <button type="submit" className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
                            Upload Bukti
                          </button>
                        </form>
                      ) : (
                        <span className="text-sm text-gray-500">Sudah Diupload</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    Tidak ada tagihan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700">
          <p>Silakan transfer ke rekening berikut:</p>
          <p className="mt-1 font-semibold">Bank BNI - 1234567890 a.n. Klinik Sehat</p>
        </div>
      </div>

      {preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setPreview(null)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setPreview(null)} className="absolute right-2 top-2 text-xl text-gray-500 hover:text-red-500">
              &times;
            </button>
            <img src={preview} alt="Bukti Pembayaran" className="h-auto w-full" />
          </div>
        </div>
      ) : null}
    </DashboardLayout>
  );
}
