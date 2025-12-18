// filepath: /Users/ricky/Workspace/git/001_Network/ny-gossip/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NY Gossip",
  description: "Spilling the tea in NYC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. 添加深色背景和白色文字到 body */}
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Header />
        {/* 2. 创建一个居中且有最大宽度的容器 */}
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}