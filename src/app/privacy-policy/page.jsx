"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function PrivacyPolicy() {
  const policySections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number) when you apply for courses",
        "Payment information processed securely through Razorpay",
        "Usage data to improve our services and user experience",
        "Communication records for customer support purposes",
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Process your course applications and payments",
        "Provide educational services and support",
        "Send important updates about your course progress",
        "Improve our website and services based on usage patterns",
        "Comply with legal obligations and regulations",
      ],
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information",
        "Information is shared only with authorized personnel",
        "Payment data is handled securely by Razorpay",
        "We may share information if required by law",
        "Aggregate data may be used for research purposes (anonymized)",
      ],
    },
    {
      icon: FileText,
      title: "Data Security",
      content: [
        "All data is encrypted using industry-standard protocols",
        "Secure servers with regular security audits",
        "Limited access to personal information",
        "Regular backup and disaster recovery procedures",
        "Compliance with data protection regulations",
      ],
    },
    {
      icon: CheckCircle,
      title: "Your Rights",
      content: [
        "Access your personal information upon request",
        "Request correction of inaccurate data",
        "Request deletion of your data (subject to legal requirements)",
        "Opt-out of marketing communications",
        "File complaints with relevant authorities",
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
            <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect and handle your
            information.
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
          {policySections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>

              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-blue-100 mb-4">
            If you have any questions about this Privacy Policy, please contact
            us:
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
            This privacy policy is effective as of the date listed above and
            will remain in effect except with respect to any changes in its
            provisions in the future.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
