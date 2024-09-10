import "./globals.css";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { Noto_Sans_Khmer } from 'next/font/google';
import Banner from "@/app/components/Banners";
export const runtime = 'edge';
// Load the custom font
const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-notoSansKhmer',
});


// Root layout function wrapping children components
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSansKhmer.variable} font-sans`}>
    <body>
    <Navbar />
    <Banner />
    <main role="main">{children}</main>
    </body>
    </html>
  );
}
