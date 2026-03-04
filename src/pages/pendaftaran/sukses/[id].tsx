import type { GetServerSideProps } from "next";
import DashboardLayout from "@/components/DashboardLayout";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSessionUser, type SessionUser } from "@/lib/user-props";

type Props = {
  user: SessionUser;
  pendaftaran: {
    nama: string;
    kode_antrian: string | null;
    status: string;
    qr_path: string | null;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = await requireAuth(ctx, { roles: ["pasien"] });
  if ("redirect" in auth) return auth;

  const idParam = ctx.params?.id;
  const id = BigInt(Array.isArray(idParam) ? idParam[0] : idParam ?? "0");
  const pendaftaran = await prisma.pendaftaran.findFirst({
    where: {
      id,
      userId: auth.user.id,
    },
  });

  if (!pendaftaran) {
    return {
      redirect: {
        destination: "/pendaftaran-saya",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: toSessionUser(auth.user),
      pendaftaran: {
        nama: pendaftaran.nama,
        kode_antrian: pendaftaran.kodeAntrian,
        status: pendaftaran.status,
        qr_path: pendaftaran.qrPath,
      },
    },
  };
};

export default function PendaftaranSuksesPage({ user, pendaftaran }: Props) {
  const qrSrc = pendaftaran.qr_path ? `/${pendaftaran.qr_path.replace(/^\/+/, "")}` : null;

  return (
    <DashboardLayout user={user}>
      <div className="mx-auto max-w-xl p-6">
        <div className="rounded-xl bg-white p-6 text-center shadow">
          <h2 className="mb-2 text-2xl font-bold text-blue-800">Pendaftaran Berhasil</h2>
          <p className="text-gray-600">Tunjukkan QR Code ini ke resepsionis saat tiba.</p>

          <div className="mt-6">
            <div className="text-sm text-gray-500">Nomor Antrian</div>
            <div className="text-4xl font-extrabold tracking-widest">{pendaftaran.kode_antrian ?? "-"}</div>
          </div>

          {qrSrc ? (
            <div className="mt-6 flex justify-center">
              <img src={qrSrc} alt="QR Code" className="h-56 w-56" />
            </div>
          ) : null}

          <div className="mt-4 text-sm text-gray-500">
            Nama: <span className="font-medium">{pendaftaran.nama}</span>
            <br />
            Status: <span className="font-medium capitalize">{pendaftaran.status}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
