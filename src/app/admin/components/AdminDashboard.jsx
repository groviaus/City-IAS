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
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalCourses: 0,
    totalImportantDates: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    // Fetch dashboard stats
    fetchDashboardStats();
    fetchRecentApplications();
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default AdminDashboard;
