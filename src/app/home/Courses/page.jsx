"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";
import RegistrationDialog from "@/components/RegistrationDialog";

export default function Courses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const courses = [
    {
      title: "FREE Coaching Program",
      subtitle: "Prelims + Mains",
      price: 100,
      registration: 1000,
      application: 100,
      badge: "MOST POPULAR",
      badgeColor: "bg-green-500",
      borderColor: "border-green-200",
      icon: Trophy,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      titleColor: "text-green-700",
      features: [
        "Complete Test Series",
        "Expert Faculty Classes",
        "Study Material Included",
        "Doubt Clearing Sessions",
      ],
      buttonText: "Grab This FREE Opportunity",
      buttonColor: "bg-green-600 hover:bg-green-700",
      isPopular: true,
    },
    {
      title: "Foundation Batch for 12th Pass",
      subtitle: "Prelims + Mains (Direct Admission)",
      price: 30000,
      duration: "10 Months",
      badge: "10 Months",
      badgeColor: "bg-blue-100 text-blue-800",
      borderColor: "border-blue-200",
      icon: Zap,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleColor: "text-blue-700",
      features: [
        "Intensive Classroom Training",
        "Personal Mentorship",
        "Mock Interview Sessions",
        "Current Affairs Updates",
      ],
      buttonText: "Enroll in Foundation Batch",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      isPopular: false,
    },
  ];

  // Handle course selection and open dialog
  const handleCourseSelect = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setIsDialogOpen(true);
  };

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="courses-heading"
      id="courses"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="courses-heading" className="text-3xl sm:text-4xl font-bold">
            Choose Your <span className="text-blue-600">Path</span> to{" "}
            <span className="text-amber-600">Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two powerful programs designed to transform your IAS dreams into
            reality
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {courses.map((course, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`relative hover:shadow-2xl transition-all duration-300 border-2 ${
                  course.borderColor
                } overflow-hidden backdrop-blur-sm bg-white/80 h-full ${
                  course.isPopular ? "pt-10 sm:pt-6" : ""
                }`}
              >
                {course.isPopular && (
                  <div
                    className={`absolute top-0 right-0 ${course.badgeColor} text-white px-4 py-2 text-sm font-bold rounded-bl-lg`}
                  >
                    {course.badge}
                  </div>
                )}
                <CardHeader className="space-y-4 pb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={`h-12 w-12 ${course.iconBg} rounded-lg flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <course.icon className={`h-6 w-6 ${course.iconColor}`} />
                    </motion.div>
                    <div>
                      <CardTitle className={`text-2xl ${course.titleColor}`}>
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {course.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900">
                       {course.price === 100? "Application Fee:": ""} ₹
                        <NumberTicker
                          value={course.price}
                          className="text-3xl font-bold text-gray-900"
                        />
                      </span>
                      <Badge className={course.badgeColor}>
                        {course.duration || "Limited Seats"}
                      </Badge>
                    </div>
                    {course.registration && (
                      <p className="text-gray-600">
                        One-time Registration After Selection Based on Entrance:
                         ₹ 1000
                      </p>
                    )}
                    {!course.registration && (
                      <p className="text-gray-600">
                        Complete comprehensive program
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {course.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <CheckCircle
                          className={`h-5 w-5 ${course.iconColor}`}
                        />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div {...scaleOnHover}>
                    <Button
                      className={`w-full ${course.buttonColor} text-lg py-6 shadow-lg`}
                      onClick={() => handleCourseSelect(course.title)}
                    >
                      {course.buttonText}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Registration Dialog */}
      <RegistrationDialog
        selectedCourse={selectedCourse}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
}
