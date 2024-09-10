// app/layout.tsx
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { Noto_Sans_Khmer } from 'next/font/google';
import Banner from "@/app/components/Banners";
import siteMetadata from "@/app/lib/siteMetaData"; // Consistent import
export const runtime = 'edge';
// Load the custom font
const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ['latin'],
  display: 'swap', // Improves rendering behavior
  variable: '--font-notoSansKhmer', // Custom CSS variable for the font
});

// Define the metadata for SEO and social sharing
export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`, // Dynamic title
    default: siteMetadata.title, // Default title when no template
  },
  description: siteMetadata.description, // Default description
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
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
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
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
    canonical: siteMetadata.siteUrl, // Canonical URL for SEO
  },
};

// Root layout function wrapping children components
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSansKhmer.variable} font-sans`}>
    <body>
    <Navbar /> {/* Navbar component */}
    <Banner /> {/* Banner component */}
    <main role="main">{children}</main> {/* Main content area */}
    </body>
    </html>
  );
}
