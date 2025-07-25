"use client";

import { Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Footer() {
  const footerSections = [
    {
      title: "Quick Links",
      links: ["Courses", "Faculty", "Facilities", "Contact"],
    },
    {
      title: "Programs",
      links: [
        "FREE Coaching",
        "Foundation Batch",
        "Test Series",
        "Mock Interviews",
      ],
    },
    {
      title: "Contact Info",
      links: [
        "Kela Nagar, Aligarh",
        "+91-9286497203",
        "+91-9833356140",
        "cityiasacademy.aligarh@gmail.com",
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4" variants={fadeInUp}>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">
                  City IAS/PCS Academy
                </span>
                <div className="text-sm text-gray-400">Aligarh</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transforming dreams into reality, one IAS officer at a time.
            </p>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <h3 className="font-semibold mb-4 text-blue-300">
                {section.title}
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5, color: "#ffffff" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {new Date().getFullYear()} City IAS/PCS Academy, Aligarh.
            All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 