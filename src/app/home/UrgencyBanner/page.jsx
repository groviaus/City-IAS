"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";

export default function UrgencyBanner() {
  const [timeData, setTimeData] = useState([
    { value: 0, label: "Days Left" },
    { value: 0, label: "Hours" },
    { value: 0, label: "Minutes" },
  ]);

  useEffect(() => {
    const calculateTimeUntilBatch = () => {
      // Batch start date: 20th August 2025
      const batchStartDate = new Date('2025-08-20T00:00:00');
      const now = new Date();
      
      const timeDifference = batchStartDate.getTime() - now.getTime();
      
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeData([
          { value: days, label: "Days Left" },
          { value: hours, label: "Hours" },
          { value: minutes, label: "Minutes" },
        ]);
      } else {
        // If batch has already started
        setTimeData([
          { value: 0, label: "Days Left" },
          { value: 0, label: "Hours" },
          { value: 0, label: "Minutes" },
        ]);
      }
    };

    // Calculate initial time
    calculateTimeUntilBatch();
    
    // Update every minute
    const interval = setInterval(calculateTimeUntilBatch, 60000);
    
    return () => clearInterval(interval);
  }, []);

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
              Batch starts 20th August 2025 - Only{" "}
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