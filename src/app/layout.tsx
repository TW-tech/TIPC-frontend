import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: "文化影響力平台",
  description: "因為我們擁有共同的文化記憶，所以我們成為一家人。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}