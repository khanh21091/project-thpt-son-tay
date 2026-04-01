import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khảo sát kiến thức vào lớp 10 – 2026",
  description: "Landing page chương trình khảo sát kiến thức vào lớp 10 – năm 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

