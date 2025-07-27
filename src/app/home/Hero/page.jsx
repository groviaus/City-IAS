"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Play } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  fadeInUp,
  staggerContainer,
  scaleOnHover,
  pulseAnimation,
} from "@/lib/animations";

export default function Hero() {
  const stats = [
    {
      number: 500,
      label: " Officers Created",
      color: "text-blue-600",
      suffix: "+",
    },
    {
      number: 15,
      label: "Years Experience",
      color: "text-amber-600",
      suffix: "+",
    },
    {
      number: 98,
      label: "Success Rate",
      color: "text-green-600",
      suffix: "%",
    },
  ];

  return (
    <section
      className="relative py-6 lg:py-10 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="space-y-8 text-center lg:text-left"
            variants={fadeInUp}
          >
            <div className="space-y-6">
              <motion.div
                variants={pulseAnimation}
                animate="animate"
                className="flex justify-center lg:justify-start w-fit"
              >
                <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-sm px-4 py-2 shadow-md">
                  🚨 Admissions Open - Limited Seats Only!
                </Badge>
              </motion.div>

              <motion.h1
                id="hero-heading"
                className="text-5xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                variants={fadeInUp}
              >
                Your <span className="text-blue-600">IAS Dream</span>{" "}
                <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Starts Here
                </span>
              </motion.h1>

              <motion.p
                className="text-xl hidden text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                variants={fadeInUp}
              >
                <strong>What if this is your last chance?</strong> Every year,
                thousands dream of becoming an IAS officer. Only a few make it.
                The difference? The right guidance at the right time. Don't let
                this opportunity slip away.
              </motion.p>

              <motion.div
                className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500 shadow-lg backdrop-blur-sm"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🎯 FREE Coaching Available!
                </h3>
                <p className="text-gray-700">
                  Yes, you read that right. Quality IAS coaching at ZERO cost.
                  Only ₹1000 registration fee.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeInUp}
            >
              <motion.div {...scaleOnHover}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 shadow-lg w-full sm:w-auto"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Secure Your Seat Now
                </Button>
              </motion.div>
              <motion.div {...scaleOnHover}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent border-2 border-blue-200 hover:bg-blue-50 w-full sm:w-auto"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Success Stories
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-6 pt-6"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center sm:p-4 p-2 bg-white/80 rounded-lg shadow"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    <NumberTicker
                      value={stat.number}
                      className={`sm:text-4xl text-3xl font-extrabold ${stat.color}`}
                      delay={index * 0.2}
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative z-10">
              <video
                src="/hero-video.mp4"
                alt="IAS aspirants studying and celebrating success"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
