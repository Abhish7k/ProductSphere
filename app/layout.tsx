import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader color="#FF6154" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
