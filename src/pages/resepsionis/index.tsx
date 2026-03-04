import type { GetServerSideProps } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Props = {
  user: SessionUser;
  totalPasien: number;
  pendaftaranBaru: number;
  dokterAktif: number;
  jadwalHariIni: number;
};

function todayYmd() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const today = todayYmd();
    const start = new Date(`${today}T00:00:00`);
    const end = new Date(`${today}T23:59:59`);

    const [totalPasien, pendaftaranBaru, dokterAktif] = await Promise.all([
      prisma.user.count({ where: { role: "pasien" } }),
      prisma.pendaftaran.count({
        where: {
          createdAt: { gte: start, lte: end },
          status: "menunggu",
        },
      }),
      prisma.user.count({ where: { role: "dokter" } }),
    ]);

    let jadwalHariIni = 0;
    try {
      const rows = await prisma.$queryRaw<Array<{ total: bigint | number }>>`
        SELECT COUNT(*) AS total
        FROM jadwal_dokters
        WHERE DATE(tanggal) = ${today}
      `;
      const total = rows[0]?.total;
      jadwalHariIni = typeof total === "bigint" ? Number(total) : Number(total ?? 0);
    } catch {
      jadwalHariIni = 0;
    }

    return {
      totalPasien,
      pendaftaranBaru,
      dokterAktif,
      jadwalHariIni,
    };
  };

  const cacheKey = makeSsrCacheKey(`resepsionis-dashboard:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      ...data,
    },
  };
};

export default function ResepsionisDashboardPage({
  user,
  totalPasien,
  pendaftaranBaru,
  dokterAktif,
  jadwalHariIni,
}: Props) {
  const stats = [
    {
      label: "Total Pasien",
      value: totalPasien.toLocaleString("id-ID"),
      hint: "Total pasien terdaftar",
      icon: "fa-user-injured",
      tone: "primary",
    },
    {
      label: "Pendaftaran Baru",
      value: pendaftaranBaru.toLocaleString("id-ID"),
      hint: "Menunggu verifikasi hari ini",
      icon: "fa-user-check",
      tone: "success",
    },
    {
      label: "Dokter Aktif",
      value: dokterAktif.toLocaleString("id-ID"),
      hint: "Dokter siap menerima pasien",
      icon: "fa-user-doctor",
      tone: "info",
    },
    {
      label: "Jadwal Hari Ini",
      value: jadwalHariIni.toLocaleString("id-ID"),
      hint: "Sesi layanan terjadwal",
      icon: "fa-clock",
      tone: "warning",
    },
  ] as const;

  const actions = [
    {
      href: "/resepsionis/daftar-pasien",
      title: "Daftar Pasien Offline",
      description: "Input pasien walk-in secara cepat dari loket.",
      icon: "fa-user-plus",
    },
    {
      href: "/resepsionis/pendaftaran",
      title: "Validasi Pendaftaran",
      description: "Tinjau, terima, atau tolak pendaftaran pasien.",
      icon: "fa-clipboard-check",
    },
    {
      href: "/resepsionis/qr-scan",
      title: "Scan QR Pasien",
      description: "Check-in pasien otomatis via QR card.",
      icon: "fa-qrcode",
    },
    {
      href: "/resepsionis/pasien-aktif",
      title: "Pantau Pasien Aktif",
      description: "Monitoring pasien hadir, antre, dan no-show.",
      icon: "fa-users",
    },
  ] as const;

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto w-full max-w-7xl">
        <section className="dashboard-hero mb-6">
          <span className="dashboard-chip dashboard-chip-warning">
            <i className="fas fa-headset" />
            Front Office Center
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-secondary sm:text-4xl">Dashboard Resepsionis</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-70)" }}>
            Kelola alur check-in, validasi pendaftaran, dan antrean pasien harian dengan proses cepat dan akurat.
          </p>
        </section>

        <div className="dashboard-stats mb-6">
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

        <section className="dashboard-section">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-secondary">Aksi Resepsionis</h2>
            <span className="dashboard-chip dashboard-chip-success">
              <i className="fas fa-layer-group" />
              Operasional Harian
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {actions.map((action) => (
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
      </div>
    </DashboardLayout>
  );
}
