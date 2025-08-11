import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "文化記憶庫",
  description: "踏上一段穿越時空的文化旅程，發現各民族獨特的傳統、藝術與智慧",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body style={{ 
          fontFamily: '"TaipeiSansTCBetaBold", "TaipeiSansTCBeta-Bold-TC UI", "PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", sans-serif',
        }}>
        {children}
      </body>
    </html>
  );
}