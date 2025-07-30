"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  CheckCircle,
  Shield,
  Users,
  BookOpen,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function CourseDelivery() {
  const deliverySections = [
    {
      icon: MapPin,
      title: "Physical Location & Access",
      content: [
        "All courses are conducted at our physical institute in Kela Nagar, Aligarh",
        "Students must attend classes in person at the designated location",
        "Institute facilities are available during scheduled class hours",
        "Study materials are provided physically during classes",
        "No online course delivery - all learning is offline",
      ],
      color: "blue",
    },
    {
      icon: Clock,
      title: "Class Schedule & Timing",
      content: [
        "Regular class schedules are provided upon enrollment",
        "Classes are conducted on weekdays and weekends as per course plan",
        "Attendance is mandatory for optimal learning outcomes",
        "Make-up classes may be available for missed sessions",
        "Holiday schedules are communicated in advance",
      ],
      color: "green",
    },
    {
      icon: Shield,
      title: "Institute Security & Safety",
      content: [
        "Secure institute premises with controlled access",
        "CCTV surveillance for student safety",
        "Proper identification required for institute entry",
        "Emergency contact numbers prominently displayed",
        "First-aid facilities available on campus",
      ],
      color: "purple",
    },
    {
      icon: BookOpen,
      title: "Study Materials & Resources",
      content: [
        "Physical study materials provided during classes",
        "Comprehensive notes and reference books included",
        "Practice test papers and previous year questions",
        "Library access for additional study materials",
        "Photocopy facilities available on campus",
      ],
      color: "amber",
    },
    {
      icon: Users,
      title: "Faculty Support & Guidance",
      content: [
        "Direct interaction with experienced faculty members",
        "Personal doubt resolution sessions available",
        "One-on-one guidance for individual queries",
        "Regular progress assessment and feedback",
        "Mentorship programs for career guidance",
      ],
      color: "indigo",
    },
    {
      icon: GraduationCap,
      title: "Quality Assurance",
      content: [
        "Experienced faculty with proven track record",
        "Regular curriculum updates based on exam patterns",
        "Mock tests and assessments to track progress",
        "Performance analytics and improvement suggestions",
        "Certificate provided upon successful completion",
      ],
      color: "teal",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        text: "text-blue-600",
        dot: "bg-blue-500",
      },
      green: {
        bg: "from-green-500 to-green-600",
        text: "text-green-600",
        dot: "bg-green-500",
      },
      purple: {
        bg: "from-purple-500 to-purple-600",
        text: "text-purple-600",
        dot: "bg-purple-500",
      },
      amber: {
        bg: "from-amber-500 to-amber-600",
        text: "text-amber-600",
        dot: "bg-amber-500",
      },
      indigo: {
        bg: "from-indigo-500 to-indigo-600",
        text: "text-indigo-600",
        dot: "bg-indigo-500",
      },
      teal: {
        bg: "from-teal-500 to-teal-600",
        text: "text-teal-600",
        dot: "bg-teal-500",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="container sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Course Delivery &{" "}
            <span className="text-green-600">Access Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how we deliver our offline courses and provide access to
            quality education at our physical institute.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </motion.div>

        {/* Information Banner */}
        <motion.div
          className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">Offline Institute</h2>
          </div>
          <p className="text-green-100 text-lg leading-relaxed">
            <strong>Physical Classes:</strong> All our courses are conducted
            offline at our institute in Kela Nagar, Aligarh. Students must
            attend classes in person to receive the complete learning experience
            with direct faculty interaction.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {deliverySections.map((section, index) => {
            const colors = getColorClasses(section.color);
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`h-12 w-12 bg-gradient-to-br ${colors.bg} rounded-lg flex items-center justify-center mr-4`}
                  >
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className={`text-2xl font-bold ${colors.text}`}>
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div
                        className={`h-2 w-2 ${colors.dot} rounded-full mt-2 mr-3 flex-shrink-0`}
                      ></div>
                      <span className="text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Institute Information</h3>
          <p className="text-green-100 mb-4">
            For any questions about course delivery, class schedules, or
            institute access:
          </p>
          <div className="space-y-2 text-green-100">
            <p>
              <strong>Institute Address:</strong> Kela Nagar, Aligarh
            </p>
            <p>
              <strong>Phone:</strong> +91-9286497203, +91-9833356140
            </p>
            <p>
              <strong>Email:</strong> cityiasacademy.aligarh@gmail.com
            </p>
            <p>
              <strong>Class Hours:</strong> Monday - Saturday, 9:00 AM - 7:00 PM
            </p>
            <p>
              <strong>Office Hours:</strong> Monday - Saturday, 8:00 AM - 8:00
              PM
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>
            This course delivery policy ensures you receive quality offline
            education with direct faculty interaction and comprehensive study
            materials at our physical institute.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
