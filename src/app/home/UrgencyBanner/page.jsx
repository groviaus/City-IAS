"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";

export default function UrgencyBanner() {
  const timeData = [
    { value: 23, label: "Days Left" },
    { value: 14, label: "Hours" },
    { value: 35, label: "Minutes" },
  ];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.section
      className="py-6 bg-gradient-to-r from-red-600 to-orange-600 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between text-center md:text-left"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-1" variants={fadeInUp}>
            <h3 className="text-xl font-bold">
              ⏰ Don't Wait! Seats Filling Fast
            </h3>
            <p className="text-orange-100">
              Batch starts 13th July 2025 - Only{" "}
              <NumberTicker value={50} className="text-orange-100" /> seats
              available
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0"
            variants={fadeInUp}
          >
            <div className="flex items-center space-x-4">
              {timeData.map((time, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-2xl font-bold">
                    <NumberTicker
                      value={time.value}
                      className="text-2xl font-bold text-white p-2 bg-white/20 backdrop-blur-sm rounded-lg"
                      delay={index * 0.1}
                    />
                  </div>
                  <div className="text-xs">{time.label}</div>
                </motion.div>
              ))}
            </div>
            <motion.div {...scaleOnHover}>
              <Button className="bg-white text-red-600 hover:bg-gray-100 shadow-lg w-full sm:w-auto sm:ml-5 md:text-xl sm:py-6" onClick={(e) => handleSmoothScroll(e, 'contact')}>
                Apply Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 