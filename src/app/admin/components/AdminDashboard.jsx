"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Plus,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
// Removed UrgencyBanner import since we're displaying data directly

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalCourses: 0,
    totalImportantDates: 0,
    totalUrgencyBanners: 0,
    totalGalleryImages: 0,
    lastUpdated: {
      applications: null,
      courses: null,
      importantDates: null,
      urgencyBanner: null,
      gallery: null,
    },
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [urgencyBannerData, setUrgencyBannerData] = useState(null);
  const [loadingUrgencyBanner, setLoadingUrgencyBanner] = useState(true);
  const [countdownData, setCountdownData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    fetchDashboardStats();
    fetchRecentApplications();
    fetchUrgencyBannerData();
  }, []);

  // Update countdown every minute when banner data is available
  useEffect(() => {
    if (urgencyBannerData) {
      calculateCountdown();
      const interval = setInterval(calculateCountdown, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [urgencyBannerData]);

  // Manual trigger to calculate countdown when component mounts
  useEffect(() => {
    if (urgencyBannerData && !loadingUrgencyBanner) {
      calculateCountdown();
    }
  }, [urgencyBannerData, loadingUrgencyBanner]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentApplications = async () => {
    try {
      const response = await fetch("/api/admin/recent-applications");
      if (response.ok) {
        const data = await response.json();
        setRecentApplications(data.applications || []);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchUrgencyBannerData = async () => {
    try {
      setLoadingUrgencyBanner(true);
      const response = await fetch("/api/urgency-banner");
      if (response.ok) {
        const data = await response.json();
        if (data.item) {
          setUrgencyBannerData(data.item);
        }
      }
    } catch (error) {
      console.error("Error fetching urgency banner data:", error);
    } finally {
      setLoadingUrgencyBanner(false);
    }
  };

  const calculateCountdown = () => {
    if (!urgencyBannerData?.batch_start_date) {
      return;
    }

    const cleanDateString = urgencyBannerData.batch_start_date.split("T")[0];
    const batchStartDate = new Date(cleanDateString + "T00:00:00");
    const now = new Date();

    const timeDifference = batchStartDate.getTime() - now.getTime();

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      setCountdownData({ days, hours, minutes });
    } else {
      setCountdownData({ days: 0, hours: 0, minutes: 0 });
    }
  };

  const statCards = [
    {
      key: "applications",
      title: "Applications",
      value: stats.totalApplications,
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/applications",
      updatedAt: stats.lastUpdated?.applications,
    },
    {
      key: "courses",
      title: "Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/courses",
      updatedAt: stats.lastUpdated?.courses,
    },
    {
      key: "importantDates",
      title: "Important Dates",
      value: stats.totalImportantDates,
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      href: "/admin/important-dates",
      updatedAt: stats.lastUpdated?.importantDates,
    },
    {
      key: "gallery",
      title: "Gallery Images",
      value: stats.totalGalleryImages,
      icon: ImagePlaceholder,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/admin/gallery",
      updatedAt: stats.lastUpdated?.gallery,
    },
    {
      key: "urgencyBanner",
      title: "Urgency Banner",
      value: urgencyBannerData ? 1 : 0,
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/admin/urgency-banner",
      updatedAt: stats.lastUpdated?.urgencyBanner,
    },
  ];

  function ImagePlaceholder(props) {
    // minimalist square placeholder icon
    return (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 13l3-3 5 5" />
        <circle cx="8.5" cy="8.5" r="1.5" />
      </svg>
    );
  }

  const formatUpdated = (ts) => {
    if (!ts) return "No data";
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return String(ts);
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
          <p className="text-gray-600 mt-1">
            A quick summary across all sections.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              New Course
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/applications">
              <GraduationCap className="h-4 w-4 mr-2" />
              Applications
            </Link>
          </Button>
        </div>
      </div>

      {/* Compact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.key} className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                Updated {formatUpdated(stat.updatedAt)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="mt-2 p-0 h-auto"
              >
                <Link
                  href={stat.href}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Open →
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column: Activity & Urgency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4" /> Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentApplications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentApplications.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {app.name}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {app.course} • {app.city_state}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 hidden sm:block">
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/applications/${app.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <GraduationCap className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No applications yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Urgency Banner Snapshot */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-red-600" /> Urgency Banner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loadingUrgencyBanner ? (
              <div className="text-center py-6 text-gray-500">
                <Clock className="h-5 w-5 mx-auto mb-2 animate-spin text-gray-400" />
                Loading banner data...
              </div>
            ) : urgencyBannerData ? (
              <div className="space-y-4">
                {/* Top: Batch Date */}
                <div className="text-center">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500">
                    Batch Date
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {urgencyBannerData.batch_start_date
                      ? new Date(
                          urgencyBannerData.batch_start_date.split("T")[0]
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Not set"}
                  </div>
                </div>

                {/* Middle: Equal summary tiles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center rounded-md bg-red-50 py-3">
                    <div className="text-2xl font-bold text-red-600">
                      {urgencyBannerData.available_seats || "0"}
                    </div>
                    <div className="text-xs font-medium text-red-700">
                      Seats
                    </div>
                  </div>
                  <div className="text-center rounded-md bg-orange-50 py-3">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.max(0, countdownData.days)}
                    </div>
                    <div className="text-xs font-medium text-orange-700">
                      Days Left
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <AlertTriangle className="h-5 w-5 mx-auto mb-2 text-gray-400" />
                No active urgency banner
              </div>
            )}

            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/urgency-banner">
                    <Clock className="h-4 w-4 mr-2" /> Manage Banner
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
