"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  Info,
  FileText,
  CreditCard,
  Clock,
  AlertCircle,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function RefundPolicy() {
  const policySections = [
    {
      icon: Shield,
      title: "Our Commitment to Quality",
      content: [
        "We are committed to providing the highest quality education and support",
        "Our courses are designed to deliver maximum value and learning outcomes",
        "We invest in qualified faculty and comprehensive study materials",
        "Your success is our priority throughout your learning journey",
        "We provide ongoing support and guidance to ensure your progress",
      ],
      color: "blue",
    },
    {
      icon: CreditCard,
      title: "Transparent Payment Terms",
      content: [
        "All payments are processed securely through Razorpay",
        "Payment must be completed in full before course access is granted",
        "Flexible installment plans are available for your convenience",
        "All fees are clearly communicated upfront with no hidden costs",
        "We maintain complete transparency in all financial transactions",
      ],
      color: "green",
    },
    {
      icon: Clock,
      title: "Course Access & Duration",
      content: [
        "Course access is provided immediately upon payment confirmation",
        "Access duration is carefully planned to optimize your learning",
        "Study materials are comprehensive and regularly updated",
        "Technical support is available throughout your course duration",
        "We ensure smooth learning experience with reliable infrastructure",
      ],
      color: "amber",
    },
    {
      icon: Info,
      title: "What You Can Expect",
      content: [
        "Comprehensive course materials and study resources",
        "Qualified faculty with extensive experience",
        "Regular assessments and progress tracking",
        "Academic support and doubt resolution",
        "Certificate upon successful completion",
      ],
      color: "purple",
    },
    {
      icon: CheckCircle,
      title: "Important Information",
      content: [
        "Please read all course details and requirements before enrolling",
        "Ensure you have the necessary time and commitment for success",
        "Check technical requirements for online components",
        "Verify course schedule compatibility with your availability",
        "Contact us with any questions before making payment",
      ],
      color: "indigo",
    },
    {
      icon: FileText,
      title: "Policy Details",
      content: [
        "Our refund policy is designed to maintain course quality and consistency",
        "Once course access is provided, the transaction is considered complete",
        "This policy ensures fair treatment for all enrolled students",
        "We encourage careful consideration before enrollment",
        "Our focus is on delivering exceptional educational value",
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
      amber: {
        bg: "from-amber-500 to-amber-600",
        text: "text-amber-600",
        dot: "bg-amber-500",
      },
      purple: {
        bg: "from-purple-500 to-purple-600",
        text: "text-purple-600",
        dot: "bg-purple-500",
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
            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Refund <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We believe in transparency and want you to understand our policies
            clearly.
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
          className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Info className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">Important Information</h2>
          </div>
          <p className="text-blue-100 text-lg leading-relaxed">
            <strong>Our Commitment:</strong> We are dedicated to providing
            exceptional educational value. Once course access is provided and
            materials are delivered, we maintain a no-refund policy to ensure
            quality and consistency for all students.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {policySections.map((section, index) => {
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
          className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
          <p className="text-blue-100 mb-4">
            We're here to help! If you have any questions about our policies or
            courses, please don't hesitate to contact us:
          </p>
          <div className="space-y-2 text-blue-100">
            <p>
              <strong>Email:</strong> cityiasacademy.aligarh@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +91-9286497203, +91-9833356140
            </p>
            <p>
              <strong>Address:</strong> Kela Nagar, Aligarh
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
            By making payment, you acknowledge that you have read and understood
            our policies. We appreciate your trust in us and are committed to
            your success.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
