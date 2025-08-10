"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "./components/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  // For the login page, render without the admin sidebar/layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset className="bg-gray-50 flex-1 min-h-screen overflow-auto">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
