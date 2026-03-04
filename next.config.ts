import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  onDemandEntries: {
    // Keep compiled pages in memory longer during development.
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 200,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/pembayaran/bukti/:id",
        destination: "/api/pembayaran/bukti/:id",
      },
      {
        source: "/ai/cs",
        destination: "/api/ai/cs",
      },
      {
        source: "/pasien/tagihan/upload/:id",
        destination: "/api/pasien/tagihan/upload/:id",
      },
      {
        source: "/qr/pasien/:token",
        destination: "/api/qr/pasien/:token",
      },
    ];
  },
};

export default nextConfig;
