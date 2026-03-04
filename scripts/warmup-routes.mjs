import { fileURLToPath } from "node:url";

const DEFAULT_BASE_URL = process.env.WARMUP_BASE_URL ?? process.env.APP_URL ?? "http://localhost:3000";
const WARMUP_TIMEOUT_MS = Number(process.env.WARMUP_TIMEOUT_MS ?? "20000");
const WARMUP_CONCURRENCY = Number(process.env.WARMUP_CONCURRENCY ?? "6");

const WARMUP_ROUTES = [
  "/login",
  "/register",

  "/admin",
  "/admin/dokter",
  "/admin/dokter/create",
  "/admin/dokter/1/edit",
  "/admin/pasien",
  "/admin/pasien/create",
  "/admin/pasien/1/edit",
  "/admin/resepsionis",
  "/admin/resepsionis/create",
  "/admin/resepsionis/1/edit",
  "/admin/pembayaran",
  "/admin/pembayaran/create",
  "/admin/pembayaran/konfirmasi",
  "/admin/laporan",

  "/dokter",
  "/dokter/jadwal",
  "/dokter/jadwal/1",
  "/dokter/pendaftar",
  "/dokter/pendaftar/1",
  "/dokter/pendaftar/1/reschedule",
  "/dokter/pasien",
  "/dokter/daftar-rekam-medis",
  "/dokter/rekam_medis/1",

  "/resepsionis",
  "/resepsionis/pasien-aktif",
  "/resepsionis/daftar-pasien",
  "/resepsionis/pendaftaran",
  "/resepsionis/pendaftaran/1/cetak",
  "/resepsionis/qr-scan",

  "/pasien",
  "/jadwal-dokter",
  "/pendaftaran",
  "/pendaftaran-saya",
  "/rekam-medis",
  "/pasien/tagihan",
  "/notifikasi",
  "/kartu-pasien",
  "/profil",
];

async function fetchWithTimeout(url, timeoutMs = WARMUP_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
    });
    return { ok: true, status: response.status };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, status: 0, message };
  } finally {
    clearTimeout(timer);
  }
}

export async function warmupRoutes(baseUrl = DEFAULT_BASE_URL, routes = WARMUP_ROUTES) {
  const start = Date.now();
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const concurrency = Math.max(1, Math.min(WARMUP_CONCURRENCY, routes.length));
  console.log(`[warmup] start ${cleanBase} | routes=${routes.length} | concurrency=${concurrency}`);

  let cursor = 0;
  const nextIndex = () => {
    const index = cursor;
    cursor += 1;
    return index;
  };

  async function worker(workerId) {
    while (true) {
      const index = nextIndex();
      if (index >= routes.length) break;

      const route = routes[index];
      const url = `${cleanBase}${route}`;
      const t0 = Date.now();
      const result = await fetchWithTimeout(url);
      const took = Date.now() - t0;
      if (result.ok) {
        console.log(`[warmup][w${workerId}] ${result.status} ${route} (${took}ms)`);
      } else {
        console.log(`[warmup][w${workerId}] ERR ${route} (${took}ms) ${result.message ?? "request failed"}`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, idx) => worker(idx + 1));
  await Promise.all(workers);

  const total = Date.now() - start;
  console.log(`[warmup] done in ${total}ms`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  warmupRoutes().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[warmup] fatal ${message}`);
    process.exitCode = 1;
  });
}
