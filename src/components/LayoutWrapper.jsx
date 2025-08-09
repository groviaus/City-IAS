"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/home/Header/page";
import Footer from "@/app/home/Footer/page";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
