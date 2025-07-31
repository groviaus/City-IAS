"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ApplicationForm from "@/components/ApplicationForm";

export default function Contact() {
  const contactInfo = [
    { icon: Phone, text: ["+91 86307 03335"] },
    { icon: Mail, text: ["cityiasacademy.aligarh@gmail.com"] },
    { icon: MapPin, text: ["Kela Nagar, Aligarh", "Uttar Pradesh"] },
    { icon: Clock, text: ["Monday - Saturday", "11:00 AM - 7:00 PM"] },
  ];

  return (
    <section
     
      className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Your{" "}
            <span className="text-amber-400">IAS Journey</span>?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join hundreds of successful students who have achieved their IAS
            dreams with us. Contact us today and take the first step towards
            your future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                We're here to help you achieve your IAS dreams. Reach out to us
                through any of the following channels:
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  variants={fadeInUp}
                >
                  <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    {info.text.map((text, textIndex) => (
                      <p key={textIndex} className="text-white font-medium">
                        {text}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
              variants={fadeInUp}
            >
              <h4 className="text-xl font-bold text-white mb-4">
                Why Choose City IAS/PCS Academy?
              </h4>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>15+ Years of Experience</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>500+ Successful Officers</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>98% Success Rate</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Expert Faculty Team</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Comprehensive Study Materials</span>
                </li>
              </ul>
            </motion.div> */}
          </motion.div>

          {/* Application Form */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
             id="contact"
          >
            <ApplicationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
