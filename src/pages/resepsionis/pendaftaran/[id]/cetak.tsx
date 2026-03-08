import Head from "next/head";
import type { GetServerSideProps } from "next";
import PatientIdentityCard from "@/components/PatientIdentityCard";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPatientQrUrl } from "@/lib/qr";

type Props = {
  nama: string;
  no_rm: string;
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
  if (user?.qrToken) {
    const apiQr = getPatientQrUrl(user.qrToken);
    if (apiQr) qrCandidates.add(apiQr);
  }
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
      qrCandidates: Array.from(qrCandidates),
    },
  };
};

export default function CetakKartuPage({ nama, no_rm, qrCandidates }: Props) {
  return (
    <>
      <Head>
        <title>Kartu Pasien</title>
      </Head>

      <main className="flex min-h-screen flex-col bg-blue-50 p-6">
        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto w-full max-w-2xl">
            <PatientIdentityCard
              name={nama}
              noRm={no_rm}
              qrCandidates={qrCandidates}
              downloadName={`qr-pasien-${no_rm || "pasien"}.png`}
              onPrint={() => window.print()}
            />
          </div>
        </div>

        <footer className="no-print pt-4 text-center text-sm" style={{ color: "var(--text-55)" }}>
          <span className="copyright-hover">&copy; 2026 Solvix Studio</span>. All rights reserved.
        </footer>
      </main>
    </>
  );
}
