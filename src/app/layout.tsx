"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import "../styles/ursine-theme.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className="bg-[#FCFCFC] dark:bg-black">
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}

import { Providers } from "./providers";