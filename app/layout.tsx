import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Sphere",
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
        <NextTopLoader showSpinner={false} />
        {children}

        <Toaster />
      </body>
    </html>
  );
}
