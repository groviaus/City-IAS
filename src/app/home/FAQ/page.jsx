"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
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
        "Admissions are on a first-come, first-serve basis with limited seats. There's an entrance test on 10th August 2025 (Sunday) for final selection.",
    },
    {
      question: "What study materials are provided?",
      answer:
        "Both programs include comprehensive study materials, current affairs updates, test series, and access to our 24x7 air-conditioned library with high-speed internet.",
    },
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
            Frequently Asked <span className="text-blue-600">Questions</span>
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
            {faqs.map((faq, index) => (
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
  );
}
