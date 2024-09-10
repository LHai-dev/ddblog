import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";
import { Noto_Sans_Khmer } from 'next/font/google';
import Banner from "@/components/Banners";
import siteMetaData from "@/lib/siteMetaData";
export const runtime = 'edge';
// Load the custom font
const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-notoSansKhmer',
});

// Define the metadata for SEO and social sharing
export const metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: {
    template: `%s | ${siteMetaData.title}`, // Dynamic title
    default: siteMetaData.title, // Default title when no template
  },
  description: siteMetaData.description, // Default description
  openGraph: {
    title: siteMetaData.title,
    description: siteMetaData.description,
    url: siteMetaData.siteUrl,
    siteName: siteMetaData.title,
    images: [
      {
        url: siteMetaData.socialBanner,
        width: 1200, // Specify image dimensions
        height: 630,
        alt: "Banner image for social sharing", // Provide an alt for accessibility
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetaData.title,
    description: siteMetaData.description,
    images: [siteMetaData.socialBanner],
  },
  robots: {
    index: true, // Ensure search engines index the page
    follow: true, // Allow following links
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true, // Prevent image indexing
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteMetaData.siteUrl, // Canonical URL for SEO
  },
};
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
