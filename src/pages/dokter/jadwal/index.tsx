import type { GetServerSideProps } from "next";
import { z } from "zod";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type JadwalRow = {
  id: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
};

type PageProps = {
  user: SessionUser;
  jadwals: JadwalRow[];
  success?: string;
  error?: string;
};

const schema = z.object({
  hari: z.string().min(1),
  jam_mulai: z.string().min(1),
  jam_selesai: z.string().min(1),
});

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return {
        redirect: {
          destination: "/dokter/jadwal?error=Input%20jadwal%20tidak%20valid.",
          permanent: false,
        },
      };
    }

    const data = parsed.data;
    await prisma.jadwalDokter.create({
      data: {
        dokterId: auth.user.id,
        hari: data.hari,
        jamMulai: new Date(`1970-01-01T${data.jam_mulai}:00`),
        jamSelesai: new Date(`1970-01-01T${data.jam_selesai}:00`),
      },
    });

    return {
      redirect: {
        destination: "/dokter/jadwal?success=Jadwal%20berhasil%20ditambahkan.",
        permanent: false,
      },
    };
  }

  const jadwals = await prisma.jadwalDokter.findMany({
    where: { dokterId: auth.user.id },
    orderBy: [{ hari: "asc" }, { jamMulai: "asc" }],
  });

  return {
    props: {
      user: toSessionUser(auth.user),
      jadwals: jadwals.map((item) => ({
        id: item.id.toString(),
        hari: item.hari,
        jam_mulai: item.jamMulai.toISOString(),
        jam_selesai: item.jamSelesai.toISOString(),
      })),
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
      error: typeof ctx.query.error === "string" ? ctx.query.error : "",
    },
  };
};

function timeLabel(value: string) {
  return value.slice(11, 16);
}

export default function DokterJadwalPage({ user, jadwals, success, error }: PageProps) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-700">Manajemen Jadwal Dokter</h1>
        <div className="mb-8 rounded bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Tambah Jadwal Baru</h2>
          <form method="POST" action="/dokter/jadwal">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block font-medium">Hari</label>
                <select name="hari" className="w-full rounded border-gray-300 px-3 py-2" required>
                  <option value="">Pilih Hari</option>
                  {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((hari) => (
                    <option key={hari} value={hari}>
                      {hari}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-medium">Jam Mulai</label>
                <input type="time" name="jam_mulai" className="w-full rounded border-gray-300 px-3 py-2" required />
              </div>
              <div>
                <label className="mb-1 block font-medium">Jam Selesai</label>
                <input type="time" name="jam_selesai" className="w-full rounded border-gray-300 px-3 py-2" required />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                Simpan Jadwal
              </button>
            </div>
          </form>
        </div>

        <div className="rounded bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">Jadwal Saya</h2>
          <table className="responsive-table w-full table-auto border text-center theme-table">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="border p-2">Hari</th>
                <th className="border p-2">Jam Mulai</th>
                <th className="border p-2">Jam Selesai</th>
                <th className="border p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jadwals.length ? (
                jadwals.map((jadwal) => (
                  <tr key={jadwal.id}>
                    <td data-label="Hari" className="border p-2">
                      {jadwal.hari}
                    </td>
                    <td data-label="Jam Mulai" className="border p-2">
                      {timeLabel(jadwal.jam_mulai)}
                    </td>
                    <td data-label="Jam Selesai" className="border p-2">
                      {timeLabel(jadwal.jam_selesai)}
                    </td>
                    <td data-label="Aksi" className="border p-2">
                      <form
                        method="POST"
                        action={`/dokter/jadwal/${jadwal.id}`}
                        data-confirm="Yakin ingin menghapus jadwal ini?"
                        data-confirm-title="Konfirmasi Hapus"
                        data-confirm-confirm-label="Ya, Hapus"
                      >
                        <input type="hidden" name="_method" value="DELETE" />
                        <button type="submit" className="text-red-500 hover:underline">
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-gray-500">
                    Belum ada jadwal.
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
