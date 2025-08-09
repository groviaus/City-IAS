"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft, Plus, X, Save, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddCourse = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    price: "",
    duration: "",
    registration: "",
    badge: "",
    badgeColor: "bg-green-500",
    borderColor: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-700",
    buttonText: "",
    buttonColor: "bg-green-600 hover:bg-green-700",
    isPopular: false,
    status: "draft",
    features: [""],
    description: "",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const badgeColorOptions = [
    { value: "bg-green-500", label: "Green", preview: "bg-green-500" },
    { value: "bg-blue-500", label: "Blue", preview: "bg-blue-500" },
    { value: "bg-purple-500", label: "Purple", preview: "bg-purple-500" },
    { value: "bg-red-500", label: "Red", preview: "bg-red-500" },
    { value: "bg-yellow-500", label: "Yellow", preview: "bg-yellow-500" },
    { value: "bg-pink-500", label: "Pink", preview: "bg-pink-500" },
  ];

  const colorSchemeOptions = [
    {
      value: "green",
      label: "Green Theme",
      colors: {
        badgeColor: "bg-green-500",
        borderColor: "border-green-200",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        titleColor: "text-green-700",
        buttonColor: "bg-green-600 hover:bg-green-700",
      },
    },
    {
      value: "blue",
      label: "Blue Theme",
      colors: {
        badgeColor: "bg-blue-500",
        borderColor: "border-blue-200",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        titleColor: "text-blue-700",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
      },
    },
    {
      value: "purple",
      label: "Purple Theme",
      colors: {
        badgeColor: "bg-purple-500",
        borderColor: "border-purple-200",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        titleColor: "text-purple-700",
        buttonColor: "bg-purple-600 hover:bg-purple-700",
      },
    },
  ];

  const handleInputChange = (field, value) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleColorSchemeChange = (scheme) => {
    const selectedScheme = colorSchemeOptions.find((s) => s.value === scheme);
    if (selectedScheme) {
      setCourseData((prev) => ({
        ...prev,
        ...selectedScheme.colors,
      }));
    }
  };

  const addFeature = () => {
    setCourseData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setCourseData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index, value) => {
    setCourseData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up empty features
      const cleanFeatures = courseData.features.filter((f) => f.trim() !== "");

      const submitData = {
        ...courseData,
        features: cleanFeatures,
        price: parseInt(courseData.price) || 0,
        registration: courseData.registration
          ? parseInt(courseData.registration)
          : null,
      };

      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        router.push("/admin/courses");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const CoursePreview = () => (
    <Card className="border-2 border-gray-200 overflow-hidden">
      {courseData.isPopular && (
        <div
          className={`absolute top-0 right-0 ${courseData.badgeColor} text-white px-4 py-2 text-sm font-bold rounded-bl-lg`}
        >
          {courseData.badge || "POPULAR"}
        </div>
      )}
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center space-x-3">
          <div
            className={`h-12 w-12 ${courseData.iconBg} rounded-lg flex items-center justify-center`}
          >
            <BookOpen className={`h-6 w-6 ${courseData.iconColor}`} />
          </div>
          <div>
            <CardTitle className={`text-2xl ${courseData.titleColor}`}>
              {courseData.title || "Course Title"}
            </CardTitle>
            <p className="text-lg text-gray-600">
              {courseData.subtitle || "Course Subtitle"}
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">
              ₹{courseData.price || "0"}
            </span>
            <Badge className="bg-gray-100 text-gray-800">
              {courseData.duration || "Duration"}
            </Badge>
          </div>
          {courseData.registration && (
            <p className="text-gray-600">
              Registration: ₹{courseData.registration}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {courseData.features
            .filter((f) => f.trim() !== "")
            .map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className={`h-5 w-5 ${courseData.iconColor} rounded-full`}
                ></div>
                <span>{feature}</span>
              </div>
            ))}
        </div>
        <Button
          className={`w-full ${courseData.buttonColor} text-lg py-6 shadow-lg`}
        >
          {courseData.buttonText || "Enroll Now"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
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
            <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
            <p className="text-gray-600 mt-2">
              Create a new course offering for your students
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <Input
                    required
                    value={courseData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., FREE Coaching Program"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <Input
                    value={courseData.subtitle}
                    onChange={(e) =>
                      handleInputChange("subtitle", e.target.value)
                    }
                    placeholder="e.g., Prelims + Mains"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Course description..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <Input
                      required
                      type="number"
                      value={courseData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <Input
                      value={courseData.duration}
                      onChange={(e) =>
                        handleInputChange("duration", e.target.value)
                      }
                      placeholder="e.g., 10 Months"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Fee (₹)
                  </label>
                  <Input
                    type="number"
                    value={courseData.registration}
                    onChange={(e) =>
                      handleInputChange("registration", e.target.value)
                    }
                    placeholder="e.g., 1000"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Visual Styling */}
            <Card>
              <CardHeader>
                <CardTitle>Visual Styling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Scheme
                  </label>
                  <select
                    onChange={(e) => handleColorSchemeChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {colorSchemeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge Text
                  </label>
                  <Input
                    value={courseData.badge}
                    onChange={(e) => handleInputChange("badge", e.target.value)}
                    placeholder="e.g., MOST POPULAR"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={courseData.isPopular}
                    onChange={(e) =>
                      handleInputChange("isPopular", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isPopular"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mark as Popular Course
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Course Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseData.features.map((feature, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {courseData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeature}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>

            {/* Button & Status */}
            <Card>
              <CardHeader>
                <CardTitle>Button & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <Input
                    value={courseData.buttonText}
                    onChange={(e) =>
                      handleInputChange("buttonText", e.target.value)
                    }
                    placeholder="e.g., Enroll Now"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Status
                  </label>
                  <select
                    value={courseData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex space-x-3">
              <Button type="submit" disabled={loading} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Creating..." : "Create Course"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/courses")}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Preview */}
        {previewMode && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Course Preview
            </h3>
            <CoursePreview />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
