"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpen, Target, Play } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ImportantDates() {
  const dates = [
    {
      icon: Calendar,
      title: "Admissions Start",
      date: "1st July",
      year: "2025",
      color: "blue",
      bgColor: "bg-blue-100",
      hoverBgColor: "group-hover:bg-blue-200",
      textColor: "text-blue-600",
    },
    {
      icon: Target,
      title: "Entrance Test",
      date: "23rd August",
      year: "2025 (Saturday) 4:00-5:00 pm",
      color: "red",
      bgColor: "bg-red-100",
      hoverBgColor: "group-hover:bg-red-200",
      textColor: "text-red-600",
    },
    {
      icon: BookOpen,
      title: "Batch Starts",
      date: "30th September",
      year: "2025",
      color: "green",
      bgColor: "bg-green-100",
      hoverBgColor: "group-hover:bg-green-200",
      textColor: "text-green-600",
    },
   
    // {
    //   icon: Play,
    //   title: "Classes Begin",
    //   date: "20th August",
    //   year: "2025",
    //   color: "red",
    //   bgColor: "bg-red-100",
    //   hoverBgColor: "group-hover:bg-red-200",
    //   textColor: "text-red-600",
    // },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Mark Your <span className="text-blue-600">Calendar</span> - These{" "}
            <span className="text-amber-600">Dates</span> Will Change Your Life
          </h2>
          <p className="text-xl text-gray-600">
            Don't miss these crucial milestones on your IAS journey
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {dates.map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="text-center hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg group">
                <CardHeader className="pb-4">
                  <motion.div
                    className={`h-16 w-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 ${item.hoverBgColor} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className={`h-8 w-8 ${item.textColor}`} />
                  </motion.div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${item.textColor}`}>
                    {item.date}
                  </div>
                  <div className="text-sm text-gray-600">{item.year}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
