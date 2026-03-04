import Head from "next/head";
import type { GetServerSideProps } from "next";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  nama: string;
  no_rm: string;
  no_hp: string;
  alamat: string;
  qrCandidates: string[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["resepsionis"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const pendaftaran = await prisma.pendaftaran.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!pendaftaran) {
    return {
      redirect: {
        destination: "/resepsionis/pendaftaran",
        permanent: false,
      },
    };
  }

  const user = pendaftaran.user;
  const qrCandidates = new Set<string>();
  if (user?.qrPath) {
    qrCandidates.add(`/${user.qrPath.replace(/^\/+/, "")}`);
    qrCandidates.add(`/storage/${user.qrPath.replace(/^\/+/, "")}`);
  }
  if (user?.qrToken) {
    qrCandidates.add(`/patient_qr/${user.qrToken}.png`);
    qrCandidates.add(`/qr/pasien/${encodeURIComponent(user.qrToken)}`);
  }

  return {
    props: {
      nama: pendaftaran.nama || user?.name || "-",
      no_rm: user?.noRm ?? "-",
      no_hp: user?.telepon ?? user?.noHp ?? pendaftaran.noHp ?? "-",
      alamat: user?.alamat ?? "-",
      qrCandidates: Array.from(qrCandidates),
    },
  };
};

export default function CetakKartuPage({ nama, no_rm, no_hp, alamat, qrCandidates }: Props) {
  const initialQr = qrCandidates[0] ?? "";

  return (
    <>
      <Head>
        <title>Kartu Pasien</title>
      </Head>

      <main className="flex min-h-screen flex-col bg-blue-50 p-6">
        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto w-full max-w-lg">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl" id="kartu-pasien">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-blue-700">Kartu Pasien</h2>
                  <div className="text-sm text-gray-500">Tunjukkan ke resepsionis/dokter</div>
                </div>
                <img src="/images/logo2.png" className="h-10" alt="Logo" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <div className="text-xs text-gray-500">Nama</div>
                  <div className="font-semibold">{nama}</div>

                  <div className="mt-2 text-xs text-gray-500">No. RM</div>
                  <div className="font-semibold tracking-wide">{no_rm}</div>

                  <div className="mt-2 text-xs text-gray-500">No. HP</div>
                  <div className="font-semibold">{no_hp}</div>

                  <div className="mt-2 text-xs text-gray-500">Alamat</div>
                  <div className="font-semibold">{alamat}</div>
                </div>

                <div className="flex items-center justify-center">
                  {initialQr ? (
                    <img
                      src={initialQr}
                      alt="QR Pasien"
                      className="h-32 w-32"
                      onError={(event) => {
                        const img = event.currentTarget;
                        const current = img.getAttribute("data-idx");
                        const idx = current ? Number(current) : 0;
                        const next = qrCandidates[idx + 1];
                        if (next) {
                          img.setAttribute("data-idx", String(idx + 1));
                          img.src = next;
                        }
                      }}
                      data-idx="0"
                    />
                  ) : null}
                </div>
              </div>

              <div className="no-print mt-6 flex items-center justify-between">
                {initialQr ? (
                  <a href={initialQr} download className="text-sm text-blue-600 underline">
                    Unduh QR
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">QR belum tersedia</span>
                )}

                <button type="button" onClick={() => window.print()} className="rounded bg-blue-600 px-3 py-1 text-sm text-white">
                  Cetak
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="no-print pt-4 text-center text-sm" style={{ color: "var(--text-55)" }}>
          <span className="copyright-hover">&copy; 2026 Solvix Studio</span>. All rights reserved.
        </footer>
      </main>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }

          #kartu-pasien,
          #kartu-pasien * {
            visibility: visible !important;
          }

          #kartu-pasien {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0 !important;
            border: 1px solid var(--light-border) !important;
            box-shadow: none !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
