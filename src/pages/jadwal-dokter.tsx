import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import RegistrationForm from "@/components/RegistrationForm";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { countForDoctorOnDate } from "@/lib/queue";
import { toHariIndonesia, toDateInputValue } from "@/lib/date";

type JadwalRow = {
  id: string;
  dokter: string;
  spesialis: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
};

type JadwalDokterPageProps = {
  user: SessionUser;
  unreadNotifCount: number;
  jadwals: JadwalRow[];
  selectedTanggal: string;
  selectedSpesialis: string;
  spesialisList: string[];
  dokters: Array<{ id: string; name: string; spesialis: string | null }>;
  successMessage?: string;
  antrian?: string;
  errors: string[];
};

function timeLabel(value: string) {
  if (!value) return "-";
  return value.slice(11, 16);
}

export const getServerSideProps: GetServerSideProps<JadwalDokterPageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const unreadNotifCount = await prisma.notifikasi.count({
    where: { userId: auth.user.id, dibaca: false },
  });

  const selectedTanggal = typeof ctx.query.tanggal_kunjungan === "string" ? ctx.query.tanggal_kunjungan : "";
  const selectedSpesialis = typeof ctx.query.spesialis === "string" ? ctx.query.spesialis : "";

  const allJadwals = await prisma.jadwalDokter.findMany({
    orderBy: [{ hari: "asc" }, { jamMulai: "asc" }],
    include: {
      dokter: true,
    },
  });

  const spesialisListRows = await prisma.user.findMany({
    where: {
      role: "dokter",
      spesialis: {
        not: null,
      },
    },
    select: { spesialis: true },
    distinct: ["spesialis"],
    orderBy: { spesialis: "asc" },
  });

  const spesialisList = spesialisListRows.map((row) => row.spesialis ?? "").filter((value) => value.trim() !== "");

  let dokters: Array<{ id: string; name: string; spesialis: string | null }> = [];
  if (selectedTanggal && selectedSpesialis) {
    const hari = toHariIndonesia(selectedTanggal);

    const candidates = await prisma.user.findMany({
      where: {
        role: "dokter",
        spesialis: selectedSpesialis,
      },
      orderBy: { name: "asc" },
    });

    const jadwalsForTanggal = await prisma.jadwalDokter.findMany({
      where: {
        dokterId: {
          in: candidates.map((doctor) => doctor.id),
        },
        hari,
      },
    });

    const jadwalDoctorIds = new Set(jadwalsForTanggal.map((item) => item.dokterId.toString()));
    const filtered = [];
    for (const doctor of candidates) {
      if (!jadwalDoctorIds.has(doctor.id.toString())) continue;
      const count = await countForDoctorOnDate(doctor.id, selectedTanggal);
      if (count < 5) {
        filtered.push({
          id: doctor.id.toString(),
          name: doctor.name,
          spesialis: doctor.spesialis,
        });
      }
    }
    dokters = filtered;
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      unreadNotifCount,
      jadwals: allJadwals.map((jadwal) => ({
        id: jadwal.id.toString(),
        dokter: jadwal.dokter?.name ?? "Nama Dokter",
        spesialis: jadwal.dokter?.spesialis ?? "-",
        hari: jadwal.hari,
        jamMulai: jadwal.jamMulai.toISOString(),
        jamSelesai: jadwal.jamSelesai.toISOString(),
      })),
      selectedTanggal,
      selectedSpesialis,
      spesialisList,
      dokters,
      successMessage: typeof ctx.query.success === "string" ? ctx.query.success : "",
      antrian: typeof ctx.query.antrian === "string" ? ctx.query.antrian : "",
      errors: typeof ctx.query.error === "string" ? [ctx.query.error] : [],
    },
  };
};

export default function JadwalDokterPage({
  user,
  unreadNotifCount,
  jadwals,
  selectedTanggal,
  selectedSpesialis,
  spesialisList,
  dokters,
  successMessage,
  antrian,
  errors,
}: JadwalDokterPageProps) {
  const prefTgl = user.tanggal_lahir ? toDateInputValue(new Date(user.tanggal_lahir)) : "";

  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <h1 className="mb-6 text-3xl font-bold text-blue-600">Jadwal Dokter</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
        <table className="responsive-table min-w-full divide-y divide-gray-200 text-sm theme-table">
          <thead className="bg-blue-100 text-center text-blue-800">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Dokter</th>
              <th className="px-4 py-2">Spesialis</th>
              <th className="px-4 py-2">Hari</th>
              <th className="px-4 py-2">Jam Praktik</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {jadwals.length ? (
              jadwals.map((jadwal, index) => (
                <tr key={jadwal.id} className="hover:bg-gray-50">
                  <td data-label="No" className="px-4 py-2">
                    {index + 1}
                  </td>
                  <td data-label="Dokter" className="px-4 py-2">
                    {jadwal.dokter}
                  </td>
                  <td data-label="Spesialis" className="px-4 py-2">
                    {jadwal.spesialis}
                  </td>
                  <td data-label="Hari" className="px-4 py-2">
                    {jadwal.hari}
                  </td>
                  <td data-label="Jam Praktik" className="px-4 py-2">
                    {timeLabel(jadwal.jamMulai)} - {timeLabel(jadwal.jamSelesai)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                  Belum ada jadwal dokter yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <RegistrationForm
        actionPath="/pendaftaran"
        selectedTanggal={selectedTanggal}
        selectedSpesialis={selectedSpesialis}
        spesialisList={spesialisList}
        dokters={dokters}
        prefNama={user.name}
        prefTgl={prefTgl}
        prefJk={user.jenis_kelamin ?? ""}
        prefHp={user.no_hp ?? user.telepon ?? ""}
        prefNik={user.nik ?? ""}
        prefAlamat={user.alamat ?? ""}
        errorMessages={errors}
        successMessage={successMessage}
        antrian={antrian}
      />
    </DashboardLayout>
  );
}
