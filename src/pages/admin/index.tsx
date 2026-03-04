import type { GetServerSideProps } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";
import { formatCurrency } from "@/lib/format";
import { makeSsrCacheKey, shouldBypassSsrCache, withSsrCache } from "@/lib/ssr-cache";

type Props = {
  user: SessionUser;
  totalPasien: number;
  totalDokter: number;
  totalResepsionis: number;
  totalKeuangan: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["admin"] });
  if ("redirect" in auth) return auth;

  const loadData = async () => {
    const [totalPasien, totalDokter, totalResepsionis, totalKeuangan] = await Promise.all([
      prisma.user.count({ where: { role: "pasien" } }),
      prisma.user.count({ where: { role: "dokter" } }),
      prisma.user.count({ where: { role: "resepsionis" } }),
      prisma.pembayaran.aggregate({ _sum: { jumlah: true } }),
    ]);

    return {
      totalPasien,
      totalDokter,
      totalResepsionis,
      totalKeuangan: totalKeuangan._sum.jumlah ? totalKeuangan._sum.jumlah.toString() : "0",
    };
  };

  const cacheKey = makeSsrCacheKey(`admin-dashboard:${auth.user.id.toString()}`, ctx.query);
  const data = shouldBypassSsrCache(ctx.query) ? await loadData() : await withSsrCache(cacheKey, 8000, loadData);

  return {
    props: {
      user: toSessionUser(auth.user),
      ...data,
    },
  };
};

export default function AdminDashboardPage({ user, totalPasien, totalDokter, totalResepsionis, totalKeuangan }: Props) {
  const stats = [
    {
      label: "Total Pasien",
      value: totalPasien.toLocaleString("id-ID"),
      hint: "Akun pasien terdaftar",
      icon: "fa-user-injured",
      tone: "primary",
    },
    {
      label: "Total Dokter",
      value: totalDokter.toLocaleString("id-ID"),
      hint: "Dokter aktif di sistem",
      icon: "fa-user-doctor",
      tone: "success",
    },
    {
      label: "Total Resepsionis",
      value: totalResepsionis.toLocaleString("id-ID"),
      hint: "Tim front office",
      icon: "fa-user-nurse",
      tone: "warning",
    },
    {
      label: "Total Keuangan",
      value: `Rp ${formatCurrency(totalKeuangan)}`,
      hint: "Akumulasi nominal pembayaran",
      icon: "fa-wallet",
      tone: "info",
    },
  ] as const;

  const quickActions = [
    {
      href: "/admin/dokter/create",
      title: "Tambah Dokter",
      description: "Tambah akun dokter baru beserta spesialis.",
      icon: "fa-user-plus",
    },
    {
      href: "/admin/resepsionis/create",
      title: "Tambah Resepsionis",
      description: "Onboarding staf front office lebih cepat.",
      icon: "fa-id-badge",
    },
    {
      href: "/admin/pasien/create",
      title: "Tambah Pasien",
      description: "Daftarkan pasien baru dari panel admin.",
      icon: "fa-address-card",
    },
    {
      href: "/admin/pembayaran/konfirmasi",
      title: "Konfirmasi Pembayaran",
      description: "Verifikasi bukti transfer dan update status.",
      icon: "fa-circle-check",
    },
  ] as const;

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto w-full max-w-7xl">
        <section className="dashboard-hero mb-6">
          <span className="dashboard-chip">
            <i className="fas fa-user-shield" />
            Admin Control Center
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-secondary sm:text-4xl">Dashboard Admin</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-70)" }}>
            Pantau operasional klinik dari data pengguna, pembayaran, hingga aktivitas layanan dalam satu panel terintegrasi.
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
            <h2 className="text-xl font-bold text-secondary">Aksi Cepat</h2>
            <span className="dashboard-chip dashboard-chip-success">
              <i className="fas fa-bolt" />
              Update real-time
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
      </div>
    </DashboardLayout>
  );
}
