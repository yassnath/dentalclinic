import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

type ChatMessage = {
  who: string;
  text: string;
};

type HighlightItem = {
  label: string;
  icon: string;
  target: number;
  mode: "kplus" | "plus" | "lt-minutes" | "percent-1";
};

const highlights: HighlightItem[] = [
  { label: "Pasien Aktif", target: 2400, mode: "kplus", icon: "fa-users" },
  { label: "Dokter Terverifikasi", target: 30, mode: "plus", icon: "fa-user-doctor" },
  { label: "Waktu Respon", target: 3, mode: "lt-minutes", icon: "fa-bolt" },
  { label: "Uptime Sistem", target: 99.9, mode: "percent-1", icon: "fa-signal" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatHighlightValue(item: HighlightItem, value: number) {
  if (item.mode === "kplus") {
    const number = Math.max(1, Math.round(value));
    if (number < 1000) return `${number}`;
    return `${(number / 1000).toFixed(1)}K+`;
  }

  if (item.mode === "plus") {
    return `${Math.max(1, Math.round(value))}+`;
  }

  if (item.mode === "lt-minutes") {
    return `< ${Math.max(1, Math.round(value))} Menit`;
  }

  return `${Math.max(1, Math.min(item.target, value)).toFixed(1)}%`;
}

function HighlightCounter({ item }: { item: HighlightItem }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(item.target);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setStarted(true);
          observer.disconnect();
          break;
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [item.target]);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const durationMs = 2400;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / durationMs, 1);
      const eased = easeOutCubic(progress);
      const next = Math.max(1, eased * item.target);
      setValue(next);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [item.target, started]);

  return <span ref={ref}>{formatHighlightValue(item, value)}</span>;
}

const features = [
  {
    title: "Antrian Real-Time",
    description: "Nomor antrian, status check-in, dan panggilan dokter tersinkron otomatis.",
    icon: "fa-clock-rotate-left",
  },
  {
    title: "Rekam Medis Digital",
    description: "Semua riwayat tindakan, diagnosa, dan resep tersimpan aman dan mudah ditelusuri.",
    icon: "fa-file-medical",
  },
  {
    title: "Pembayaran Terintegrasi",
    description: "Upload bukti bayar, verifikasi admin, dan status tagihan terpantau dari satu dashboard.",
    icon: "fa-credit-card",
  },
  {
    title: "Notifikasi Cerdas",
    description: "Pengingat jadwal, update status pendaftaran, dan hasil layanan dikirim otomatis.",
    icon: "fa-bell",
  },
];

const services = [
  {
    title: "Konsultasi Dokter Umum",
    description: "Skrining awal, evaluasi keluhan harian, hingga rujukan lanjutan terarah.",
    icon: "fa-stethoscope",
  },
  {
    title: "Poli Gigi",
    description: "Scaling, tambal, cabut, dan edukasi preventif dengan alur kunjungan yang efisien.",
    icon: "fa-tooth",
  },
  {
    title: "Laboratorium Dasar",
    description: "Pemeriksaan cepat dengan hasil yang terdokumentasi langsung ke sistem pasien.",
    icon: "fa-flask",
  },
];

const priceRows = [
  ["Umum", "Konsultasi / pemeriksaan", "Rp 100.000 - 200.000", "Estimasi awal (bisa berbeda tiap klinik)"],
  ["Preventif", "Scaling / pembersihan karang gigi", "Rp 200.000 - 600.000", "Tergantung tingkat karang & fasilitas"],
  ["Restorasi", "Tambal gigi (komposit/umum)", "Rp 150.000 - 800.000", "Dipengaruhi bahan & kedalaman lubang"],
  ["Tindakan", "Cabut gigi biasa (non-bedah)", "Rp 350.000 - 650.000", "Tergantung posisi gigi & kondisi akar"],
  ["Endodonti", "Perawatan saluran akar (PSA / root canal)", "Rp 800.000 - 3.500.000+", "Tergantung gigi & kompleksitas"],
] as const;

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const introSent = useMemo(() => messages.length > 0, [messages.length]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          const delay = Number(node.dataset.revealDelay ?? "0");
          if (delay > 0) {
            setTimeout(() => node.classList.add("is-visible"), delay);
          } else {
            node.classList.add("is-visible");
          }
          observer.unobserve(node);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.15,
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const openPanel = () => {
    setPanelOpen((prev) => !prev);
    if (!introSent) {
      setMessages([
        {
          who: "AI CS",
          text: "Halo Kak! Aku bisa bantu info jadwal dokter, biaya layanan, dan cara konsultasi. Untuk daftar, ketik konsultasi ya.",
        },
      ]);
    }
  };

  async function onSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { who: "Kamu", text }, { who: "AI CS", text: "..." }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/cs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { who: "AI CS", text: res.ok ? (data.reply ?? "Maaf, terjadi kendala.") : `Error ${res.status}: ${data.error ?? "Server error"}` },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Koneksi gagal";
      setMessages((prev) => [...prev.slice(0, -1), { who: "AI CS", text: `Koneksi gagal: ${message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Klinik HealthEase - Klinik Modern & Nyaman</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="landing-shell min-h-screen bg-app text-body">
        <nav className="landing-nav sticky top-0 z-50 border-b border-soft bg-white/85 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow">
                  <i className="fas fa-heart-pulse" />
                </span>
                <span className="text-2xl font-bold tracking-tight text-secondary">Klinik HealthEase</span>
              </Link>

              <div className="hidden items-center sm:flex">
                <div className="flex items-center gap-1.5">
                  <a href="#fitur" className="rounded-full px-3.5 py-2 text-sm font-medium text-primary transition hover:bg-blue-100 sm:text-base">
                    Fitur
                  </a>
                  <a href="#biaya-layanan" className="rounded-full px-3.5 py-2 text-sm font-medium text-primary transition hover:bg-blue-100 sm:text-base">
                    Biaya Layanan
                  </a>
                  <a href="#kontak" className="rounded-full px-3.5 py-2 text-sm font-medium text-primary transition hover:bg-blue-100 sm:text-base">
                    Hubungi Kami
                  </a>
                  <Link href="/login" className="rounded-full px-3.5 py-2 text-sm font-medium text-primary transition hover:bg-blue-100 sm:text-base">
                    Login
                  </Link>
                </div>
                <div className="ml-2 flex items-center gap-2">
                  <Link href="/login" className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 sm:text-base">
                    Konsultasi Sekarang
                  </Link>
                  <ThemeToggle compact className="h-10 w-10 justify-center rounded-xl px-0" />
                </div>
              </div>

              <div className="flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  aria-controls="nav-menu"
                  aria-expanded={menuOpen}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-soft text-secondary transition hover:bg-blue-100"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <span className="sr-only">Buka menu</span>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <ThemeToggle compact className="h-10 w-10 justify-center rounded-xl px-0" />
              </div>
            </div>

            <div id="nav-menu" className={`${menuOpen ? "block" : "hidden"} mt-3 rounded-2xl border border-soft bg-surface p-3 shadow-sm sm:hidden`}>
              <a href="#fitur" className="block rounded-full px-3 py-2 text-sm font-medium text-primary transition hover:bg-blue-100">
                Fitur
              </a>
              <a href="#biaya-layanan" className="block rounded-full px-3 py-2 text-sm font-medium text-primary transition hover:bg-blue-100">
                Biaya Layanan
              </a>
              <a href="#kontak" className="block rounded-full px-3 py-2 text-sm font-medium text-primary transition hover:bg-blue-100">
                Hubungi Kami
              </a>
              <Link href="/login" className="block rounded-full px-3 py-2 text-sm font-medium text-primary transition hover:bg-blue-100">
                Login
              </Link>
              <Link href="/login" className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                Konsultasi Sekarang
              </Link>
            </div>
          </div>
        </nav>

        <section
          className="landing-hero relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 10% 0%, color-mix(in srgb, var(--primary-light) 22%, transparent) 0%, transparent 42%), radial-gradient(circle at 100% 15%, color-mix(in srgb, var(--secondary-main) 22%, transparent) 0%, transparent 44%), linear-gradient(180deg, color-mix(in srgb, var(--bg-page) 84%, white) 0%, var(--bg-page) 100%)",
          }}
        >
          <div className="landing-grid pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(color-mix(in srgb, var(--border-color) 35%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--border-color) 35%, transparent) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
          <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-10 px-6 pb-16 pt-4 md:grid-cols-2 md:pb-20 md:pt-7">
            <div data-reveal>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                <i className="fas fa-shield-heart" />
                Sistem Klinik Terintegrasi
              </span>

              <h1 className="text-4xl font-extrabold leading-tight text-secondary md:text-6xl">
                Kelola Klinik Lebih
                <span className="block text-blue-600">Cepat, Rapi, dan Modern</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-70)" }}>
                Dari pendaftaran pasien, jadwal dokter, hingga pembayaran dan rekam medis digital. Semua proses klinik dalam satu platform yang nyaman dipakai dari front office sampai dokter.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                  <i className="fas fa-calendar-check" />
                  Konsultasi Sekarang
                </Link>
                <a href="#fitur" className="inline-flex items-center gap-2 rounded-2xl border border-soft bg-white px-6 py-3 text-base font-semibold text-primary shadow transition hover:-translate-y-0.5 hover:bg-blue-100">
                  <i className="fas fa-layer-group" />
                  Lihat Fitur
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {highlights.map((item) => (
                  <div key={item.label} className="landing-stat rounded-2xl border border-soft bg-white/80 p-3 shadow-sm backdrop-blur-sm" data-reveal>
                    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <i className={`fas ${item.icon}`} />
                    </div>
                    <div className="text-lg font-extrabold text-secondary">
                      <HighlightCounter item={item} />
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-70)" }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl md:max-w-[30rem] lg:max-w-[31rem]" data-reveal>
              <div className="landing-panel relative overflow-hidden rounded-[2rem] border border-soft bg-white p-2.5 shadow-2xl shadow-blue-500/20 sm:p-3 md:p-3.5">
                <div className="mb-2.5 flex items-center justify-between rounded-xl border border-soft bg-blue-50 px-3 py-2 md:px-3.5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Dashboard Ringkas</p>
                    <p className="text-sm font-semibold text-secondary">Pantau alur pasien hari ini</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Live</span>
                </div>
                <Image
                  src="/images/login.png"
                  alt="Ilustrasi Klinik"
                  width={640}
                  height={640}
                  className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem] md:max-w-[22rem] lg:max-w-[23rem]"
                  priority
                />
              </div>

              <div className="landing-float-card absolute -left-5 top-6 hidden w-44 rounded-2xl border border-soft bg-white p-4 shadow-lg md:block" data-reveal>
                <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Check-in</p>
                <p className="mt-1 text-sm font-semibold text-secondary">15 pasien sudah hadir</p>
              </div>

              <div className="landing-float-card absolute bottom-3 right-2 hidden w-48 rounded-2xl border border-soft bg-white p-4 shadow-lg md:block" data-reveal>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Notifikasi</p>
                <p className="mt-1 text-sm font-semibold text-secondary">8 update antrian masuk</p>
              </div>
            </div>
          </div>
        </section>

        <section id="fitur" className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6" data-reveal>
            <div className="mx-auto max-w-3xl text-center" data-reveal>
              <h2 className="text-3xl font-bold text-secondary md:text-4xl">Mengapa HealthEase Lebih Unggul?</h2>
              <p className="mt-3 text-base" style={{ color: "var(--text-70)" }}>
                Dirancang untuk operasional klinik modern dengan antarmuka nyaman, akses cepat, dan alur kerja yang jelas.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((item) => (
                <div key={item.title} className="landing-card group rounded-3xl border border-soft bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl" data-reveal>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <i className={`fas ${item.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-app py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6" data-reveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end" data-reveal>
              <div>
                <h2 className="text-3xl font-bold text-secondary md:text-4xl">Layanan Utama</h2>
                <p className="mt-2 text-base" style={{ color: "var(--text-70)" }}>
                  Fokus pada pelayanan cepat dan dokumentasi medis yang konsisten.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="landing-card rounded-3xl border border-soft bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" data-reveal>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg text-white">
                    <i className={`fas ${service.icon}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-70)" }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="biaya-layanan" className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6" data-reveal>
            <div className="mb-8 text-center" data-reveal>
              <h2 className="text-3xl font-bold text-secondary md:text-4xl">Biaya Layanan Klinik Gigi (Estimasi)</h2>
              <p className="mx-auto mt-3 max-w-3xl" style={{ color: "var(--text-70)" }}>
                Nilai biaya di bawah merupakan kisaran umum. Harga final mengikuti evaluasi dokter, tingkat kesulitan, dan kebutuhan tindakan.
              </p>
            </div>

            <div className="landing-pricing overflow-hidden rounded-3xl border border-soft bg-white shadow-lg" data-reveal>
              <div className="p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold tracking-wide text-secondary">Estimasi Biaya</p>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Transparan</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="landing-price-table responsive-table w-full text-left text-xs theme-table sm:min-w-[760px] sm:text-sm">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 font-semibold">Kategori</th>
                        <th className="px-4 py-3 font-semibold">Layanan/Tindakan</th>
                        <th className="px-4 py-3 font-semibold">Kisaran Biaya</th>
                        <th className="px-4 py-3 font-semibold">Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="text-body">
                      {priceRows.map((row) => (
                        <tr key={`${row[0]}-${row[1]}`} className="border-t border-soft">
                          <td data-label="Kategori" className="px-4 py-3">
                            {row[0]}
                          </td>
                          <td data-label="Layanan/Tindakan" className="px-4 py-3">
                            {row[1]}
                          </td>
                          <td data-label="Kisaran Biaya" className="px-4 py-3 font-semibold">
                            {row[2]}
                          </td>
                          <td data-label="Catatan" className="px-4 py-3">
                            {row[3]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs" style={{ color: "var(--text-70)" }}>
                  <span className="font-semibold">Catatan:</span> Konsultasi awal disarankan untuk mendapatkan estimasi biaya yang lebih presisi.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6" data-reveal>
            <div className="landing-cta relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-700 to-blue-600 px-6 py-12 text-center text-white shadow-2xl sm:px-10 sm:py-14" data-reveal>
              <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-2xl" />

              <h3 className="text-3xl font-bold md:text-4xl">Siap mulai pelayanan klinik yang lebih modern?</h3>
              <p className="mx-auto mt-4 max-w-2xl text-white/90">
                Terapkan alur pendaftaran, antrian, dan rekam medis digital dalam satu sistem yang menyatu.
              </p>
              <Link href="/login" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-100">
                <i className="fas fa-arrow-right" />
                Konsultasi Sekarang
              </Link>
            </div>
          </div>
        </section>

        <section id="kontak" className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center" data-reveal>
            <h2 className="text-3xl font-bold text-secondary md:text-4xl">Hubungi Kami</h2>
            <p className="mx-auto mt-3 max-w-2xl" style={{ color: "var(--text-70)" }}>
              Ingin implementasi untuk klinik Anda? Tim kami siap bantu dari setup sampai go-live.
            </p>

            <div className="mx-auto mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
              <a
                href="https://instagram.com/solvix.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-contact-card group flex items-center justify-center gap-3 rounded-2xl border border-soft bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                data-reveal
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <i className="fab fa-instagram" />
                </span>
                <div className="text-left">
                  <div className="text-xs" style={{ color: "var(--text-55)" }}>
                    Instagram
                  </div>
                  <div className="font-semibold text-body transition group-hover:text-primary">@solvix.studio</div>
                </div>
              </a>

              <a
                href="https://wa.me/6282221657340"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-contact-card group flex items-center justify-center gap-3 rounded-2xl border border-soft bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                data-reveal
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <i className="fab fa-whatsapp" />
                </span>
                <div className="text-left">
                  <div className="text-xs" style={{ color: "var(--text-55)" }}>
                    WhatsApp
                  </div>
                  <div className="font-semibold text-body transition group-hover:text-primary">0822-2165-7340</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <footer className="py-6 text-center text-sm" style={{ color: "var(--text-55)" }}>
          <span className="copyright-hover">&copy; 2026 Solvix Studio</span>. All rights reserved.
        </footer>

        <div className="fixed bottom-[18px] right-[18px] z-[9999] flex flex-col items-end">
          <button
            type="button"
            id="ai-cs-btn"
            onClick={openPanel}
            aria-label={panelOpen ? "Tutup chatbot AI" : "Buka chatbot AI"}
            className={`ai-chat-trigger ${panelOpen ? "is-open" : ""}`}
          >
            <span className="ai-chat-glow" aria-hidden />
            <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7">
              <path
                d="M4.5 6.25A2.25 2.25 0 0 1 6.75 4h10.5a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 17.25 16H11.3l-3.95 3.58a.75.75 0 0 1-1.25-.56V16h-.35A2.25 2.25 0 0 1 3.5 13.75v-7.5Z"
                fill="currentColor"
                opacity="0.95"
              />
              <path d="M8.35 10.2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3.65 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3.65 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="#E0ECFF" />
              <path d="M18.25 3.6l.36 1.09 1.09.36-1.09.37-.36 1.09-.37-1.1-1.09-.36 1.1-.37.36-1.08Z" fill="#A7F3D0" />
            </svg>
            <span className="sr-only">AI Customer Support</span>
          </button>

          {panelOpen ? (
            <div className="mt-3 w-[320px] max-w-[90vw] overflow-hidden rounded-xl border border-soft bg-white shadow-xl">
              <div className="border-b border-soft px-3 py-2 font-bold">
                Customer Support
                <button type="button" onClick={() => setPanelOpen(false)} className="float-right bg-transparent">
                  x
                </button>
              </div>

              <div className="h-[260px] overflow-auto p-3 text-sm">
                {messages.map((msg, idx) => {
                  const isUser = msg.who === "Kamu";
                  const isTyping = msg.text === "...";

                  return (
                    <div key={`${msg.who}-${idx}`} className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[86%] rounded-2xl px-3 py-2 shadow-sm ${
                          isUser
                            ? "rounded-br-md bg-blue-600 text-white"
                            : "rounded-bl-md border border-soft bg-blue-50 text-body"
                        }`}
                      >
                        <div className={`mb-1 text-[11px] font-semibold ${isUser ? "text-blue-100" : "text-blue-700"}`}>
                          {isUser ? "Kamu" : "AI CS"}
                        </div>
                        <div className={`whitespace-pre-wrap leading-relaxed ${isTyping ? "animate-pulse" : ""}`}>
                          {isTyping ? "Mengetik..." : msg.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={onSend} className="flex gap-2 border-t border-soft p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanya jadwal dokter, biaya, atau konsultasi..."
                  className="flex-1 rounded-lg border border-soft px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-3 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Kirim
                </button>
              </form>
            </div>
          ) : null}
        </div>

        <style jsx global>{`
          .landing-nav {
            background: color-mix(in srgb, var(--bg-surface) 84%, transparent);
          }

          .landing-grid {
            opacity: 0.42;
          }

          .ai-chat-trigger {
            position: relative;
            display: inline-flex;
            height: 56px;
            width: 56px;
            align-items: center;
            justify-content: center;
            border-radius: 18px;
            border: 1px solid color-mix(in srgb, var(--primary-main) 45%, var(--border-color));
            background: linear-gradient(145deg, color-mix(in srgb, var(--primary-main) 88%, white), color-mix(in srgb, var(--secondary-main) 80%, var(--primary-dark)));
            color: #fff;
            box-shadow:
              0 14px 28px color-mix(in srgb, var(--primary-main) 35%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.24);
            transition:
              transform 0.24s ease,
              box-shadow 0.24s ease,
              border-color 0.24s ease,
              filter 0.24s ease;
            isolation: isolate;
          }

          .ai-chat-trigger:hover {
            transform: translateY(-2px) scale(1.03);
            border-color: color-mix(in srgb, var(--secondary-main) 65%, var(--border-color));
            box-shadow:
              0 18px 30px color-mix(in srgb, var(--secondary-main) 38%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
            filter: saturate(1.06);
          }

          .ai-chat-trigger:focus-visible {
            outline: 2px solid color-mix(in srgb, var(--secondary-main) 75%, white);
            outline-offset: 2px;
          }

          .ai-chat-trigger.is-open {
            background: linear-gradient(145deg, color-mix(in srgb, var(--primary-dark) 82%, black), color-mix(in srgb, var(--primary-main) 72%, var(--secondary-dark)));
          }

          .ai-chat-glow {
            position: absolute;
            inset: -8px;
            z-index: -1;
            border-radius: 24px;
            pointer-events: none;
            background: radial-gradient(circle, color-mix(in srgb, var(--secondary-main) 46%, transparent) 0%, transparent 68%);
            filter: blur(8px);
            animation: aiGlowPulse 2.25s ease-in-out infinite;
          }

          @keyframes aiGlowPulse {
            0%,
            100% {
              opacity: 0.45;
              transform: scale(1);
            }
            50% {
              opacity: 0.15;
              transform: scale(1.1);
            }
          }

          .landing-stat,
          .landing-panel,
          .landing-float-card,
          .landing-card,
          .landing-pricing,
          .landing-contact-card {
            transition:
              transform 0.32s ease,
              box-shadow 0.32s ease,
              border-color 0.32s ease,
              background-color 0.32s ease;
          }

          .landing-stat:hover,
          .landing-panel:hover,
          .landing-float-card:hover,
          .landing-card:hover,
          .landing-contact-card:hover {
            border-color: color-mix(in srgb, var(--primary-main) 42%, var(--border-color));
            box-shadow: 0 18px 35px color-mix(in srgb, var(--primary-main) 20%, transparent);
          }

          [data-reveal] {
            opacity: 0;
            transform: translateY(22px) scale(0.985);
            transition:
              opacity 0.55s ease,
              transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
            will-change: opacity, transform;
          }

          [data-reveal].is-visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          [data-theme="dark"] .landing-nav {
            background: color-mix(in srgb, var(--bg-surface) 74%, transparent);
            border-color: color-mix(in srgb, var(--primary-main) 24%, var(--border-color));
          }

          [data-theme="dark"] .ai-chat-trigger {
            border-color: color-mix(in srgb, var(--primary-light) 40%, var(--border-color));
            box-shadow:
              0 20px 34px rgba(0, 0, 0, 0.58),
              0 0 0 1px color-mix(in srgb, var(--primary-main) 26%, transparent);
          }

          [data-theme="dark"] .landing-hero {
            background:
              radial-gradient(circle at 10% 0%, color-mix(in srgb, var(--primary-main) 28%, transparent) 0%, transparent 48%),
              radial-gradient(circle at 100% 12%, color-mix(in srgb, var(--secondary-main) 28%, transparent) 0%, transparent 50%),
              linear-gradient(180deg, color-mix(in srgb, var(--bg-page) 86%, #05080f) 0%, var(--bg-page) 100%) !important;
          }

          [data-theme="dark"] .landing-grid {
            opacity: 0.2;
          }

          [data-theme="dark"] .landing-stat,
          [data-theme="dark"] .landing-panel,
          [data-theme="dark"] .landing-float-card,
          [data-theme="dark"] .landing-card,
          [data-theme="dark"] .landing-pricing,
          [data-theme="dark"] .landing-contact-card {
            background: color-mix(in srgb, var(--bg-surface) 92%, #0b1220) !important;
            border-color: color-mix(in srgb, var(--primary-main) 20%, var(--border-color)) !important;
            box-shadow: 0 18px 35px rgba(0, 0, 0, 0.45) !important;
          }

          [data-theme="dark"] .landing-cta {
            border-color: color-mix(in srgb, var(--primary-light) 44%, transparent) !important;
            box-shadow: 0 22px 38px rgba(0, 0, 0, 0.5) !important;
          }

          [data-theme="dark"] .landing-contact-card .bg-blue-50,
          [data-theme="dark"] .landing-panel .bg-blue-50 {
            background: color-mix(in srgb, var(--primary-main) 26%, var(--bg-surface)) !important;
          }

          [data-theme="dark"] .landing-contact-card .bg-green-50 {
            background: color-mix(in srgb, var(--success-main) 26%, var(--bg-surface)) !important;
          }

          @media (prefers-reduced-motion: reduce) {
            [data-reveal] {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
