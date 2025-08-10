"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";
import { useRegistrationDialog } from "@/components/GlobalRegistrationDialog";

export default function UrgencyBanner() {
  const { openDialog } = useRegistrationDialog();
  const [timeData, setTimeData] = useState([
    { value: 0, label: "Days Left" },
    { value: 0, label: "Hours" },
    { value: 0, label: "Minutes" },
  ]);
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch("/api/urgency-banner");
        if (response.ok) {
          const data = await response.json();
          if (data.item) {
            setBannerData(data.item);
          }
        }
      } catch (error) {
        console.error("Error fetching urgency banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    if (!bannerData) return;

    const calculateTimeUntilBatch = () => {
      const batchStartDate = new Date(
        bannerData.batch_start_date + "T00:00:00"
      );
      const now = new Date();

      const timeDifference = batchStartDate.getTime() - now.getTime();

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

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
  }, [bannerData]);

  // Don't render if no banner data or loading
  if (loading || !bannerData) {
    return null;
  }

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
            <h3 className="text-xl font-bold">{bannerData.title}</h3>
            <p className="text-orange-100">
              {bannerData.subtitle
                .replace(
                  "{date}",
                  new Date(bannerData.batch_start_date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                )
                .replace("{seats}", bannerData.available_seats)}
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
                      className="text-2xl font-bold text-white"
                      delay={index * 0.1}
                    />
                  </div>
                  <div className="text-xs">{time.label}</div>
                </motion.div>
              ))}
            </div>
            <motion.div {...scaleOnHover}>
              <Button
                className="bg-white text-red-600 hover:bg-gray-100 shadow-lg w-full sm:w-auto sm:ml-5 md:text-xl sm:py-6"
                onClick={() => openDialog()}
              >
                Apply Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
