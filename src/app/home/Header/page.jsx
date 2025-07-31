"use client";

import { Button } from "@/components/ui/button";
import { Award, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/home";
  const navItems = ["Courses", "Faculty", "Facilities", "Contact"];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 w-full border-b bg-white backdrop-blur-md shadow-sm"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/CityIASLOGO.png" alt="City IAS/PCS Academy" width={500} height={500}  className="w-full h-14 sm:h-14 object-contain "/>
              <Image src="/CityIASLOGOM.png" alt="City IAS/PCS Academy" width={500} height={500}  className="w-full h-10 sm:h-14 object-contain hidden"/>
            </Link>
          </motion.div>

          {/* Navigation Links - Only show on home page */}
          {isHomePage && (
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
                  <button
                    onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </button>
                </motion.div>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+918630703335"
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-blue-600 hover:bg-blue-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </motion.a>
           
              <Button
                size="sm"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:scale-105 transition-all duration-300
                hidden sm:block"
              >
                Apply Online
              </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <motion.div
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Image src="/CityIASLOGO.png" alt="City IAS/PCS Academy" width={500} height={500}  className="w-full h-10 sm:h-14 object-contain"/>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-6">
                  {/* Navigation Links - Only show on home page */}
                  {isHomePage && (
                    <div className="space-y-4 px-5">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <button
                            onClick={(e) => {
                              handleSmoothScroll(e, item.toLowerCase());
                              // Close the sheet after clicking
                              const closeButton = document.querySelector(
                                '[data-slot="sheet-close"]'
                              );
                              if (closeButton) closeButton.click();
                            }}
                            className="w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                          >
                            {item}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
