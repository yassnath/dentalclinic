import type { GetServerSideProps } from "next";
import { z } from "zod";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFormBody } from "@/lib/http";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { toDateInputValue } from "@/lib/date";

type Props = {
  user: SessionUser;
  pendaftaran: {
    id: string;
    nama: string;
    tanggal_lahir: string | null;
    jenis_kelamin: string;
  };
  errors: string[];
  success?: string;
};

const schema = z.object({
  diagnosa: z.string().min(1),
  tindakan: z.string().min(1),
  resep: z.string().optional(),
  catatan: z.string().optional(),
});

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const errors: string[] = [];

  const pendaftaran = await prisma.pendaftaran.findUnique({
    where: { id },
  });

  if (!pendaftaran) {
    return {
      redirect: {
        destination: "/dokter/pasien",
        permanent: false,
      },
    };
  }

  if ((pendaftaran.status ?? "") !== "diterima") {
    return {
      redirect: {
        destination: "/dokter/pasien",
        permanent: false,
      },
    };
  }

  if (
    pendaftaran.dokterId &&
    pendaftaran.dokterId !== auth.user.id &&
    (pendaftaran.diterimaOlehDokterId ?? BigInt(0)) !== auth.user.id
  ) {
    return {
      redirect: {
        destination: "/dokter/pasien",
        permanent: false,
      },
    };
  }

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      errors.push("Input rekam medis tidak valid.");
    } else {
      await prisma.rekamMedis.create({
        data: {
          pendaftaranId: pendaftaran.id,
          pasienId: pendaftaran.userId,
          dokterId: auth.user.id,
          diagnosa: parsed.data.diagnosa,
          tindakan: parsed.data.tindakan,
          resep: parsed.data.resep || null,
          catatan: parsed.data.catatan || null,
          tanggal: new Date(),
        },
      });

      return {
        redirect: {
          destination: "/dokter/daftar-rekam-medis?success=Rekam%20medis%20berhasil%20disimpan.",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      pendaftaran: {
        id: pendaftaran.id.toString(),
        nama: pendaftaran.nama,
        tanggal_lahir: pendaftaran.tanggalLahir ? pendaftaran.tanggalLahir.toISOString() : null,
        jenis_kelamin: pendaftaran.jenisKelamin ?? "-",
      },
      errors,
      success: typeof ctx.query.success === "string" ? ctx.query.success : "",
    },
  };
};

export default function RekamMedisInputPage({ user, pendaftaran, errors }: Props) {
  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-700">Input Rekam Medis</h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Data Pasien</h2>
            <p>
              <strong>Nama:</strong> {pendaftaran.nama}
            </p>
            <p>
              <strong>Tanggal Lahir:</strong> {pendaftaran.tanggal_lahir ? toDateInputValue(new Date(pendaftaran.tanggal_lahir)) : "-"}
            </p>
            <p>
              <strong>Jenis Kelamin:</strong> {pendaftaran.jenis_kelamin}
            </p>
          </div>

          {errors.length ? (
            <div className="mb-4 rounded border border-red-200 bg-red-50 p-4 text-red-700">
              <ul className="list-inside list-disc text-sm">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form action={`/dokter/rekam_medis/${pendaftaran.id}`} method="POST">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium" htmlFor="diagnosa">
                  Diagnosa
                </label>
                <input id="diagnosa" name="diagnosa" type="text" className="w-full rounded border-gray-300 px-3 py-2" placeholder="Contoh: Demam tinggi" />
              </div>
              <div>
                <label className="mb-1 block font-medium" htmlFor="tindakan">
                  Tindakan
                </label>
                <input id="tindakan" name="tindakan" type="text" className="w-full rounded border-gray-300 px-3 py-2" placeholder="Contoh: Diberi obat penurun demam" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block font-medium" htmlFor="resep">
                  Resep
                </label>
                <textarea id="resep" name="resep" rows={2} className="w-full rounded border-gray-300 px-3 py-2" placeholder="Resep obat..." />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block font-medium" htmlFor="catatan">
                  Catatan Dokter
                </label>
                <textarea id="catatan" name="catatan" rows={3} className="w-full rounded border-gray-300 px-3 py-2" placeholder="Catatan tambahan..." />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                Simpan Rekam Medis
              </button>
              <a href="/dokter/daftar-rekam-medis" className="ml-4 text-gray-600 hover:underline">
                Kembali
              </a>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
