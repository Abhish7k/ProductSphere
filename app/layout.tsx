import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Hunt",
  description: "The best new products in tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
