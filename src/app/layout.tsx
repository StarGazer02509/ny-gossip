// filepath: /Users/ricky/Workspace/git/001_Network/ny-gossip/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "健身动物园",
  description: "Welcome to the Zoo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black min-h-screen flex items-center justify-center`}>
        <main>{children}</main>
      </body>
    </html>
  );
}