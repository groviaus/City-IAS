"use client";

import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "./components/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  // For the login page, render without the admin sidebar/layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Client-side guard as a safety net in case middleware is bypassed by caching/CDN
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/auth/session", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { authenticated: false }))
      .then((d) => {
        if (!mounted) return;
        setIsAuthed(!!d.authenticated);
        setAuthChecked(true);
        if (!d.authenticated) {
          const next = encodeURIComponent(pathname || "/admin");
          window.location.replace(`/admin/login?next=${next}`);
        }
      })
      .catch(() => {
        if (!mounted) return;
        setAuthChecked(true);
        const next = encodeURIComponent(pathname || "/admin");
        window.location.replace(`/admin/login?next=${next}`);
      });
    return () => {
      mounted = false;
    };
  }, [pathname]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access…</p>
        </div>
      </div>
    );
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
