"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const ViewCourse = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data.course);
      } else {
        alert("Failed to fetch course data");
        router.push("/admin/courses");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("Error fetching course data");
      router.push("/admin/courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone."
      )
    ) {
      try {
        setDeleting(true);
        const response = await fetch(`/api/admin/courses/${courseId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push("/admin/courses");
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Error deleting course. Please try again.");
      } finally {
        setDeleting(false);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "Active" },
      inactive: { color: "bg-gray-100 text-gray-800", text: "Inactive" },
      draft: { color: "bg-yellow-100 text-yellow-800", text: "Draft" },
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Course not found
          </h3>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/admin/courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 h-max">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Details</h1>
            <p className="text-gray-600 mt-2">
              View and manage course information
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href={`/admin/courses/${courseId}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={handleDeleteCourse}
            disabled={deleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {deleting ? "Deleting..." : "Delete Course"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Information */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {course.title}
                </p>
              </div>
              {course.subtitle && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <p className="text-gray-900">{course.subtitle}</p>
                </div>
              )}
              {course.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {course.description}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                {getStatusBadge(course.status)}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Duration */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Duration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{course.price}
                  </p>
                </div>
                {course.duration && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <p className="text-lg font-medium text-gray-900">
                      {course.duration}
                    </p>
                  </div>
                )}
              </div>
              {course.registration && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Fee
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    ₹{course.registration}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visual Styling */}
          <Card>
            <CardHeader>
              <CardTitle>Visual Styling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Badge Text
                  </label>
                  <p className="text-gray-900">{course.badge || "None"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Popular Course
                  </label>
                  <p className="text-gray-900">
                    {course.is_popular ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color Scheme
                </label>
                <div className="flex space-x-2">
                  <div
                    className={`w-6 h-6 ${course.badge_color} rounded`}
                    title="Badge Color"
                  ></div>
                  <div
                    className={`w-6 h-6 ${course.border_color.replace(
                      "border-",
                      "bg-"
                    )} rounded`}
                    title="Border Color"
                  ></div>
                  <div
                    className={`w-6 h-6 ${course.icon_bg} rounded`}
                    title="Icon Background"
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button & Status */}
          <Card>
            <CardHeader>
              <CardTitle>Button & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <p className="text-gray-900">
                  {course.button_text || "Enroll Now"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Color
                </label>
                <div
                  className={`w-6 h-6 ${
                    course.button_color.split(" ")[0]
                  } rounded`}
                  title="Button Color"
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Preview */}
        <div className="space-y-4 h-fit">
          <h3 className="text-lg font-semibold text-gray-900">
            Course Preview
          </h3>
          <Card className={`border-2 ${course.border_color} overflow-hidden`}>
            {course.is_popular && course.badge && (
              <div
                className={`absolute top-0 right-0 ${course.badge_color} text-white px-4 py-2 text-sm font-bold rounded-bl-lg z-10`}
              >
                {course.badge}
              </div>
            )}
            <CardHeader className="space-y-4 pb-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`h-12 w-12 ${course.icon_bg} rounded-lg flex items-center justify-center`}
                >
                  <BookOpen className={`h-6 w-6 ${course.icon_color}`} />
                </div>
                <div>
                  <CardTitle className={`text-2xl ${course.title_color}`}>
                    {course.title}
                  </CardTitle>
                  {course.subtitle && (
                    <p className="text-lg text-gray-600">{course.subtitle}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{course.price}
                  </span>
                  {course.duration && (
                    <Badge className="bg-gray-100 text-gray-800">
                      {course.duration}
                    </Badge>
                  )}
                </div>
                {course.registration && (
                  <p className="text-gray-600">
                    Registration: ₹{course.registration}
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.features && course.features.length > 0 && (
                <div className="space-y-3">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`h-5 w-5 ${course.icon_color} rounded-full`}
                      ></div>
                      <span className="text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              <Button
                className={`w-full ${course.button_color} text-lg py-6 shadow-lg`}
              >
                {course.button_text || "Enroll Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
