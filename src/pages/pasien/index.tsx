import type { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type PasienDashboardProps = {
  user: SessionUser;
  unreadNotifCount: number;
  totalPendaftaran: number;
  totalRekamMedis: number;
  tagihanAktif: number;
};

const SETTLED_PAYMENT_STATUSES = ["lunas", "dibayar", "dikonfirmasi", "paid", "confirmed", "success", "selesai"] as const;

export const getServerSideProps: GetServerSideProps<PasienDashboardProps> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const [unreadNotifCount, totalPendaftaran, totalRekamMedis, tagihanAktif] = await Promise.all([
      prisma.notifikasi.count({
        where: {
          userId: auth.user.id,
          dibaca: false,
        },
      }),
      prisma.pendaftaran.count({
        where: { userId: auth.user.id },
      }),
      prisma.rekamMedis.count({
        where: {
          OR: [{ pasienId: auth.user.id }, { pendaftaran: { userId: auth.user.id } }],
        },
      }),
      prisma.pembayaran.count({
        where: {
          userId: auth.user.id,
          NOT: {
            OR: SETTLED_PAYMENT_STATUSES.map((status) => ({
              status: {
                equals: status,
                mode: "insensitive" as const,
              },
            })),
          },
        },
      }),
    ]);

    return { unreadNotifCount, totalPendaftaran, totalRekamMedis, tagihanAktif };
  };

  const cacheKey = makeSsrCacheKey(`pasien-dashboard:${auth.user.id.toString()}`, ctx.query);
  let data: Awaited<ReturnType<typeof loadData>>;
  try {
    data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 5000, loadData);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    console.error("[pasien/dashboard] failed to load stats:", reason);
    data = {
      unreadNotifCount: 0,
      totalPendaftaran: 0,
      totalRekamMedis: 0,
      tagihanAktif: 0,
    };
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      ...data,
    },
  };
};

export default function PasienDashboardPage({ user, unreadNotifCount, totalPendaftaran, totalRekamMedis, tagihanAktif }: PasienDashboardProps) {
  const stats = [
    {
      label: "Notifikasi Baru",
      value: unreadNotifCount.toLocaleString("id-ID"),
      hint: "Belum dibaca",
      icon: "fa-bell",
      tone: "warning",
    },
    {
      label: "Pendaftaran Saya",
      value: totalPendaftaran.toLocaleString("id-ID"),
      hint: "Riwayat konsultasi",
      icon: "fa-clipboard-list",
      tone: "primary",
    },
    {
      label: "Rekam Medis",
      value: totalRekamMedis.toLocaleString("id-ID"),
      hint: "Data kesehatan tersimpan",
      icon: "fa-file-medical",
      tone: "success",
    },
    {
      label: "Tagihan Aktif",
      value: tagihanAktif.toLocaleString("id-ID"),
      hint: "Perlu konfirmasi/lunas",
      icon: "fa-credit-card",
      tone: "info",
    },
  ] as const;

  const features = [
    {
      title: "Jadwal Dokter",
      description: "Lihat jadwal dokter tersedia dan pilih waktu konsultasi yang pas.",
      href: "/jadwal-dokter",
      image: "/images/jadwal-dokter.png",
      icon: "fa-calendar-alt",
    },
    {
      title: "Pendaftaran Saya",
      description: "Pantau status pendaftaran, nomor antrean, dan opsi reschedule.",
      href: "/pendaftaran-saya",
      image: "/images/konsultasi.png",
      icon: "fa-list-check",
    },
    {
      title: "Rekam Medis",
      description: "Akses riwayat diagnosa, tindakan, dan catatan dokter Anda.",
      href: "/rekam-medis",
      image: "/images/rekam-medis.png",
      icon: "fa-notes-medical",
    },
    {
      title: "Pengaturan",
      description: "Ubah bahasa dashboard, username, dan password akun pasien.",
      href: "/pasien/pengaturan",
      image: "/images/konsultasi.png",
      icon: "fa-gear",
    },
  ] as const;

  return (
    <DashboardLayout user={user} unreadNotifCount={unreadNotifCount}>
      <div className="mx-auto w-full max-w-7xl">
        <section className="dashboard-hero mb-6">
          <span className="dashboard-chip">
            <i className="fas fa-heart-pulse" />
            Portal Pasien
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-secondary sm:text-4xl">Dashboard Pasien</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-70)" }}>
            Selamat datang, {user.name}. Semua kebutuhan konsultasi, jadwal, pembayaran, dan rekam medis tersedia dalam satu dashboard.
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
            <h2 className="text-xl font-bold text-secondary">Menu Utama Pasien</h2>
            <span className="dashboard-chip dashboard-chip-success">
              <i className="fas fa-circle-check" />
              Siap digunakan
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.href} className="dashboard-stat-card dashboard-stat-card-sm">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="dashboard-stat-icon dashboard-stat-icon-sm primary">
                    <i className={`fas ${feature.icon}`} />
                  </span>
                  <Image src={feature.image} alt={feature.title} width={74} height={74} className="h-[52px] w-[52px] object-contain" />
                </div>
                <h3 className="text-lg font-bold text-secondary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
                  {feature.description}
                </p>
                <Link href={feature.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700">
                  Buka menu <i className="fas fa-arrow-right" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
