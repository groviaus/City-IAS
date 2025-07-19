"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Play,
  Clock,
  Menu,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Award,
  Home,
  Wifi,
  Coffee,
  CheckCircle,
  ArrowRight,
  Target,
  Trophy,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "IAS Officer",
      batch: "2023",
      content:
        "City IAS Academy transformed my dream into reality. The FREE coaching program gave me the foundation I needed, and Mr. Khan's guidance was invaluable throughout my journey.",
      rating: 5,
      image: "happy female IAS officer success story",
    },
    {
      name: "Rahul Verma",
      role: "IPS Officer",
      batch: "2022",
      content:
        "The comprehensive study material and regular mock tests prepared me thoroughly. The academy's approach to current affairs and answer writing made all the difference.",
      rating: 5,
      image: "happy male IPS officer success story",
    },
    {
      name: "Anjali Singh",
      role: "IAS Officer",
      batch: "2024",
      content:
        "From a small town girl to an IAS officer - this academy made it possible. The hostel facilities and 24x7 library support were crucial for my preparation.",
      rating: 5,
      image: "happy female IAS officer small town success",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-gold-500 transform-origin-0 z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              {["Courses", "Faculty", "Facilities", "Contact"].map(
                (item, index) => (
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
                )
              )}
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                >
                  Apply Online
                </Button>
              </motion.div>
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

      <main>
        {/* Hero Section */}
        <section
          className="relative py-6 lg:py-10 overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div className="space-y-8" variants={fadeInUp}>
                <div className="space-y-6">
                  <motion.div variants={pulseAnimation} animate="animate">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-sm px-4 py-2 shadow-md">
                      🚨 Admissions Open - Limited Seats Only!
                    </Badge>
                  </motion.div>

                  <motion.h1
                    id="hero-heading"
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                    variants={fadeInUp}
                  >
                    Your <span className="text-blue-600">IAS Dream</span>{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                      Starts Here
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-700 leading-relaxed max-w-2xl"
                    variants={fadeInUp}
                  >
                    <strong>What if this is your last chance?</strong> Every
                    year, thousands dream of becoming an IAS officer. Only a few
                    make it. The difference? The right guidance at the right
                    time. Don't let this opportunity slip away.
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
                      Yes, you read that right. Quality IAS coaching at ZERO
                      cost. Only ₹1000 registration fee.
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeInUp}
                >
                  <motion.div {...scaleOnHover}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 shadow-lg"
                    >
                      <Target className="mr-2 h-5 w-5" />
                      Secure Your Seat Now
                    </Button>
                  </motion.div>
                  <motion.div {...scaleOnHover}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 bg-transparent border-2 border-blue-200 hover:bg-blue-50"
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
                  {[
                    {
                      number: "500+",
                      label: "IAS Officers Created",
                      color: "text-blue-600",
                    },
                    {
                      number: "15+",
                      label: "Years Experience",
                      color: "text-amber-600",
                    },
                    {
                      number: "98%",
                      label: "Success Rate",
                      color: "text-green-600",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={`text-3xl font-bold ${stat.color}`}>
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
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
                  <Image
                    src="/placeholder.svg"
                    alt="IAS aspirants studying and celebrating success"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full opacity-20 blur-3xl"></div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Urgency Banner */}
        <motion.section
          className="py-6 bg-gradient-to-r from-red-600 to-orange-600 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  Batch starts 13th July 2025 - Only 50 seats available
                </p>
              </motion.div>
              <motion.div
                className="flex items-center space-x-4 mt-4 md:mt-0"
                variants={fadeInUp}
              >
                {[
                  { value: "23", label: "Days Left" },
                  { value: "14", label: "Hours" },
                  { value: "35", label: "Minutes" },
                ].map((time, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-2xl font-bold">{time.value}</div>
                    <div className="text-xs">{time.label}</div>
                  </motion.div>
                ))}
                <motion.div {...scaleOnHover}>
                  <Button className="bg-white text-red-600 hover:bg-gray-100 ml-4 shadow-lg">
                    Apply Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Course Options */}
        <section
          className="py-20 bg-white"
          aria-labelledby="courses-heading"
          id="courses"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="courses-heading"
                className="text-3xl sm:text-4xl font-bold"
              >
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
              {/* FREE Coaching Program */}
              <motion.div variants={fadeInUp}>
                <Card className="relative hover:shadow-2xl transition-all duration-300 border-2 border-green-200 overflow-hidden backdrop-blur-sm bg-white/80 h-full pt-10">
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-2 text-sm font-bold rounded-bl-lg">
                    MOST POPULAR
                  </div>
                  <CardHeader className="space-y-4 pb-6">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Trophy className="h-6 w-6 text-green-600" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl text-green-700">
                          FREE Coaching Program
                        </CardTitle>
                        <CardDescription className="text-lg">
                          Prelims + Mains
                        </CardDescription>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹0
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          Limited Seats
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        One-time Registration: ₹1,000 + Application: ₹100
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        "Complete Test Series",
                        "Expert Faculty Classes",
                        "Study Material Included",
                        "Doubt Clearing Sessions",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div {...scaleOnHover}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg">
                        Grab This FREE Opportunity
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Foundation Batch */}
              <motion.div variants={fadeInUp}>
                <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 overflow-hidden backdrop-blur-sm bg-white/80 h-full">
                  <CardHeader className="space-y-4 pb-6">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Zap className="h-6 w-6 text-blue-600" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl text-blue-700">
                          Foundation Batch
                        </CardTitle>
                        <CardDescription className="text-lg">
                          Prelims + Mains
                        </CardDescription>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">
                          ₹30,000
                        </span>
                        <Badge className="bg-blue-100 text-blue-800">
                          10 Months
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        Complete comprehensive program
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        "Intensive Classroom Training",
                        "Personal Mentorship",
                        "Mock Interview Sessions",
                        "Current Affairs Updates",
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div {...scaleOnHover}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 shadow-lg">
                        Enroll in Foundation Batch
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                Mark Your <span className="text-blue-600">Calendar</span> -
                These <span className="text-amber-600">Dates</span> Will Change
                Your Life
              </h2>
              <p className="text-xl text-gray-600">
                Don't miss these crucial milestones on your IAS journey
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Calendar,
                  title: "Admissions Start",
                  date: "1st July",
                  year: "2025",
                  color: "blue",
                },
                {
                  icon: BookOpen,
                  title: "Batch Starts",
                  date: "13th July",
                  year: "2025",
                  color: "green",
                },
                {
                  icon: Target,
                  title: "Entrance Test",
                  date: "3rd August",
                  year: "2025 (Sunday)",
                  color: "amber",
                },
                {
                  icon: Play,
                  title: "Classes Begin",
                  date: "20th August",
                  year: "2025",
                  color: "red",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg group">
                    <CardHeader className="pb-4">
                      <motion.div
                        className={`h-16 w-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${item.color}-200 transition-colors`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon
                          className={`h-8 w-8 text-${item.color}-600`}
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`text-2xl font-bold text-${item.color}-600`}
                      >
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

        {/* Director & Faculty */}
        <section
          className="py-20 bg-white"
          aria-labelledby="faculty-heading"
          id="faculty"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                id="faculty-heading"
                className="text-3xl sm:text-4xl font-bold"
              >
                Meet the <span className="text-blue-600">Architect</span> of{" "}
                <span className="text-amber-600">IAS Success</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Behind every successful IAS officer is a mentor who believed in
                their potential
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden backdrop-blur-sm bg-white/90 py-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 space-y-6">
                    <div className="space-y-4">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Avatar className="h-24 w-24 ring-4 ring-blue-100">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                            MK
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Mr. M.R. Khan
                        </h3>
                        <p className="text-lg text-blue-600 font-semibold">
                          Director & Founder
                        </p>
                        <p className="text-gray-600">
                          City IAS/PCS Academy, Aligarh
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed italic">
                        "Every student who walks through our doors carries a
                        dream. My mission is to ensure that dream becomes their
                        reality. With 15+ years of experience, I've seen
                        ordinary students achieve extraordinary success."
                      </p>

                      <motion.div
                        className="grid grid-cols-2 gap-4"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                      >
                        {[
                          {
                            number: "500+",
                            label: "IAS Officers Mentored",
                            color: "blue",
                          },
                          {
                            number: "15+",
                            label: "Years Experience",
                            color: "amber",
                          },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            className={`text-center p-4 bg-${stat.color}-50 rounded-lg`}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div
                              className={`text-2xl font-bold text-${stat.color}-600`}
                            >
                              {stat.number}
                            </div>
                            <div className="text-sm text-gray-600">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/placeholder.svg"
                        alt="Mr. M.R. Khan, Director of City IAS Academy"
                        width={400}
                        height={400}
                        className="rounded-xl shadow-lg"
                      />
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Slider */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                What Our <span className="text-blue-600">Success</span>{" "}
                <span className="text-amber-600">Stories</span> Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join the ranks of successful IAS officers who started their
                journey here
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto relative">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg backdrop-blur-sm bg-white/90">
                  <CardHeader className="space-y-6 text-center">
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        )
                      )}
                    </div>
                    <blockquote className="text-xl text-gray-700 leading-relaxed italic">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <Avatar className="h-16 w-16 ring-4 ring-blue-100">
                        <AvatarImage
                          src={`/placeholder.svg?height=64&width=64&query=${testimonials[currentTestimonial].image}`}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {testimonials[currentTestimonial].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-lg text-gray-900">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-blue-600 font-medium">
                          {testimonials[currentTestimonial].role}
                        </div>
                        <div className="text-sm text-gray-600">
                          Batch {testimonials[currentTestimonial].batch}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <motion.button
                  onClick={() =>
                    setCurrentTestimonial(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-5 w-5 text-blue-600" />
                </motion.button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() =>
                    setCurrentTestimonial(
                      (prev) => (prev + 1) % testimonials.length
                    )
                  }
                  className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section
          className="py-20 bg-white"
          aria-labelledby="facilities-heading"
          id="facilities"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                id="facilities-heading"
                className="text-3xl sm:text-4xl font-bold"
              >
                Your <span className="text-blue-600">Success</span>{" "}
                <span className="text-amber-600">Environment</span> Awaits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                World-class facilities designed to maximize your learning
                potential
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Home,
                  title: "Girls' Hostel",
                  description:
                    "Safe, secure in-campus accommodation for female students",
                  details: [
                    { label: "Lodging", price: "₹3,000/month" },
                    { label: "Mess", price: "₹4,000/month" },
                    { label: "Total", price: "₹7,000/month", highlight: true },
                  ],
                  color: "blue",
                },
                {
                  icon: BookOpen,
                  title: "24x7 Library",
                  description: "Air-conditioned library with unlimited access",
                  features: [
                    { icon: Wifi, text: "High-Speed Internet" },
                    { icon: Coffee, text: "Refreshment Area" },
                  ],
                  color: "green",
                },
                {
                  icon: Users,
                  title: "Smart Classrooms",
                  description:
                    "Modern, air-conditioned classrooms with latest technology",
                  subtitle:
                    "Interactive learning environment designed for maximum retention",
                  color: "purple",
                },
              ].map((facility, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg backdrop-blur-sm bg-white/90 h-full group">
                    <CardHeader>
                      <motion.div
                        className={`w-16 h-16 bg-${facility.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${facility.color}-200 transition-colors`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <facility.icon
                          className={`h-8 w-8 text-${facility.color}-600`}
                        />
                      </motion.div>
                      <CardTitle className="text-xl">
                        {facility.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{facility.description}</p>

                      {facility.details && (
                        <div className="space-y-2 text-sm">
                          {facility.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className={`flex justify-between ${
                                detail.highlight
                                  ? "border-t pt-2 font-bold"
                                  : ""
                              }`}
                            >
                              <span>{detail.label}:</span>
                              <span
                                className={
                                  detail.highlight
                                    ? "text-blue-600"
                                    : "font-semibold"
                                }
                              >
                                {detail.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {facility.features && (
                        <div className="space-y-2">
                          {facility.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-center space-x-2"
                            >
                              <feature.icon className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {facility.subtitle && (
                        <div className="text-sm text-gray-600">
                          {facility.subtitle}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                Frequently Asked{" "}
                <span className="text-blue-600">Questions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to common questions about our programs
              </p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "What is the eligibility criteria for admission?",
                    answer:
                      "Students who have passed 12th grade or are undergraduates are eligible. The program is open for all backgrounds and there are no specific stream requirements.",
                  },
                  {
                    question:
                      "How is the FREE coaching program different from the Foundation batch?",
                    answer:
                      "The FREE coaching program focuses on test series and expert faculty classes with a one-time registration fee of ₹1000. The Foundation batch is a comprehensive 10-month program with intensive classroom training, personal mentorship, and mock interviews for ₹30,000.",
                  },
                  {
                    question: "Are hostel facilities mandatory?",
                    answer:
                      "No, hostel facilities are optional. We provide in-campus girls' hostel for those who need accommodation. The total monthly charges are ₹7,000 including lodging and mess.",
                  },
                  {
                    question: "What is the selection process?",
                    answer:
                      "Admissions are on a first-come, first-serve basis with limited seats. There's an entrance test on 3rd August 2025 (Sunday) for final selection.",
                  },
                  {
                    question: "What study materials are provided?",
                    answer:
                      "Both programs include comprehensive study materials, current affairs updates, test series, and access to our 24x7 air-conditioned library with high-speed internet.",
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-lg shadow-md"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-4 mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="text-blue-600">3 Simple Steps</span> to Your{" "}
                <span className="text-amber-600">IAS Journey</span>
              </h2>
              <p className="text-xl text-gray-600">
                Your transformation begins with a single click
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    step: "1",
                    title: "Fill Online Form",
                    description:
                      "Complete the application form with your details",
                    color: "blue",
                  },
                  {
                    step: "2",
                    title: "Pay Application Fee",
                    description:
                      "₹100 application fee to secure your application",
                    color: "amber",
                  },
                  {
                    step: "3",
                    title: "Share Transaction Details",
                    description:
                      "Submit transaction number and date in the form",
                    color: "green",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="text-center space-y-4"
                    variants={fadeInUp}
                  >
                    <motion.div
                      className={`w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto shadow-lg`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span
                        className={`text-2xl font-bold text-${step.color}-600`}
                      >
                        {step.step}
                      </span>
                    </motion.div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg backdrop-blur-sm"
                variants={fadeInUp}
              >
                <h4 className="text-lg font-semibold mb-4 text-center">
                  Bank Details for Payment:
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <span className="font-medium text-gray-700">
                      Account Name:
                    </span>
                    <div className="font-semibold text-blue-600">
                      City IAS/PCS
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-gray-700">A/C No:</span>
                    <div className="font-semibold text-blue-600">
                      6561002100003075
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-gray-700">
                      IFSC Code:
                    </span>
                    <div className="font-semibold text-blue-600">
                      PUNB0656100
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact & CTA */}
        <section
          className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
          id="contact"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-8" variants={fadeInUp}>
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Your <span className="text-amber-300">IAS Dream</span> is
                    Just One Call Away
                  </h2>
                  <p className="text-xl text-blue-100">
                    Don't let another day pass wondering "what if". Take action
                    now and transform your future.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: MapPin, text: "Kela Nagar, Aligarh" },
                    { icon: Phone, text: ["+91-9286497203", "+91-9833356140"] },
                    { icon: Mail, text: "cityiasacademy.aligarh@gmail.com" },
                    { icon: Clock, text: "12:30 PM to 6:00 PM (Mon–Sat)" },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      variants={fadeInUp}
                      whileHover={{ x: 10 }}
                    >
                      <contact.icon className="h-5 w-5 text-blue-200" />
                      <div>
                        {Array.isArray(contact.text) ? (
                          contact.text.map((item, idx) => (
                            <div key={idx}>{item}</div>
                          ))
                        ) : (
                          <span>{contact.text}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-6">Ready to Begin?</h3>
                <div className="space-y-4">
                  {[
                    { placeholder: "Your Full Name", type: "text" },
                    { placeholder: "Your Phone Number", type: "tel" },
                    { placeholder: "Your Email Address", type: "email" },
                  ].map((input, index) => (
                    <motion.div key={index} whileFocus={{ scale: 1.02 }}>
                      <Input
                        type={input.type}
                        placeholder={input.placeholder}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all"
                      />
                    </motion.div>
                  ))}
                  <motion.div {...scaleOnHover}>
                    <Button className="w-full bg-amber-500 text-blue-900 hover:bg-amber-400 text-lg py-6 font-bold shadow-lg">
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Start My IAS Journey Now
                    </Button>
                  </motion.div>
                </div>
                <p className="text-sm text-blue-100 mt-4 text-center">
                  🔒 Your information is 100% secure and confidential
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Sticky CTA Button for Mobile */}
      <motion.div
        className="fixed bottom-4 right-4 z-50 md:hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 4px 20px rgba(59, 130, 246, 0.3)",
              "0 8px 30px rgba(59, 130, 246, 0.5)",
              "0 4px 20px rgba(59, 130, 246, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-2xl rounded-full px-6"
          >
            <Phone className="mr-2 h-5 w-5" />
            Apply Now
          </Button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

            {[
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
            ].map((section, index) => (
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
    </div>
  );
}
