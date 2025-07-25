"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ApplicationProcess() {
  const steps = [
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
  ];

  const bankDetails = {
    accountName: "City IAS/PCS",
    accountNumber: "6561002100003075",
    ifscCode: "PUNB0656100",
  };

  return (
    <section className="py-20 bg-white">
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {steps.map((step, index) => (
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
                  {bankDetails.accountName}
                </div>
              </div>
              <div className="text-center">
                <span className="font-medium text-gray-700">A/C No:</span>
                <div className="font-semibold text-blue-600">
                  {bankDetails.accountNumber}
                </div>
              </div>
              <div className="text-center">
                <span className="font-medium text-gray-700">
                  IFSC Code:
                </span>
                <div className="font-semibold text-blue-600">
                  {bankDetails.ifscCode}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 