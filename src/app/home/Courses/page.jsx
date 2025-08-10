"use client";

import { useEffect, useState } from "react";
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
import { useRegistrationDialog } from "@/components/GlobalRegistrationDialog";
import CourseCard from "@/components/CourseCard";

export default function Courses() {
  const { openDialog } = useRegistrationDialog();
  const fallbackCourses = [
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

  const [courses, setCourses] = useState(fallbackCourses);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/courses")
      .then((res) => (res.ok ? res.json() : { courses: [] }))
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data.courses) && data.courses.length > 0) {
          setCourses(data.courses);
        } else {
          setCourses(fallbackCourses);
        }
      })
      .catch(() => setCourses(fallbackCourses));
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle course selection and open dialog
  const handleCourseSelect = (courseTitle) => {
    openDialog(courseTitle);
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
              <div className="h-full">
                <CourseCard
                  course={course}
                  onPrimaryAction={handleCourseSelect}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
