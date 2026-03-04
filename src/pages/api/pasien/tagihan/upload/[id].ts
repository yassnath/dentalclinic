import fs from "fs/promises";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { getApiUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseMultipart(req: NextApiRequest) {
  const form = formidable({
    multiples: false,
    maxFileSize: 2 * 1024 * 1024,
    keepExtensions: true,
  });
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method tidak diizinkan." });
  }

  const user = await getApiUser(req);
  if (!user || user.role !== "pasien") {
    return res.redirect(302, "/login");
  }

  const id = BigInt(String(req.query.id ?? "0"));
  const pembayaran = await prisma.pembayaran.findFirst({
    where: { id, userId: user.id },
  });
  if (!pembayaran) {
    return res.redirect(302, "/pasien/tagihan?error=Data%20tagihan%20tidak%20ditemukan.");
  }

  try {
    const { files } = await parseMultipart(req);
    const fileInput = files.bukti_pembayaran;
    const file = Array.isArray(fileInput) ? fileInput[0] : fileInput;
    if (!file?.filepath) {
      return res.redirect(302, "/pasien/tagihan?error=File%20bukti%20wajib%20dipilih.");
    }

    const ext = path.extname(file.originalFilename ?? file.newFilename ?? ".png") || ".png";
    const targetDir = path.join(process.cwd(), "..", "storage", "app", "private", "bukti_pembayaran");
    await fs.mkdir(targetDir, { recursive: true });
    const targetName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    const targetPath = path.join(targetDir, targetName);
    await fs.copyFile(file.filepath, targetPath);
    await fs.unlink(file.filepath).catch(() => undefined);

    await prisma.pembayaran.update({
      where: { id: pembayaran.id },
      data: {
        buktiPembayaran: `private/bukti_pembayaran/${targetName}`,
        status: "menunggu konfirmasi",
      },
    });

    return res.redirect(302, "/pasien/tagihan?success=Bukti%20pembayaran%20berhasil%20diupload.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal upload bukti.";
    return res.redirect(302, `/pasien/tagihan?error=${encodeURIComponent(message)}`);
  }
}
