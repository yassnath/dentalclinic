import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

type LayoutUser = {
  id: string;
  name: string;
  role: string;
};

type MenuItem = {
  href: string;
  icon: string;
  label: string;
  badge?: number;
};

function getMenus(user: LayoutUser, unreadNotifCount = 0, language: "id" | "en" = "id"): MenuItem[] {
  if (user.role === "pasien") {
    const isEn = language === "en";
    return [
      { href: "/pasien", icon: "fa-home", label: isEn ? "Dashboard" : "Dashboard" },
      { href: "/jadwal-dokter", icon: "fa-calendar-alt", label: isEn ? "Doctor Schedule" : "Jadwal Dokter" },
      { href: "/pendaftaran-saya", icon: "fa-list", label: isEn ? "My Registration" : "Pendaftaran Saya" },
      { href: "/rekam-medis", icon: "fa-folder", label: isEn ? "Medical Records" : "Rekam Medis" },
      { href: "/pasien/tagihan", icon: "fa-credit-card", label: isEn ? "Billing" : "Pembayaran" },
      { href: "/notifikasi", icon: "fa-bell", label: isEn ? "Notifications" : "Notifikasi", badge: unreadNotifCount },
      { href: "/kartu-pasien", icon: "fa-id-card", label: isEn ? "Patient Card" : "Kartu Pasien" },
      { href: "/pasien/pengaturan", icon: "fa-gear", label: isEn ? "Settings" : "Pengaturan" },
    ];
  }

  if (user.role === "dokter") {
    return [
      { href: "/dokter", icon: "fa-home", label: "Dashboard" },
      { href: "/dokter/jadwal", icon: "fa-calendar-check", label: "Manajemen Jadwal" },
      { href: "/dokter/pendaftar", icon: "fa-list-alt", label: "Semua Pendaftaran" },
      { href: "/dokter/pasien", icon: "fa-users", label: "Data Pasien" },
      { href: "/dokter/daftar-rekam-medis", icon: "fa-stethoscope", label: "Daftar Rekam Medis" },
    ];
  }

  if (user.role === "resepsionis") {
    return [
      { href: "/resepsionis", icon: "fa-home", label: "Dashboard" },
      { href: "/resepsionis/pasien-aktif", icon: "fa-users", label: "Pasien Aktif" },
      { href: "/resepsionis/daftar-pasien", icon: "fa-user-plus", label: "Daftar Offline" },
      { href: "/resepsionis/pendaftaran", icon: "fa-user-plus", label: "Pendaftaran Pasien" },
      { href: "/resepsionis/qr-scan", icon: "fa-qrcode", label: "QR Scan" },
    ];
  }

  return [
    { href: "/admin", icon: "fa-users-cog", label: "Dashboard Admin" },
    { href: "/admin/dokter", icon: "fa-user-md", label: "List Dokter" },
    { href: "/admin/pasien", icon: "fa-user-md", label: "List Pasien" },
    { href: "/admin/resepsionis", icon: "fa-user-md", label: "List Resepsionis" },
    { href: "/admin/pembayaran/create", icon: "fa-credit-card", label: "Tambah Pembayaran" },
    { href: "/admin/pembayaran/konfirmasi", icon: "fa-credit-card", label: "Konfirmasi Pembayaran" },
    { href: "/admin/pembayaran", icon: "fa-credit-card", label: "Data Pembayaran" },
    { href: "/admin/laporan", icon: "fa-chart-line", label: "Laporan" },
  ];
}

function getRoleLabel(role: string) {
  if (role === "admin") return "Administrator";
  if (role === "dokter") return "Dokter";
  if (role === "resepsionis") return "Resepsionis";
  return "Pasien";
}

function isMenuActive(href: string, currentPath: string) {
  const rootMenus = new Set(["/admin", "/dokter", "/resepsionis", "/pasien"]);
  if (rootMenus.has(href)) {
    return currentPath === href;
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

type DashboardLayoutProps = {
  user: LayoutUser;
  children: React.ReactNode;
  unreadNotifCount?: number;
};

export default function DashboardLayout({
  user,
  children,
  unreadNotifCount = 0,
}: DashboardLayoutProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [sidebarDensity, setSidebarDensity] = useState(0);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const menus = useMemo(() => getMenus(user, unreadNotifCount, language), [user, unreadNotifCount, language]);
  const currentPath = useMemo(() => router.asPath.split("?")[0], [router.asPath]);
  const roleLabel = useMemo(() => getRoleLabel(user.role), [user.role]);

  useEffect(() => {
    const readLanguage = () => {
      const match = document.cookie.match(/(?:^|;\s*)healtease_lang=(id|en)(?:;|$)/i);
      setLanguage(match?.[1]?.toLowerCase() === "en" ? "en" : "id");
    };

    readLanguage();
    const onStorage = (event: StorageEvent) => {
      if (event.key === "healtease_lang") readLanguage();
    };
    const onLangChange = () => readLanguage();

    window.addEventListener("storage", onStorage);
    window.addEventListener("healtease-language-change", onLangChange as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("healtease-language-change", onLangChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile || !open) return;

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    const measureFit = async () => {
      const levels = [0, 1, 2, 3];
      for (const level of levels) {
        if (cancelled) return;
        setSidebarDensity(level);
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        const el = sidebarRef.current;
        if (!el) return;
        if (el.scrollHeight <= window.innerHeight) {
          return;
        }
      }
    };

    void measureFit();
    const onResize = () => {
      void measureFit();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, [open, menus.length, language, user.role]);

  return (
    <div className="dashboard-shell min-h-screen bg-app text-body">
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="min-h-screen sm:flex">
        <aside
          ref={sidebarRef}
          className={`dashboard-sidebar dashboard-sidebar-density-${sidebarDensity} fixed inset-y-0 left-0 z-50 h-[100dvh] w-72 overflow-hidden transform border-r border-soft bg-surface p-6 shadow-lg transition-transform duration-300 ease-out sm:sticky sm:top-0 sm:self-start sm:h-[100dvh] sm:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="dashboard-brand rounded-3xl border border-soft bg-surface p-4">
            <div className="mb-3 flex items-center gap-3">
              <Image src="/images/logo2.png" alt="Logo Klinik" width={52} height={52} className="h-12 w-12 rounded-xl border border-soft object-cover" />
              <div>
                <div className="text-lg font-bold text-secondary">Klinik HealthEase</div>
                <div className="text-xs font-medium tracking-wide" style={{ color: "var(--text-70)" }}>
                  Sistem Klinik Modern
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-soft px-3 py-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <i className="fas fa-shield-heart" />
                {roleLabel}
              </span>
              <ThemeToggle compact className="h-9 w-9 justify-center rounded-lg px-0" />
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {menus.map((menu) => {
              const active = isMenuActive(menu.href, currentPath);
              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`dashboard-nav-link ${active ? "is-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className="dashboard-nav-icon">
                      <i className={`fas ${menu.icon}`} />
                    </span>
                    <span className="dashboard-nav-label">{menu.label}</span>
                  </span>
                  {menu.badge && menu.badge > 0 ? (
                    <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {menu.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}

            <a
              href="/logout"
              data-confirm="Yakin ingin logout dari akun ini?"
              data-confirm-title="Konfirmasi Logout"
              data-confirm-confirm-label="Ya, Logout"
              data-confirm-tone="danger"
              className="dashboard-nav-link mt-2"
              onClick={() => setOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="dashboard-nav-icon">
                  <i className="fas fa-sign-out-alt" />
                </span>
                <span className="dashboard-nav-label">Logout</span>
              </span>
            </a>
          </nav>
        </aside>

        <main className="dashboard-main relative flex flex-1 flex-col px-4 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-8">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="dashboard-main-orb dashboard-main-orb-a" />
            <div className="dashboard-main-orb dashboard-main-orb-b" />
          </div>

          <div className="flex-1">
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-soft bg-surface px-4 py-3 shadow-sm sm:hidden">
              <button
                id="sidebar-toggle"
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-soft text-secondary transition hover:text-primary"
                onClick={() => setOpen((prev) => !prev)}
              >
                <span className="sr-only">Buka menu</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="text-sm font-semibold text-secondary">{roleLabel}</div>
              <ThemeToggle compact className="h-10 w-10 justify-center rounded-xl px-0" />
            </div>

            <div className="mb-6 hidden items-center justify-between rounded-3xl border border-soft bg-surface px-5 py-4 shadow-sm sm:flex">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Dashboard {roleLabel}</p>
                <h2 className="text-lg font-bold text-secondary">{user.name}</h2>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-soft bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                <i className="fas fa-circle-check" />
                Sistem aktif dan sinkron
              </div>
            </div>

            <div className="dashboard-page">{children}</div>
          </div>

          <footer className="mt-10 border-t border-soft pt-4 text-center text-sm" style={{ color: "var(--text-55)" }}>
            <span className="copyright-hover">&copy; 2026 Solvix Studio</span>. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
