"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "IAS Officer",
      batch: "2023",
      content:
        "City IAS Academy transformed my dream into reality. The FREE coaching program gave me the foundation I needed, and Mr. Khan's guidance was invaluable throughout my journey.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Rahul Verma",
      role: "IPS Officer",
      batch: "2022",
      content:
        "The comprehensive study material and regular mock tests prepared me thoroughly. The academy's approach to current affairs and answer writing made all the difference.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Anjali Singh",
      role: "IAS Officer",
      batch: "2024",
      content:
        "From a small town girl to an IAS officer - this academy made it possible. The hostel facilities and 24x7 library support were crucial for my preparation.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
            What Our <span className="text-blue-600">Success</span>{" "}
            <span className="text-amber-600">Stories</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the ranks of successful IAS officers who started their journey
            here
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
                    {/* <AvatarImage
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                    /> */}
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
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
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
  );
}
