"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BookOpen, CheckCircle } from "lucide-react";

/**
 * CourseCard
 * Renders a single course in the exact same visual style as the public Courses section.
 * Expects a "course" object with the following camelCased fields used in public UI:
 * - title, subtitle, price, registration (optional), duration (optional),
 * - badge, badgeColor, borderColor,
 * - icon (optional React component), iconBg, iconColor, titleColor,
 * - features: string[],
 * - buttonText, buttonColor,
 * - isPopular (boolean)
 * Optionally accepts an onPrimaryAction callback for the CTA button.
 */
export default function CourseCard({ course, onPrimaryAction }) {
  const Icon = course.icon || BookOpen;

  return (
    <Card
      className={`relative hover:shadow-2xl transition-all duration-300 border-2 ${
        course.borderColor || "border-green-200"
      } overflow-hidden backdrop-blur-sm bg-white/80 h-full ${
        course.isPopular ? "pt-10 sm:pt-6" : ""
      }`}
    >
      {course.isPopular && course.badge && (
        <div
          className={`absolute top-0 right-0 ${
            course.badgeColor || "bg-green-500"
          } text-white px-4 py-2 text-sm font-bold rounded-bl-lg`}
        >
          {course.badge}
        </div>
      )}
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center space-x-3">
          <div
            className={`h-12 w-12 ${
              course.iconBg || "bg-green-100"
            } rounded-lg flex items-center justify-center`}
          >
            <Icon
              className={`h-6 w-6 ${course.iconColor || "text-green-600"}`}
            />
          </div>
          <div>
            <CardTitle
              className={`text-2xl ${course.titleColor || "text-green-700"}`}
            >
              {course.title}
            </CardTitle>
            {course.subtitle && (
              <CardDescription className="text-lg">
                {course.subtitle}
              </CardDescription>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">
              {course.price === 100 ? "Application Fee:" : ""} ₹
              <NumberTicker
                value={Number(course.price) || 0}
                className="text-3xl font-bold text-gray-900"
              />
            </span>
            <Badge className={course.badgeColor || "bg-gray-100 text-gray-800"}>
              {course.duration || "Limited Seats"}
            </Badge>
          </div>
          {course.description ? (
            <p className="text-gray-600">{course.description}</p>
          ) : (
            <p className="text-gray-600">Complete comprehensive program</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.isArray(course.features) && course.features.length > 0 && (
          <div className="space-y-3">
            {course.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle
                  className={`h-5 w-5 ${course.iconColor || "text-green-600"}`}
                />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
        <button
          className={`w-full ${
            course.buttonColor || "bg-green-600 hover:bg-green-700"
          } text-white text-lg py-4 shadow-lg rounded-md`}
          onClick={() => onPrimaryAction?.(course.title)}
        >
          {course.buttonText || "Enroll Now"}
        </button>
      </CardContent>
    </Card>
  );
}
