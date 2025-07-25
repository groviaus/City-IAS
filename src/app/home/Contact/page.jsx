"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ApplicationForm from "@/components/ApplicationForm";

export default function Contact() {
  const contactInfo = [
    { icon: MapPin, text: "Kela Nagar, Aligarh" },
    { icon: Phone, text: ["+91-9286497203", "+91-9833356140"] },
    { icon: Mail, text: "cityiasacademy.aligarh@gmail.com" },
    { icon: Clock, text: "12:30 PM to 6:00 PM (Mon–Sat)" },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      id="contact"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            className="space-y-8 text-center lg:text-left"
            variants={fadeInUp}
          >
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
              {contactInfo.map((contact, index) => (
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

          <ApplicationForm />
        </motion.div>
      </div>
    </section>
  );
}