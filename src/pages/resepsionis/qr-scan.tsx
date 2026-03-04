import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { parseFormBody } from "@/lib/http";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type Props = {
  user: SessionUser;
};

function normalizeToken(token: string) {
  let value = String(token).trim().replace(/\s+/g, "");
  value = value.split("?")[0]?.split("#")[0] ?? "";
  value = value.replace(/:\d+$/g, "");
  value = value.replace(/[^a-zA-Z0-9-]/g, "");
  return value;
}

function extractToken(rawValue: string) {
  if (!rawValue) return "";
  const raw = String(rawValue).trim();
  const direct = raw.match(/\/scan\/pasien\/([a-zA-Z0-9-]+)/);
  if (direct?.[1]) return normalizeToken(direct[1]);

  if (!raw.includes("/")) return normalizeToken(raw);

  try {
    const url = new URL(raw);
    const parts = url.pathname.split("/").filter(Boolean);
    return normalizeToken(parts[parts.length - 1] ?? "");
  } catch {
    const parts = raw.split("/").filter(Boolean);
    return normalizeToken(parts[parts.length - 1] ?? "");
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis"] });
  if ("redirect" in auth) return auth;

  if (ctx.req.method === "POST") {
    const body = await parseFormBody(ctx.req);
    const input = String(body.qr_input ?? "");
    const token = extractToken(input);
    if (!token) {
      return {
        redirect: {
          destination: "/resepsionis/qr-scan",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/scan/pasien/${encodeURIComponent(token)}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: toSessionUser(auth.user),
    },
  };
};

export default function ResepsionisQrScanPage({ user }: Props) {
  const [status, setStatus] = useState("Siap");
  const [result, setResult] = useState("-");
  const [cameraReady, setCameraReady] = useState(false);
  const [running, setRunning] = useState(false);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => undefined);
      }
    };
  }, []);

  const goToScan = (decodedText: string) => {
    setResult(decodedText);
    const token = extractToken(decodedText);
    if (!token) {
      setStatus("Gagal: token tidak valid / tidak ditemukan");
      return;
    }
    setStatus("Berhasil terbaca. Mengalihkan...");
    window.location.href = `/scan/pasien/${encodeURIComponent(token)}`;
  };

  const startScan = async () => {
    const win = window as any;
    if (!win.Html5Qrcode) {
      setStatus("Library scanner belum siap.");
      return;
    }
    if (running) return;

    setStatus("Memulai kamera...");
    try {
      const qr = new win.Html5Qrcode("reader");
      scannerRef.current = qr;
      const cameras = await win.Html5Qrcode.getCameras();
      const camId =
        cameras && cameras.length
          ? (cameras.find((camera: any) => /back|rear|environment/i.test(camera.label))?.id ?? cameras[0].id)
          : null;

      if (!camId) {
        setStatus("Kamera tidak ditemukan");
        return;
      }

      await qr.start(
        camId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
        },
        async (decodedText: string) => {
          await stopScan(true);
          goToScan(decodedText);
        },
        () => undefined,
      );
      setRunning(true);
      setStatus("Kamera aktif. Arahkan QR ke kotak.");
    } catch {
      setStatus("Gagal memulai kamera. Cek permission.");
    }
  };

  const stopScan = async (silent = false) => {
    if (!scannerRef.current || !running) {
      if (!silent) setStatus("Kamera belum berjalan");
      return;
    }
    try {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
    } catch {
      // noop
    }
    setRunning(false);
    if (!silent) setStatus("Kamera berhenti");
  };

  const decodeFile = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const input = document.getElementById("qrFile") as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      setStatus("Pilih file gambar dulu");
      return;
    }

    const win = window as any;
    if (!win.Html5Qrcode) {
      setStatus("Library scanner belum siap.");
      return;
    }

    if (running) await stopScan(true);

    setStatus("Mendecode gambar...");
    try {
      const fileScanner = new win.Html5Qrcode("reader");
      const decoded = await fileScanner.scanFile(file, true);
      await fileScanner.clear().catch(() => undefined);
      goToScan(decoded);
    } catch {
      setStatus("Gagal decode dari gambar (QR tidak terbaca).");
    }
  };

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
          <h1 className="mb-2 text-2xl font-bold text-blue-700">QR Scan Pasien</h1>
          <p className="mb-6 text-sm text-gray-600">
            Gunakan kamera untuk scan QR kartu pasien atau upload gambar QR.
          </p>

          <div className="mb-4 text-sm text-gray-600">
            Status: <span className="font-semibold">{status}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-blue-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-blue-700">
                  <i className="fas fa-camera mr-2" /> Scan Kamera
                </h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={startScan}
                    disabled={!cameraReady || running}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Mulai
                  </button>
                  <button
                    type="button"
                    onClick={() => stopScan(false)}
                    disabled={!running}
                    className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-600 disabled:cursor-not-allowed"
                  >
                    Stop
                  </button>
                </div>
              </div>

              <div className="mb-2 text-xs text-gray-500">Izinkan akses kamera. Arahkan QR ke kotak pemindai.</div>
              <div id="reader" className="overflow-hidden rounded-lg" />
              <div className="mt-3 text-xs text-gray-500">
                Jika kamera tidak muncul: pastikan pakai https atau localhost dan izinkan permission camera.
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 p-4">
              <h2 className="mb-3 font-semibold text-blue-700">
                <i className="fas fa-image mr-2" /> Upload Gambar QR
              </h2>
              <div className="mb-2 text-xs text-gray-500">
                Pilih gambar yang berisi QR (JPG/PNG). Sistem akan decode otomatis.
              </div>

              <input
                type="file"
                id="qrFile"
                accept="image/*"
                className="w-full rounded-md border border-blue-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={decodeFile}
                className="mt-3 w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600"
              >
                Decode dari Gambar
              </button>

              <form method="POST" action="/resepsionis/qr-scan" className="mt-4 border-t pt-4">
                <label htmlFor="qr_input" className="mb-1 block text-xs font-semibold text-gray-700">
                  Atau tempel token/URL QR
                </label>
                <input
                  type="text"
                  id="qr_input"
                  name="qr_input"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Token atau URL scan pasien"
                />
                <button
                  type="submit"
                  className="mt-2 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                  Proses
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm text-gray-600">Hasil terbaca:</div>
            <div className="mt-1 break-all rounded-lg border bg-gray-50 p-3 text-sm text-gray-800">{result}</div>
          </div>
        </div>
      </div>

      <Script
        src="https://unpkg.com/html5-qrcode"
        strategy="afterInteractive"
        onLoad={() => setCameraReady(true)}
      />
    </DashboardLayout>
  );
}
