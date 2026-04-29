import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stromann Việt Nam — Phụ gia hiệu suất cao",
  description:
    "Phụ gia hiệu suất cao cho ngành sơn, mực in và nhựa. Đối tác chiến lược của MÜNZING (Đức) tại Việt Nam.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
