// app/layout.tsx (RootLayout)
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { Noto_Sans_Khmer } from 'next/font/google';
import Banner from "@/app/components/Banners";
// import siteMetadata from "@/app/lib/siteMetaData"; // Consistent import

export const runtime = "edge";

// Load custom font
const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-notoSansKhmer',
});

// export const metadata = {
//   metadataBase: new URL(siteMetadata.siteUrl),
//   title: {
//     template: `%s | ${siteMetadata.title}`,
//     default: siteMetadata.title,
//   },
//   description: siteMetadata.description,
//   openGraph: {
//     title: siteMetadata.title,
//     description: siteMetadata.description,
//     url: siteMetadata.siteUrl,
//     siteName: siteMetadata.title,
//     images: [siteMetadata.socialBanner],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: siteMetadata.title,
//     images: [siteMetadata.socialBanner],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       noimageindex: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   alternates: {
//     canonical: siteMetadata.siteUrl,
//   },
// };

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
