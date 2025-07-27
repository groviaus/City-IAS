"use client";

import { Button } from "@/components/ui/button";
import { Award, Phone, Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const navItems = ["Courses", "Faculty", "Facilities", "Contact"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="hidden md:block text-xl font-sans font-bold text-gray-900">
                  City IAS/PCS Academy
                </span>
                <span className="sm:hidden block text-xl font-sans font-bold text-gray-900">
                  City IAS
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  Aligarh
                </span>
              </div>
            </Link>
          </motion.div>

          <nav
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-blue-600 hover:bg-blue-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </motion.div>
            <motion.a
              href="#contact"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                Apply Online
              </Button>
            </motion.a>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
} 