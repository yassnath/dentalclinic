import { prisma } from "@/lib/prisma";

export async function countForDoctorOnDate(dokterId: bigint, dateYmd: string) {
  const start = new Date(`${dateYmd}T00:00:00`);
  const end = new Date(`${dateYmd}T23:59:59`);
  return prisma.pendaftaran.count({
    where: {
      dokterId,
      tanggalKunjungan: {
        gte: start,
        lte: end,
      },
      NOT: {
        status: "ditolak",
      },
    },
  });
}

export async function generateQueueForDoctorAndDate(dokterId: bigint, dateYmd: string) {
  const doctor = await prisma.user.findUnique({ where: { id: dokterId } });
  const prefix = doctor?.name?.trim()?.[0]?.toUpperCase() ?? "A";

  const start = new Date(`${dateYmd}T00:00:00`);
  const end = new Date(`${dateYmd}T23:59:59`);

  const last = await prisma.pendaftaran.aggregate({
    where: {
      dokterId,
      tanggalKunjungan: {
        gte: start,
        lte: end,
      },
    },
    _max: {
      nomorUrut: true,
    },
  });

  const next = Number(last._max.nomorUrut ?? 0) + 1;
  const code = `${prefix}-${String(next).padStart(3, "0")}`;
  return { nomor: next, kode: code };
}
