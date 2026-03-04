import fs from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { getApiUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function guessMime(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method tidak diizinkan." });
  }

  const user = await getApiUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const id = BigInt(String(req.query.id ?? "0"));
  const pembayaran = await prisma.pembayaran.findUnique({
    where: { id },
  });
  if (!pembayaran?.buktiPembayaran) {
    return res.status(404).json({ error: "Bukti tidak ditemukan." });
  }

  if (user.role !== "admin" && pembayaran.userId !== user.id) {
    return res.status(403).json({ error: "Forbidden." });
  }

  const raw = String(pembayaran.buktiPembayaran).replace(/^https?:\/\/[^/]+\//, "").replace(/^\/+/, "");
  const safeRaw = raw.replace(/\\/g, "/").replace(/\.\./g, "");
  const fileName = path.basename(safeRaw);
  const base = process.cwd();
  const projectRoot = path.resolve(base, "..");
  const absoluteCandidates = [
    path.join(base, safeRaw),
    path.join(base, "storage", safeRaw),
    path.join(base, "public", safeRaw),
    path.join(base, "private", "bukti_pembayaran", fileName),
    path.join(base, "uploads", "bukti", fileName),
    path.join(base, "uploads", "bukti_pembayaran", fileName),
    path.join(base, "storage", "app", safeRaw),
    path.join(base, "storage", "app", "private", "bukti_pembayaran", fileName),
    path.join(projectRoot, "storage", "app", safeRaw),
    path.join(projectRoot, "storage", "app", "private", "bukti_pembayaran", fileName),
    path.join(projectRoot, "public", safeRaw),
    path.join(projectRoot, "public", "uploads", "bukti", fileName),
    path.join(projectRoot, "public", "uploads", "bukti_pembayaran", fileName),
  ];

  for (const absolute of absoluteCandidates) {
    try {
      await fs.access(absolute);
      const file = await fs.readFile(absolute);
      res.setHeader("Content-Type", guessMime(absolute));
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
      res.setHeader("Pragma", "no-cache");
      return res.status(200).send(file);
    } catch {
      // continue
    }
  }

  return res.status(404).json({ error: "Bukti tidak ditemukan." });
}
