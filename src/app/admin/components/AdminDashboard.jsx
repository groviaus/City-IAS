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
    totalUrgencyBanners: 0, // Added for Urgency Banner
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
        setStats(data);
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
      title: "Total Applications",
      value: stats.totalApplications,
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/applications",
    },
    {
      title: "Active Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/courses",
    },
    {
      title: "Important Dates",
      value: stats.totalImportantDates,
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      href: "/admin/important-dates",
    },
    {
      title: "Urgency Banner",
      value: urgencyBannerData ? 1 : 0,
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/admin/urgency-banner",
    },
  ];

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/applications">
              <GraduationCap className="h-4 w-4 mr-2" />
              View Applications
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
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
                  View Details →
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Recent Applications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentApplications.length > 0 ? (
            <div className="space-y-3">
              {recentApplications.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-600">
                      {app.course} • {app.city_state}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{app.created_at}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/applications/${app.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No applications yet</p>
              <p className="text-sm">
                Applications will appear here once students start applying
              </p>
            </div>
          )}
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/admin/applications">View All Applications</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Urgency Banner Status */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Urgency Banner Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Banner Data Card - Minimal Display */}
          {loadingUrgencyBanner ? (
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <div className="text-center py-4">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-gray-400 animate-spin" />
                  <div className="text-sm text-gray-500">
                    Loading banner data...
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : urgencyBannerData ? (
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Available Seats */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {urgencyBannerData.available_seats || "0"}
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      Available Seats
                    </div>
                  </div>

                  {/* Batch Start Date */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">
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
                    <div className="text-sm text-gray-600">
                      Batch Start Date
                    </div>
                  </div>

                  {/* Days Left */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {countdownData.days > 0 ? countdownData.days : "0"}
                    </div>
                    <div className="text-sm text-orange-600 font-medium">
                      Days Left
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <div className="text-center py-4">
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm text-gray-500">
                    No active urgency banner
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/admin/urgency-banner">
                <Clock className="h-4 w-4 mr-2" />
                Manage Urgency Banner
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/applications">
                <GraduationCap className="h-4 w-4 mr-2" />
                View Applications
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Manage Courses
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
