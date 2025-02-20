"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banners";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/drink"; // Adjust this based on actual path

  return (
    <>
      {!hideLayout && <Navbar />}
      {!hideLayout && <Banner />}
      <main role="main">{children}</main>
    </>
  );
}
