"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/magicui/number-ticker";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Faculty() {
  const stats = [
    {
      number: 500,
      label: "IAS Officers Mentored",
      color: "blue",
      suffix: "+",
    },
    {
      number: 15,
      label: "Years Experience",
      color: "amber",
      suffix: "+",
    },
  ];

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="faculty-heading"
      id="faculty"
    >
      <div className="container sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="faculty-heading" className="text-3xl sm:text-4xl font-bold">
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
                      <AvatarImage src="/director.jpg" />
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
                    "Every student who walks through our doors carries a dream.
                    My mission is to ensure that dream becomes their reality.
                    With 15+ years of experience, I've seen ordinary students
                    achieve extraordinary success."
                  </p>

                  {/* <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className={`text-center p-4 bg-${stat.color}-50 rounded-lg`}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div
                          className={`text-2xl font-bold text-${stat.color}-600`}
                        >
                          <NumberTicker
                            value={stat.number}
                            className={`text-2xl font-bold text-${stat.color}-600`}
                            delay={index * 0.2}
                          />
                          {stat.suffix}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div> */}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/director-speech_257.jpg"
                    alt="Mr. M.R. Khan, Director of City IAS Academy"
                    width={400}
                    height={400}
                    className="rounded-xl object-cover max-h-[400px] shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
