"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  BookOpen,
  GraduationCap,
  Building2,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin",
      isActive: pathname === "/admin",
    },
    {
      title: "Courses",
      icon: BookOpen,
      href: "/admin/courses",
      isActive: pathname === "/admin/courses",
    },
    {
      title: "Applications",
      icon: GraduationCap,
      href: "/admin/applications",
      isActive: pathname.startsWith("/admin/applications"),
    },
    {
      title: "Important Dates",
      icon: Calendar,
      href: "/admin/important-dates",
      isActive: pathname.startsWith("/admin/important-dates"),
    },
    {
      title: "Urgency Banner",
      icon: Clock,
      href: "/admin/urgency-banner",
      isActive: pathname.startsWith("/admin/urgency-banner"),
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3 px-4 py-4">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              City IAS Academy
            </h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={item.isActive}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
