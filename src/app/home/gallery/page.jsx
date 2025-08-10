"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleOnHover } from "@/lib/animations";

// Items will be loaded from /api/gallery at runtime
const initialItems = [];

const defaultCategories = [
  { id: "all", label: "All Stories", count: 0 },
  { id: "facilities", label: "Facilities", count: 0 },
  { id: "hostel", label: "Hostel", count: 0 },
  { id: "events", label: "Events", count: 0 },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [categories, setCategories] = useState(defaultCategories);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load items from API
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/gallery");
        const data = await res.json();
        const list = Array.isArray(data.items) ? data.items : [];
        setItems(list);
      } catch (_e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Recompute categories when items change
  useEffect(() => {
    const counts = {
      all: items.length,
      facilities: items.filter((i) => i.category === "facilities").length,
      hostel: items.filter((i) => i.category === "hostel").length,
      events: items.filter((i) => i.category === "events").length,
    };
    setCategories([
      { id: "all", label: "All Stories", count: counts.all },
      { id: "facilities", label: "Facilities", count: counts.facilities },
      { id: "hostel", label: "Hostel", count: counts.hostel },
      { id: "events", label: "Events", count: counts.events },
    ]);
  }, [items]);

  useEffect(() => {
    const source = items;
    const next =
      activeFilter === "all"
        ? source
        : source.filter((item) => item.category === activeFilter);
    setFilteredItems(next);
    setCurrentSlide(0);
  }, [activeFilter, items]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  if (loading) {
    return (
      <section
        className="pt-10 sm:pt-20 bg-white"
        aria-labelledby="gallery-heading"
        id="gallery"
      >
        <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section Skeleton */}
          <div className="text-center space-y-4 mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>

          {/* Filter Badges Skeleton */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 bg-gray-200 rounded-full w-24 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Gallery Content Skeleton */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="break-inside-avoid">
                <div className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render gallery if no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className=" pt-10 sm:pt-20 bg-white"
      aria-labelledby="gallery-heading"
      id="gallery"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="gallery-heading" className="text-3xl sm:text-4xl font-bold">
            Explore Our <span className="text-blue-600">Campus</span> &{" "}
            <span className="text-amber-600">Facilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our state-of-the-art facilities, comfortable
            hostel accommodations, and vibrant learning environment where future
            civil servants thrive.
          </p>
        </motion.div>

        {/* Filter Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <Badge
                variant={activeFilter === category.id ? "default" : "secondary"}
                className={`
                  cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105
                  ${
                    activeFilter === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-0"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-blue-300"
                  }
                `}
                onClick={() => handleFilterChange(category.id)}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-75">
                  ({category.count})
                </span>
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Content */}
        {isMobile ? (
          /* Mobile Slider */
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={`${activeFilter}-${item.id}`}
                  className="w-full flex-shrink-0 px-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className="relative group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {/* <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ y: 16, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </motion.div> */}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Navigation */}
            <Button
              onClick={prevSlide}
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Button>
            <Button
              onClick={nextSlide}
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </Button>

            {/* Mobile Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {filteredItems.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-2"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Masonry Grid */
          <motion.div
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            key={activeFilter}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${activeFilter}-${item.id}`}
                className="break-inside-avoid group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-200"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={item.alt}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-cover"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  {/* <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ y: 16, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </motion.div> */}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
