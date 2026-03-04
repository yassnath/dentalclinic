import { useState } from "react";
import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Row = {
  id: string;
  nama: string;
  kode_tagihan: string;
  jumlah: string;
  bukti: string | null;
  status: string;
  updated_at: string | null;
};

type Props = {
  user: SessionUser;
  pembayarans: Row[];
  success?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const pembayarans = await prisma.pembayaran.findMany({
      where: { status: "menunggu konfirmasi" },
      select: {
        id: true,
        kodeTagihan: true,
        jumlah: true,
        buktiPembayaran: true,
        status: true,
        updatedAt: true,
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

  const cacheKey = makeSsrCacheKey("admin-pembayaran-konfirmasi", ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      pembayarans: data.pembayarans.map((item) => ({
        id: item.id.toString(),
        nama: item.user.name,
        kode_tagihan: item.kodeTagihan,
        jumlah: item.jumlah.toString(),
        bukti: item.buktiPembayaran,
        status: item.status,
        updated_at: item.updatedAt ? item.updatedAt.toISOString() : null,
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

export default function AdminPembayaranKonfirmasiPage({ user, pembayarans, success }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [errorImage, setErrorImage] = useState(false);

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">Konfirmasi Pembayaran</h1>
{pembayarans.length === 0 ? (
          <p className="text-gray-600">Tidak ada pembayaran yang menunggu konfirmasi.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="responsive-table min-w-full table-auto text-sm theme-table">
              <thead className="bg-blue-600 text-center text-white">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Pasien</th>
                  <th className="px-4 py-3">Kode Tagihan</th>
                  <th className="px-4 py-3">Jumlah</th>
                  <th className="px-4 py-3">Bukti Pembayaran</th>
                  <th className="px-4 py-3">Tanggal Upload</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {pembayarans.map((pembayaran, index) => (
                  <tr key={pembayaran.id} className="border-b hover:bg-gray-100">
                    <td data-label="#" className="px-4 py-3">
                      {index + 1}
                    </td>
                    <td data-label="Pasien" className="px-4 py-3">
                      {pembayaran.nama}
                    </td>
                    <td data-label="Kode Tagihan" className="px-4 py-3">
                      {pembayaran.kode_tagihan}
                    </td>
                    <td data-label="Jumlah" className="px-4 py-3">
                      Rp {formatCurrency(pembayaran.jumlah)}
                    </td>
                    <td data-label="Bukti Pembayaran" className="px-4 py-3">
                      {pembayaran.bukti ? (
                        <button
                          type="button"
                          className="text-blue-600 underline hover:text-blue-800"
                          onClick={() => {
                            setErrorImage(false);
                            setPreview(`/pembayaran/bukti/${pembayaran.id}?t=${Date.now()}`);
                          }}
                        >
                          Lihat Bukti
                        </button>
                      ) : (
                        <span className="text-gray-500">Belum ada</span>
                      )}
                    </td>
                    <td data-label="Tanggal Upload" className="px-4 py-3">
                      {pembayaran.updated_at ? formatDateTime(new Date(pembayaran.updated_at), "dd MMM yyyy HH:mm") : "-"}
                    </td>
                    <td data-label="Aksi" className="px-4 py-3">
                      <form
                        action={`/admin/pembayaran/konfirmasi/${pembayaran.id}/update`}
                        method="POST"
                        className="flex items-center justify-center gap-2"
                      >
                        <select
                          name="status"
                          defaultValue={pembayaran.status}
                          className="rounded border px-2 py-1"
                          required
                        >
                          <option value="menunggu konfirmasi">Menunggu Konfirmasi</option>
                          <option value="lunas">Lunas</option>
                          <option value="ditolak">Ditolak</option>
                        </select>
                        <button
                          type="submit"
                          className="rounded bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
                        >
                          Update
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-2 text-2xl text-gray-500 hover:text-red-600"
              onClick={() => setPreview(null)}
            >
              &times;
            </button>
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold text-gray-800">Bukti Pembayaran</h2>
            </div>
            <div className="p-4">
              <img
                src={preview}
                alt="Bukti Pembayaran"
                className="h-auto w-full rounded border"
                onError={() => setErrorImage(true)}
              />
              {errorImage ? (
                <div className="mt-3 rounded bg-red-50 p-3 text-sm text-red-700">Gambar gagal dimuat.</div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </DashboardLayout>
  );
}
