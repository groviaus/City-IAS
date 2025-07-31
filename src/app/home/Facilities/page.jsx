"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, Users, Wifi, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Facilities() {
  const facilities = [
    {
      icon: Home,
      title: "Girls' Hostel",
      description: "Safe, secure in-campus accommodation for female students",
      details: [
        { label: "Lodging", price: 3000, suffix: "/month" },
        { label: "Mess", price: 4000, suffix: "/month" },
        {
          label: "Total",
          price: 7000,
          suffix: "/month",
          highlight: true,
        },
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
      description: "Modern, air-conditioned classrooms with latest technology",
      subtitle:
        "Interactive learning environment designed for maximum retention",
      color: "purple",
    },
  ];

  return (
    <section
      className="pb-20 bg-white"
      aria-labelledby="facilities-heading"
      id="facilities"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            World-class facilities designed to maximize your learning potential
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {facilities.map((facility, index) => (
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
                  <CardTitle className="text-xl">{facility.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{facility.description}</p>

                  {facility.details && (
                    <div className="space-y-2 text-sm">
                      {facility.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between ${
                            detail.highlight ? "border-t pt-2 font-bold" : ""
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
                            ₹
                            <NumberTicker
                              value={detail.price}
                              className={
                                detail.highlight
                                  ? "text-blue-600"
                                  : "font-semibold"
                              }
                              delay={idx * 0.1}
                            />
                            {detail.suffix}
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
  );
}
