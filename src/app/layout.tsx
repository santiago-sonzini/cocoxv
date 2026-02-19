import Providers from "@/components/layout/providers";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <NextTopLoader />
      <Providers>
      <body>{children}</body>

      </Providers>
    </html>
  );
}
