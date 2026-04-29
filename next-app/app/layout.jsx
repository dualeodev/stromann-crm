import "./styles/tokens.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Stromann Việt Nam — Phụ gia hiệu suất cao",
  description:
    "Phụ gia hiệu suất cao cho ngành sơn, mực in và nhựa. Đối tác chiến lược của MÜNZING (Đức) tại Việt Nam.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
