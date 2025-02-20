import "./globals.css";
import { Noto_Sans_Khmer } from "next/font/google";
import siteMetaData from "@/lib/siteMetaData";
import LayoutWrapper from "@/components/LayoutWrapper"; // Import the wrapper

export const runtime = "edge";

// Load the custom font
const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-notoSansKhmer",
});

// Define metadata for SEO
export const metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  title: {
    template: `%s | ${siteMetaData.title}`,
    default: siteMetaData.title,
  },
  description: siteMetaData.description,
  openGraph: {
    title: siteMetaData.title,
    description: siteMetaData.description,
    url: siteMetaData.siteUrl,
    siteName: siteMetaData.title,
    images: [
      {
        url: siteMetaData.socialBanner,
        width: 1200,
        height: 630,
        alt: "Banner image for social sharing",
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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteMetaData.siteUrl,
  },
};

// Root layout function
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSansKhmer.variable} font-sans`}>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
