import jsQR from "jsqr";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type Props = {
  user: SessionUser;
};

type CameraDevice = {
  id: string;
  label: string;
};

type Html5QrcodeInstance = {
  start: (
    cameraId: string,
    config: {
      fps?: number;
      qrbox?: { width: number; height: number };
      rememberLastUsedCamera?: boolean;
    },
    onSuccess: (decodedText: string) => void | Promise<void>,
    onError: (errorMessage: string) => void,
  ) => Promise<void>;
  stop: () => Promise<void>;
  clear: () => Promise<void>;
  scanFile: (file: File, showImage?: boolean) => Promise<string>;
};

type Html5QrcodeModule = {
  Html5Qrcode: {
    new (elementId: string): Html5QrcodeInstance;
    getCameras: () => Promise<CameraDevice[]>;
  };
};

async function loadHtml5QrcodeModule(): Promise<Html5QrcodeModule | null> {
  if (typeof window === "undefined") return null;
  try {
    return (await import("html5-qrcode")) as unknown as Html5QrcodeModule;
  } catch {
    return null;
  }
}

function normalizeToken(token: string) {
  let value = String(token).replace(/[\u200B-\u200D\uFEFF]/g, "").trim().replace(/\s+/g, "");
  value = value.replace(/^['"`]+|['"`]+$/g, "");
  value = value.replace(/:\d+$/g, "");
  value = value.replace(/[^a-zA-Z0-9-]/g, "");
  return value;
}

function extractToken(rawValue: string) {
  if (!rawValue) return "";
  const raw = String(rawValue).replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
  const direct = raw.match(/\/scan\/pasien\/([a-zA-Z0-9-]+)/i);
  if (direct?.[1]) return normalizeToken(direct[1]);

  const embeddedUrl = raw.match(/https?:\/\/[^\s]+/i)?.[0] ?? raw;
  if (!embeddedUrl.includes("/")) return normalizeToken(embeddedUrl);

  try {
    const url = new URL(embeddedUrl);
    const tokenParam =
      url.searchParams.get("token") ||
      url.searchParams.get("qr") ||
      url.searchParams.get("value") ||
      url.searchParams.get("id");
    if (tokenParam) return normalizeToken(tokenParam);
    const parts = url.pathname.split("/").filter(Boolean);
    return normalizeToken(parts[parts.length - 1] ?? "");
  } catch {
    const parts = raw.split("/").filter(Boolean);
    return normalizeToken(parts[parts.length - 1] ?? "");
  }
}

function toMonochrome(source: Uint8ClampedArray) {
  const next = new Uint8ClampedArray(source);
  for (let i = 0; i < next.length; i += 4) {
    const luminance = next[i] * 0.299 + next[i + 1] * 0.587 + next[i + 2] * 0.114;
    const value = luminance > 170 ? 255 : 0;
    next[i] = value;
    next[i + 1] = value;
    next[i + 2] = value;
    next[i + 3] = 255;
  }
  return next;
}

async function getImageDataFromFile(file: File) {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file);
    try {
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      context.drawImage(bitmap, 0, 0);
      return context.getImageData(0, 0, canvas.width, canvas.height);
    } finally {
      bitmap.close();
    }
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("IMAGE_LOAD_FAILED"));
      img.src = objectUrl;
    });

    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    if (!canvas.width || !canvas.height) return null;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function decodeQrFromImageFile(file: File) {
  const frame = await getImageDataFromFile(file);
  if (!frame) return null;

  const direct = jsQR(frame.data, frame.width, frame.height, {
    inversionAttempts: "attemptBoth",
  });
  if (direct?.data) return direct.data;

  const enhanced = toMonochrome(frame.data);
  const fallback = jsQR(enhanced, frame.width, frame.height, {
    inversionAttempts: "attemptBoth",
  });
  return fallback?.data ?? null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis"] });
  if ("redirect" in auth) return auth;

  return {
    props: {
      user: toSessionUser(auth.user),
    },
  };
};

export default function ResepsionisQrScanPage({ user }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState("Siap");
  const [result, setResult] = useState("-");
  const [qrInput, setQrInput] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [processing, setProcessing] = useState(false);
  const scannerRef = useRef<Html5QrcodeInstance | null>(null);
  const scannerModuleRef = useRef<Promise<Html5QrcodeModule | null> | null>(null);

  const getScannerModule = async () => {
    if (!scannerModuleRef.current) {
      scannerModuleRef.current = loadHtml5QrcodeModule();
    }
    return scannerModuleRef.current;
  };

  useEffect(() => {
    let mounted = true;
    getScannerModule().then((module) => {
      if (mounted) setCameraReady(Boolean(module));
    });

    return () => {
      mounted = false;
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => undefined);
      }
    };
  }, []);

  const processQrValue = async (rawValue: string) => {
    const source = String(rawValue ?? "").trim();
    setResult(source || "-");
    setQrInput(source);

    const token = extractToken(source);
    if (!token) {
      setProcessing(false);
      setStatus("Gagal: token tidak valid / tidak ditemukan");
      return false;
    }

    setProcessing(true);
    setStatus("QR valid. Membuka data pasien...");
    try {
      const moved = await router.push(`/scan/pasien/${encodeURIComponent(token)}`);
      if (moved) return true;
      setStatus("Gagal membuka halaman pasien.");
      setProcessing(false);
      return false;
    } catch {
      setStatus("Gagal membuka halaman pasien.");
      setProcessing(false);
      return false;
    }
  };

  const handleDecodedValue = async (decodedText: string, sourceLabel: string) => {
    const value = String(decodedText ?? "").trim();
    if (!value) {
      setStatus(`Gagal: hasil ${sourceLabel.toLowerCase()} kosong.`);
      return;
    }

    setStatus(`${sourceLabel} berhasil dibaca. Memproses...`);
    await processQrValue(value);
  };

  const startScan = async () => {
    const scannerModule = await getScannerModule();
    if (!scannerModule) {
      setStatus("Scanner kamera tidak tersedia di browser ini.");
      return;
    }
    if (running) return;

    setStatus("Memulai kamera...");
    try {
      const qr = new scannerModule.Html5Qrcode("reader");
      scannerRef.current = qr;
      const cameras = await scannerModule.Html5Qrcode.getCameras();
      const camId =
        cameras && cameras.length
          ? (cameras.find((camera) => /back|rear|environment/i.test(camera.label))?.id ?? cameras[0].id)
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
          await handleDecodedValue(decodedText, "QR kamera");
        },
        () => undefined,
      );
      setRunning(true);
      setStatus("Kamera aktif. Arahkan QR ke kotak.");
    } catch {
      scannerRef.current = null;
      setRunning(false);
      setStatus("Gagal memulai kamera. Cek permission.");
    }
  };

  const stopScan = async (silent = false) => {
    if (!scannerRef.current) {
      if (!silent) setStatus("Kamera belum berjalan");
      return;
    }
    try {
      if (running && typeof scannerRef.current.stop === "function") {
        await scannerRef.current.stop();
      }
      if (typeof scannerRef.current.clear === "function") {
        await scannerRef.current.clear();
      }
    } catch {
      // noop
    }
    scannerRef.current = null;
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

    if (running) await stopScan(true);

    setStatus("Mendecode gambar...");
    try {
      let decoded = await decodeQrFromImageFile(file);

      if (!decoded) {
        const scannerModule = await getScannerModule();
        if (scannerModule) {
          try {
            const fileScanner = new scannerModule.Html5Qrcode("reader");
            decoded = await fileScanner.scanFile(file, true);
            await fileScanner.clear().catch(() => undefined);
          } catch {
            // noop
          }
        }
      }

      if (!decoded) throw new Error("DECODE_FAILED");
      await handleDecodedValue(decoded, "File QR");
    } catch {
      setStatus("Gagal decode dari gambar. Upload QR asli dari kartu pasien atau gambar QR yang lebih jelas.");
    }
  };

  const submitManualProcess = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (processing) return;
    await processQrValue(qrInput);
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

              <form onSubmit={submitManualProcess} className="mt-4 border-t pt-4">
                <label htmlFor="qr_input" className="mb-1 block text-xs font-semibold text-gray-700">
                  Atau tempel token/URL QR
                </label>
                <input
                  type="text"
                  id="qr_input"
                  name="qr_input"
                  value={qrInput}
                  onChange={(event) => setQrInput(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Token atau URL scan pasien"
                />
                <button
                  type="submit"
                  disabled={processing}
                  className="mt-2 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {processing ? "Memproses..." : "Proses"}
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
    </DashboardLayout>
  );
}
