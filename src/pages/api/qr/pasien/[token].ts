import fs from "fs/promises";
import path from "path";
import QRCode from "qrcode";
import type { NextApiRequest, NextApiResponse } from "next";
import { getApiUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildPatientScanUrl } from "@/lib/qr";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method tidak diizinkan." });
  }

  const viewer = await getApiUser(req);
  if (!viewer || !["pasien", "resepsionis", "dokter", "admin"].includes(viewer.role)) {
    return res.status(403).json({ error: "Tidak berwenang mengakses QR." });
  }

  const token = String(req.query.token ?? "");
  const pasien = await prisma.user.findFirst({
    where: { qrToken: token },
    select: { qrPath: true, qrToken: true },
  });

  if (!pasien?.qrToken) {
    return res.status(404).json({ error: "QR tidak valid." });
  }

  const candidates = new Set<string>();
  if (pasien.qrPath) {
    candidates.add(path.join(process.cwd(), "public", pasien.qrPath));
    candidates.add(path.join(process.cwd(), pasien.qrPath));
    candidates.add(path.join(process.cwd(), "..", "public", pasien.qrPath));
  }
  candidates.add(path.join(process.cwd(), "public", "patient_qr", `${pasien.qrToken}.png`));
  candidates.add(path.join(process.cwd(), "..", "public", "patient_qr", `${pasien.qrToken}.png`));

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      const file = await fs.readFile(candidate);
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.status(200).send(file);
    } catch {
      // try next
    }
  }

  const scanUrl = buildPatientScanUrl(pasien.qrToken, req.headers);
  const png = await QRCode.toBuffer(scanUrl, { type: "png", width: 250, margin: 1 });
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).send(png);
}
