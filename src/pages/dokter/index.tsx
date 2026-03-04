import type { GetServerSideProps } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatDate } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type JadwalItem = {
  id: string;
  periode: "Minggu Ini" | "Minggu Depan";
  tanggal: string | null;
  pasien: string;
  waktu: string;
};

type PageProps = {
  user: SessionUser;
  totalPasien: number;
  totalJadwal: number;
  totalKonsultasi: number;
  jadwals: JadwalItem[];
};

function startOfWeekMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfWeekSunday(date: Date) {
  const d = startOfWeekMonday(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["dokter"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const now = new Date();
    const startThisWeek = startOfWeekMonday(now);
    const endThisWeek = endOfWeekSunday(now);
    const startNextWeek = new Date(startThisWeek);
    startNextWeek.setDate(startThisWeek.getDate() + 7);
    const endNextWeek = new Date(endThisWeek);
    endNextWeek.setDate(endThisWeek.getDate() + 7);

    const doctorWhere = {
      OR: [{ dokterId: auth.user.id }, { diterimaOlehDokterId: auth.user.id }],
    };

    const [jadwalMingguIni, jadwalMingguDepan, totalPasien, totalJadwal, totalKonsultasi] = await Promise.all([
      prisma.pendaftaran.findMany({
        where: {
          ...doctorWhere,
          tanggalKunjungan: {
            gte: startThisWeek,
            lte: endThisWeek,
          },
        },
        select: {
          id: true,
          nama: true,
          tanggalKunjungan: true,
          jamKunjungan: true,
        },
        orderBy: [{ tanggalKunjungan: "asc" }, { jamKunjungan: "asc" }],
      }),
      prisma.pendaftaran.findMany({
        where: {
          ...doctorWhere,
          tanggalKunjungan: {
            gte: startNextWeek,
            lte: endNextWeek,
          },
        },
        select: {
          id: true,
          nama: true,
          tanggalKunjungan: true,
          jamKunjungan: true,
        },
        orderBy: [{ tanggalKunjungan: "asc" }, { jamKunjungan: "asc" }],
      }),
      prisma.pendaftaran.findMany({
        where: {
          ...doctorWhere,
        },
        distinct: ["userId"],
        select: { userId: true },
      }),
      prisma.pendaftaran.count({
        where: {
          ...doctorWhere,
          tanggalKunjungan: {
            gte: new Date(now.setHours(0, 0, 0, 0)),
            lte: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
      prisma.pendaftaran.count({ where: doctorWhere }),
    ]);

    const jadwals: JadwalItem[] = [
      ...jadwalMingguIni.map((item) => ({
        id: item.id.toString(),
        periode: "Minggu Ini" as const,
        tanggal: item.tanggalKunjungan ? item.tanggalKunjungan.toISOString() : null,
        pasien: item.nama ?? "-",
        waktu: item.jamKunjungan ? item.jamKunjungan.toISOString().slice(11, 16) : "-",
      })),
      ...jadwalMingguDepan.map((item) => ({
        id: item.id.toString(),
        periode: "Minggu Depan" as const,
        tanggal: item.tanggalKunjungan ? item.tanggalKunjungan.toISOString() : null,
        pasien: item.nama ?? "-",
        waktu: item.jamKunjungan ? item.jamKunjungan.toISOString().slice(11, 16) : "-",
      })),
    ];

    return {
      totalPasien: totalPasien.length,
      totalJadwal,
      totalKonsultasi,
      jadwals,
    };
  };

  const cacheKey = makeSsrCacheKey(`dokter-dashboard:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      ...data,
    },
  };
};

export default function DokterDashboardPage({ user, totalPasien, totalJadwal, totalKonsultasi, jadwals }: PageProps) {
  const stats = [
    {
      label: "Total Pasien",
      value: totalPasien.toLocaleString("id-ID"),
      hint: "Pasien yang pernah ditangani",
      icon: "fa-users",
      tone: "primary",
    },
    {
      label: "Jadwal Hari Ini",
      value: totalJadwal.toLocaleString("id-ID"),
      hint: "Jadwal konsultasi aktif",
      icon: "fa-calendar-day",
      tone: "success",
    },
    {
      label: "Total Konsultasi",
      value: totalKonsultasi.toLocaleString("id-ID"),
      hint: "Riwayat pendaftaran dokter",
      icon: "fa-stethoscope",
      tone: "info",
    },
  ] as const;

  const quickActions = [
    {
      href: "/dokter/jadwal",
      title: "Manajemen Jadwal",
      description: "Atur jam praktek dan hari layanan dokter.",
      icon: "fa-calendar-check",
    },
    {
      href: "/dokter/pendaftar",
      title: "Semua Pendaftaran",
      description: "Review pendaftaran dan update status pasien.",
      icon: "fa-clipboard-list",
    },
    {
      href: "/dokter/daftar-rekam-medis",
      title: "Rekam Medis",
      description: "Catat diagnosa, tindakan, dan resep pasien.",
      icon: "fa-notes-medical",
    },
  ] as const;

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto w-full max-w-7xl">
        <section className="dashboard-hero mb-6">
          <span className="dashboard-chip dashboard-chip-success">
            <i className="fas fa-user-doctor" />
            Panel Dokter
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-secondary sm:text-4xl">Dashboard Dokter</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-70)" }}>
            Selamat datang, Dokter {user.name}. Spesialis: <span className="font-semibold text-secondary">{user.spesialis ?? "-"}</span>.
            Pantau konsultasi, jadwal, dan pasien dari satu tampilan ringkas.
          </p>
        </section>

        <div className="dashboard-stats-3 mb-6">
          {stats.map((item) => (
            <article key={item.label} className="dashboard-stat-card">
              <span className={`dashboard-stat-icon ${item.tone}`}>
                <i className={`fas ${item.icon}`} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-70)" }}>
                {item.label}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-secondary">{item.value}</p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-55)" }}>
                {item.hint}
              </p>
            </article>
          ))}
        </div>

        <section className="dashboard-section mb-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-secondary">Aksi Dokter</h2>
            <span className="dashboard-chip">
              <i className="fas fa-wave-square" />
              Monitoring Harian
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href} className="dashboard-action-link">
                <div className="flex items-start gap-3">
                  <span className="dashboard-stat-icon dashboard-stat-icon-sm primary">
                    <i className={`fas ${action.icon}`} />
                  </span>
                  <div>
                    <p className="font-semibold text-secondary">{action.title}</p>
                    <p className="text-sm" style={{ color: "var(--text-70)" }}>
                      {action.description}
                    </p>
                  </div>
                </div>
                <i className="fas fa-arrow-right text-blue-600" />
              </Link>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-secondary">Jadwal Konsultasi</h2>
            <span className="dashboard-chip dashboard-chip-warning">
              <i className="fas fa-calendar-week" />
              Minggu Ini & Minggu Depan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="responsive-table min-w-full theme-table">
              <thead>
                <tr className="text-center text-white">
                  <th className="px-4 py-3">Periode</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Pasien</th>
                  <th className="px-4 py-3">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {jadwals.length ? (
                  jadwals.map((row) => (
                    <tr key={`${row.periode}-${row.id}`} className="border-b text-center hover:bg-gray-100">
                      <td data-label="Periode" className="px-4 py-3">
                        <span className={`dashboard-chip ${row.periode === "Minggu Ini" ? "dashboard-chip-success" : ""}`}>
                          {row.periode}
                        </span>
                      </td>
                      <td data-label="Tanggal" className="px-4 py-3">
                        {row.tanggal ? formatDate(new Date(row.tanggal), "dd-MM-yyyy") : "-"}
                      </td>
                      <td data-label="Pasien" className="px-4 py-3">
                        {row.pasien}
                      </td>
                      <td data-label="Waktu" className="px-4 py-3">
                        {row.waktu}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center" style={{ color: "var(--text-70)" }}>
                      Tidak ada jadwal untuk minggu ini dan minggu depan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
