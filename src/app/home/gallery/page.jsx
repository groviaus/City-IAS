"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"



const galleryItems = [
  {
    id: 1,
    src: "/placeholder.svg?height=450&width=320",
    alt: "Modern Architecture",
    category: "architecture",
    title: "Urban Symphony",
    height: 450,
  },
  {
    id: 2,
    src: "/placeholder.svg?height=280&width=400",
    alt: "Abstract Art",
    category: "art",
    title: "Color Dreams",
    height: 280,
  },
  {
    id: 3,
    src: "/placeholder.svg?height=520&width=280",
    alt: "Nature Landscape",
    category: "nature",
    title: "Whispered Secrets",
    height: 520,
  },
  {
    id: 4,
    src: "/placeholder.svg?height=380&width=350",
    alt: "Portrait Photography",
    category: "photography",
    title: "Soul Captured",
    height: 380,
  },
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=450",
    alt: "Interior Design",
    category: "design",
    title: "Serene Spaces",
    height: 300,
  },
  {
    id: 6,
    src: "/placeholder.svg?height=420&width=280",
    alt: "Street Art",
    category: "art",
    title: "Urban Canvas",
    height: 420,
  },
  {
    id: 7,
    src: "/placeholder.svg?height=350&width=380",
    alt: "Mountain Sunset",
    category: "nature",
    title: "Golden Hour",
    height: 350,
  },
  {
    id: 8,
    src: "/placeholder.svg?height=480&width=320",
    alt: "Fashion Photography",
    category: "photography",
    title: "Style Statement",
    height: 480,
  },
  // {
  //   id: 9,
  //   src: "/placeholder.svg?height=320&width=420",
  //   alt: "Modern Sculpture",
  //   category: "art",
  //   title: "Shaped Dreams",
  //   height: 320,
  // },
  // {
  //   id: 10,
  //   src: "/placeholder.svg?height=400&width=300",
  //   alt: "Vintage Car",
  //   category: "photography",
  //   title: "Timeless Beauty",
  //   height: 400,
  // },
  // {
  //   id: 11,
  //   src: "/placeholder.svg?height=280&width=380",
  //   alt: "Minimalist Design",
  //   category: "design",
  //   title: "Less is More",
  //   height: 280,
  // },
  // {
  //   id: 12,
  //   src: "/placeholder.svg?height=460&width=340",
  //   alt: "Ocean Waves",
  //   category: "nature",
  //   title: "Endless Motion",
  //   height: 460,
  // },
  // {
  //   id: 13,
  //   src: "/placeholder.svg?height=320&width=480",
  //   alt: "Street Photography",
  //   category: "photography",
  //   title: "Life Unscripted",
  //   height: 320,
  // },
  // {
  //   id: 14,
  //   src: "/placeholder.svg?height=380&width=280",
  //   alt: "Contemporary Art",
  //   category: "art",
  //   title: "Bold Expression",
  //   height: 380,
  // },
  // {
  //   id: 15,
  //   src: "/placeholder.svg?height=340&width=400",
  //   alt: "Garden Design",
  //   category: "design",
  //   title: "Natural Harmony",
  //   height: 340,
  // },
]

const categories = [
  { id: "all", label: "All Stories", count: galleryItems.length },
  {
    id: "architecture",
    label: "Architecture",
    count: galleryItems.filter((item) => item.category === "architecture").length,
  },
  { id: "art", label: "Art", count: galleryItems.filter((item) => item.category === "art").length },
  { id: "nature", label: "Nature", count: galleryItems.filter((item) => item.category === "nature").length },
  {
    id: "photography",
    label: "Photography",
    count: galleryItems.filter((item) => item.category === "photography").length,
  },
  { id: "design", label: "Design", count: galleryItems.filter((item) => item.category === "design").length },
]

const floatingVariants = {
  float1: {
    y: [0, -20, -10, -30, 0],
    x: [0, 10, -5, 15, 0],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
  float2: {
    y: [0, 15, 25, 10, 0],
    x: [0, -10, 5, -15, 0],
    transition: {
      duration: 10,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
  floatUp: {
    y: [0, -40, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
  floatDiagonal: {
    y: [0, -30, 0],
    x: [0, 20, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
  floatCircle: {
    y: [0, -15, 0, 15, 0],
    x: [0, 15, 30, 15, 0],
    transition: {
      duration: 12,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
  spin: {
    rotate: [45, 405],
    transition: {
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
  pulse: {
    opacity: [0.2, 0.4, 0.2],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
  twinkle: {
    opacity: [0.3, 1, 0.3],
    scale: [1, 1.2, 1],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
  floatHorizontal: {
    x: [0, 30, 0],
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredItems, setFilteredItems] = useState(galleryItems)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(galleryItems)
    } else {
      setFilteredItems(galleryItems.filter((item) => item.category === activeFilter))
    }
    setCurrentSlide(0)
  }, [activeFilter])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1))
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="float1"
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-64 h-64 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="float2"
        />
        <motion.div
          className="absolute -bottom-32 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="float1"
        />

        {/* Medium Floating Shapes */}
        <motion.div
          className="absolute top-20 left-1/3 w-4 h-4 bg-purple-500/30 rounded-full"
          variants={floatingVariants}
          animate="floatUp"
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-6 h-6 bg-pink-500/25 rounded-full"
          variants={floatingVariants}
          animate="floatDiagonal"
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-blue-500/35 rounded-full"
          variants={floatingVariants}
          animate="floatCircle"
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-5 h-5 bg-purple-400/20 rounded-full"
          variants={floatingVariants}
          animate="floatUp"
          transition={{ delay: 2 }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-8 h-8 border border-purple-300/20"
          variants={floatingVariants}
          animate="spin"
          style={{ rotate: 45 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-6 h-6 border border-pink-300/25 rounded-full"
          variants={floatingVariants}
          animate="pulse"
        />
        <motion.div
          className="absolute top-2/3 left-2/3 w-4 h-4 bg-gradient-to-r from-purple-400/30 to-transparent"
          variants={floatingVariants}
          animate="spin"
          style={{ rotate: 45 }}
        />

        {/* Small Sparkle Elements */}
        <motion.div
          className="absolute top-1/6 right-1/6 w-2 h-2 bg-yellow-400/40 rounded-full"
          variants={floatingVariants}
          animate="twinkle"
        />
        <motion.div
          className="absolute bottom-1/6 left-1/3 w-1.5 h-1.5 bg-purple-400/50 rounded-full"
          variants={floatingVariants}
          animate="twinkle"
          transition={{ delay: 1.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/8 w-2 h-2 bg-pink-400/40 rounded-full"
          variants={floatingVariants}
          animate="twinkle"
          transition={{ duration: 5 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/8 w-1 h-1 bg-blue-400/60 rounded-full"
          variants={floatingVariants}
          animate="twinkle"
          transition={{ delay: 1.5 }}
        />

        {/* Abstract Lines */}
        <motion.div
          className="absolute top-1/3 left-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent"
          variants={floatingVariants}
          animate="floatHorizontal"
          style={{ rotate: 12 }}
        />
        <motion.div
          className="absolute bottom-1/2 right-1/3 w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-300/15 to-transparent"
          variants={floatingVariants}
          animate="floatHorizontal"
          style={{ rotate: -12 }}
          transition={{ delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Storytelling Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-4 border-0">
              ✨ Curated Collection
            </Badge>
          </motion.div> */}
          <motion.h2
            className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every Image
            
            <span className="text-purple-600">&nbsp;Tells a Story</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore our facilities, events, and hostel accommodations at City IAS Academy - where future civil servants call home.
          </motion.p>
        </motion.div>

        {/* Filter Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
            >
              <Badge
                variant={activeFilter === category.id ? "default" : "secondary"}
                className={`
                  cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105
                  ${
                    activeFilter === category.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 border-0"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-purple-300"
                  }
                `}
                onClick={() => handleFilterChange(category.id)}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
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
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="w-full flex-shrink-0 px-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="relative group bg-white rounded-2xl overflow-hidden shadow-xl"
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
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-6 text-white"
                        initial={{ y: 16, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Mobile Navigation */}
            <Button
              onClick={prevSlide}
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </Button>
            <Button
              onClick={nextSlide}
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </Button>

            {/* Mobile Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {filteredItems.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-purple-600 w-8" : "bg-slate-300 hover:bg-slate-400 w-2"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Masonry Grid */
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence mode="wait">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="break-inside-avoid group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <motion.div
                    className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
                    whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }}>
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
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      initial={{ y: 16, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
