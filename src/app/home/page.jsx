"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Static imports for critical above-the-fold content
import Header from "./Header/page";
import Hero from "./Hero/page";
import UrgencyBanner from "./UrgencyBanner/page";
import Courses from "./Courses/page";
import ImportantDates from "./ImportantDates/page";
import Gallery from "./gallery/page";
import Faculty from "./Faculty/page";
import Testimonials from "./Testimonials/page";
import Facilities from "./Facilities/page";
import ProgressBar from "./ProgressBar/page";

// Dynamic imports for below-the-fold content
const FAQ = dynamic(() => import("./FAQ/page"), {
  loading: () => (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto mb-4 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-96 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  ),
});

const ApplicationProcess = dynamic(() => import("./ApplicationProcess/page"), {
  loading: () => (
    <div className="py-20 bg-white">
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto mb-4 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-96 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  ),
});

const Contact = dynamic(() => import("./Contact/page"), {
  loading: () => (
    <div id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="animate-pulse bg-blue-500 h-8 w-64 mx-auto mb-4 rounded"></div>
          <div className="animate-pulse bg-blue-500 h-4 w-96 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  ),
});

const Footer = dynamic(() => import("./Footer/page"), {
  loading: () => (
    <div className="bg-gray-900 text-white py-12">
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse bg-gray-800 h-4 w-32 rounded mb-4"></div>
        <div className="animate-pulse bg-gray-800 h-4 w-48 rounded"></div>
      </div>
    </div>
  ),
});

const StickyCTA = dynamic(() => import("./StickyCTA/page"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Urgency Banner */}
        <UrgencyBanner />

        {/* Course Options */}
        <Courses />

        {/* Important Dates */}
        <ImportantDates />

        {/* Gallery */}
        <Gallery />

        {/* Director & Faculty */}
        <Faculty />

        {/* Testimonials Slider */}
        <Testimonials />

        {/* Facilities */}
        <Facilities />

        {/* FAQ Section */}
        <FAQ />

        {/* Application Process */}
        <ApplicationProcess />

        {/* Contact & CTA */}
        <Contact />
      </main>

      {/* Sticky CTA Button for Mobile */}
      <StickyCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
