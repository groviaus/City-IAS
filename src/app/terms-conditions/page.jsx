"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  CreditCard,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function TermsConditions() {
  const termsSections = [
    {
      icon: BookOpen,
      title: "Course Enrollment & Services",
      content: [
        "Enrollment is subject to seat availability and payment confirmation",
        "Course materials and access are provided upon successful payment",
        "Attendance is mandatory for optimal learning outcomes",
        "Course schedule may be adjusted with prior notice",
        "All course content is proprietary and confidential",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "All fees must be paid in advance through Razorpay",
        "Payment is non-refundable once course begins",
        "Installment plans are available as per institute policy",
        "Late payments may result in course access suspension",
        "All prices are in Indian Rupees (INR) and include applicable taxes",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Student Responsibilities",
      content: [
        "Maintain regular attendance and punctuality",
        "Complete assignments and assessments on time",
        "Respect institute property and fellow students",
        "Follow institute rules and code of conduct",
        "Provide accurate information during enrollment",
      ],
    },
    {
      icon: Scale,
      title: "Institute Obligations",
      content: [
        "Provide quality education and study materials",
        "Maintain qualified faculty and infrastructure",
        "Ensure timely completion of course curriculum",
        "Provide support for academic queries",
        "Maintain student privacy and confidentiality",
      ],
    },
    {
      icon: CheckCircle,
      title: "Intellectual Property",
      content: [
        "All course materials are institute property",
        "Sharing or copying materials is strictly prohibited",
        "Students may not record classes without permission",
        "Institute reserves rights to all proprietary content",
        "Violation may result in immediate termination",
      ],
    },
    {
      icon: FileText,
      title: "Dispute Resolution",
      content: [
        "All disputes will be resolved through mutual discussion",
        "Institute decisions on academic matters are final",
        "Legal jurisdiction is limited to Aligarh, Uttar Pradesh",
        "Students must follow grievance redressal procedures",
        "External mediation may be sought if necessary",
      ],
    },
  ];

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
            <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="text-amber-600">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before enrolling in our courses.
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

        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {termsSections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>

              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Important Notice</h3>
          <p className="text-amber-100 mb-4">
            By enrolling in our courses, you acknowledge that you have read,
            understood, and agree to be bound by these terms and conditions.
          </p>
          <div className="space-y-2 text-amber-100">
            <p>
              <strong>Contact:</strong> cityiasacademy.aligarh@gmail.com
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
            These terms and conditions are effective as of the date listed above
            and may be updated from time to time. Continued use of our services
            constitutes acceptance of any changes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
