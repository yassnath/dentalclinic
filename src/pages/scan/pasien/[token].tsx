import Head from "next/head";
import type { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate, formatDateTime } from "@/lib/format";

type ChainDetail = {
  chain_index: number;
  prev_hash: string | null;
  prev_expected: string | null;
  block_hash: string | null;
  ok: boolean;
};

type Props = {
  pasien: {
    id: string;
    name: string;
    no_rm: string | null;
    telepon: string | null;
    no_hp: string | null;
    alamat: string | null;
    qr_path: string | null;
    qr_token: string | null;
  };
  pendaftarans: Array<{
    id: string;
    created_at: string | null;
    keluhan: string;
    status: string;
  }>;
  rekamMedisList: Array<{
    id: string;
    created_at: string | null;
    dokter: string;
    diagnosa: string;
    tindakan: string;
    catatan: string | null;
  }>;
  chain: {
    available: boolean;
    valid: boolean | null;
    invalid_count: number;
    details: ChainDetail[];
  };
};

function shortHash(value: string | null) {
  if (!value) return "-";
  return value.length > 18 ? `${value.slice(0, 18)}...` : value;
}

function buildChainDetails(records: Array<{ chainIndex: number | null; prevHash: string | null; blockHash: string | null; createdAt: Date | null }>) {
  const ordered = [...records].sort((a, b) => {
    const ai = a.chainIndex ?? Number.MAX_SAFE_INTEGER;
    const bi = b.chainIndex ?? Number.MAX_SAFE_INTEGER;
    if (ai !== bi) return ai - bi;
    const at = a.createdAt ? a.createdAt.getTime() : 0;
    const bt = b.createdAt ? b.createdAt.getTime() : 0;
    return at - bt;
  });

  let expectedPrev: string | null = null;
  const details: ChainDetail[] = [];

  ordered.forEach((row, index) => {
    const storedPrev = row.prevHash ?? null;
    const isFirst = index === 0;
    const ok = isFirst
      ? storedPrev === null || storedPrev === "" || storedPrev === expectedPrev
      : (storedPrev ?? "") === (expectedPrev ?? "");

    details.push({
      chain_index: row.chainIndex ?? index + 1,
      prev_hash: storedPrev,
      prev_expected: expectedPrev,
      block_hash: row.blockHash ?? null,
      ok,
    });

    expectedPrev = row.blockHash ?? null;
  });

  const invalidCount = details.filter((detail) => !detail.ok).length;
  return {
    available: details.length > 0,
    valid: details.length > 0 ? invalidCount === 0 : null,
    invalid_count: invalidCount,
    details,
  };
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const token = String(ctx.params?.token ?? "");
  const pasien = await prisma.user.findFirst({
    where: { qrToken: token },
  });

  if (!pasien) {
    return { notFound: true };
  }

  const [pendaftarans, rekamMedis] = await Promise.all([
    prisma.pendaftaran.findMany({
      where: { userId: pasien.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.rekamMedis.findMany({
      where: {
        pendaftaran: {
          userId: pasien.id,
        },
      },
      include: {
        dokter: true,
        pendaftaran: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const chain = buildChainDetails(
    rekamMedis.map((item) => ({
      chainIndex: item.chainIndex ?? null,
      prevHash: item.prevHash ?? null,
      blockHash: item.blockHash ?? null,
      createdAt: item.createdAt ?? null,
    })),
  );

  return {
    props: {
      pasien: {
        id: pasien.id.toString(),
        name: pasien.name,
        no_rm: pasien.noRm,
        telepon: pasien.telepon,
        no_hp: pasien.noHp,
        alamat: pasien.alamat,
        qr_path: pasien.qrPath,
        qr_token: pasien.qrToken,
      },
      pendaftarans: pendaftarans.map((item) => ({
        id: item.id.toString(),
        created_at: item.createdAt ? item.createdAt.toISOString() : null,
        keluhan: item.keluhan ?? "-",
        status: item.status ?? "-",
      })),
      rekamMedisList: rekamMedis.map((item) => ({
        id: item.id.toString(),
        created_at: item.createdAt ? item.createdAt.toISOString() : null,
        dokter: item.dokter?.name ?? "Tidak diketahui",
        diagnosa: item.diagnosa ?? "-",
        tindakan: item.tindakan ?? "-",
        catatan: item.catatan,
      })),
      chain,
    },
  };
};

export default function ScanPasienPage({ pasien, pendaftarans, rekamMedisList, chain }: Props) {
  const qrSrc = pasien.qr_path ? `/${pasien.qr_path.replace(/^\/+/, "")}` : pasien.qr_token ? `/patient_qr/${pasien.qr_token}.png` : null;

  return (
    <>
      <Head>
        <title>Scan Pasien</title>
      </Head>
      <main className="mx-auto max-w-3xl p-6">
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl" id="kartu-pasien">
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
              <div className="font-semibold">{pasien.name}</div>

              <div className="mt-2 text-xs text-gray-500">No. RM</div>
              <div className="font-semibold tracking-wide">{pasien.no_rm ?? "-"}</div>

              <div className="mt-2 text-xs text-gray-500">No. HP</div>
              <div className="font-semibold">{pasien.telepon ?? pasien.no_hp ?? "-"}</div>

              <div className="mt-2 text-xs text-gray-500">Alamat</div>
              <div className="font-semibold">{pasien.alamat ?? "-"}</div>
            </div>

            <div className="flex items-center justify-center">{qrSrc ? <img src={qrSrc} alt="QR Pasien" className="h-32 w-32" /> : null}</div>
          </div>

          <div className="no-print mt-6 flex items-center justify-between">
            {qrSrc ? (
              <a href={qrSrc} download className="text-sm text-blue-600 underline">
                Unduh QR
              </a>
            ) : (
              <span className="text-sm text-gray-400">QR belum tersedia</span>
            )}
            <button onClick={() => window.print()} className="rounded bg-blue-600 px-3 py-1 text-sm text-white">
              Cetak
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Data Pasien</h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-1">
              <div>
                <span className="text-sm text-gray-500">Nama:</span> <strong>{pasien.name}</strong>
              </div>
              <div>
                <span className="text-sm text-gray-500">No. RM:</span> <strong>{pasien.no_rm ?? "-"}</strong>
              </div>
              <div>
                <span className="text-sm text-gray-500">Telepon:</span> <strong>{pasien.telepon ?? pasien.no_hp ?? "-"}</strong>
              </div>
              <div>
                <span className="text-sm text-gray-500">Alamat:</span> <strong>{pasien.alamat ?? "-"}</strong>
              </div>
            </div>
            <div className="text-right">{qrSrc ? <img src={qrSrc} className="inline-block h-28 w-28" alt="QR" /> : null}</div>
          </div>

          <hr className="my-6" />

          <h3 className="mb-2 font-semibold">Riwayat / Daftar Pendaftaran</h3>
          <div className="overflow-x-auto">
            <table className="responsive-table min-w-full text-sm theme-table">
              <thead>
                <tr className="text-center text-gray-500">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Keluhan</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendaftarans.length ? (
                  pendaftarans.map((row) => (
                    <tr key={row.id} className="border-t text-center">
                      <td data-label="Tanggal" className="py-2">
                        {row.created_at ? formatDateTime(new Date(row.created_at), "dd/MM/yyyy HH:mm") : "-"}
                      </td>
                      <td data-label="Keluhan" className="whitespace-nowrap py-2">
                        {row.keluhan.length > 40 ? `${row.keluhan.slice(0, 40)}...` : row.keluhan}
                      </td>
                      <td data-label="Status" className="py-2 capitalize">
                        {row.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-3 text-gray-500">
                      Belum ada pendaftaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <hr className="my-6" />

          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold">Rekam Medis Pasien</h3>
            {chain.available ? (
              chain.valid === true ? (
                <span className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs text-green-700">
                  Valid (Blockchain)
                </span>
              ) : chain.valid === false ? (
                <span className="rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs text-red-700">
                  Tidak Valid ({chain.invalid_count} bermasalah)
                </span>
              ) : (
                <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  Belum tersedia
                </span>
              )
            ) : (
              <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-700">
                Blockchain belum diaktifkan
              </span>
            )}
          </div>

          {chain.available && chain.details.length ? (
            <details className="mb-3">
              <summary className="cursor-pointer text-sm text-blue-700">Lihat detail integritas blockchain</summary>
              <div className="mt-2 overflow-x-auto">
                <table className="responsive-table min-w-full text-xs text-center theme-table">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="py-2">#</th>
                      <th className="py-2">Prev Hash (stored)</th>
                      <th className="py-2">Prev Hash (expected)</th>
                      <th className="py-2">Block Hash (stored)</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chain.details.map((detail) => (
                      <tr key={`${detail.chain_index}-${detail.block_hash ?? "none"}`} className="border-t">
                        <td data-label="#" className="py-2">
                          {detail.chain_index}
                        </td>
                        <td data-label="Prev Hash (stored)" className="py-2">
                          <code>{shortHash(detail.prev_hash)}</code>
                        </td>
                        <td data-label="Prev Hash (expected)" className="py-2">
                          <code>{shortHash(detail.prev_expected)}</code>
                        </td>
                        <td data-label="Block Hash (stored)" className="py-2">
                          <code>{shortHash(detail.block_hash)}</code>
                        </td>
                        <td data-label="Status" className="py-2">
                          {detail.ok ? (
                            <span className="rounded border border-green-200 bg-green-100 px-2 py-1 text-green-700">OK</span>
                          ) : (
                            <span className="rounded border border-red-200 bg-red-100 px-2 py-1 text-red-700">ERROR</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ) : null}

          <div className="overflow-x-auto">
            <table className="responsive-table min-w-full text-center text-sm theme-table">
              <thead>
                <tr className="text-center text-gray-500">
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Dokter</th>
                  <th className="py-2">Diagnosa</th>
                  <th className="py-2">Tindakan</th>
                  <th className="py-2">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {rekamMedisList.length ? (
                  rekamMedisList.map((rekam) => (
                    <tr key={rekam.id} className="border-t">
                      <td data-label="Tanggal" className="py-2">
                        {rekam.created_at ? formatDate(new Date(rekam.created_at), "dd/MM/yyyy") : "-"}
                      </td>
                      <td data-label="Dokter" className="py-2">
                        {rekam.dokter}
                      </td>
                      <td data-label="Diagnosa" className="py-2">
                        {rekam.diagnosa}
                      </td>
                      <td data-label="Tindakan" className="py-2">
                        {rekam.tindakan}
                      </td>
                      <td data-label="Catatan" className="py-2">
                        {rekam.catatan ?? "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-3 text-gray-500">
                      Belum ada rekam medis.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
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
