"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function DriverCTA() {
  return (
    <section className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel overflow-hidden rounded-[2rem] border-2 border-white/60 hover-shadow-teal"
        >
          <div className="relative flex flex-col lg:flex-row items-stretch">
            {/* ── Background blob ── */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FFF2C6]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* ── Image — top on mobile, right on desktop ── */}
            <div className="order-1 lg:order-2 w-full lg:w-[48%] min-h-[220px] sm:min-h-[300px] lg:min-h-[520px] relative overflow-hidden">
              <Image
                src="/images/driverapp.png"
                alt="Ryngo Driver App"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient fade on bottom for mobile */}
              <div className="lg:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
            </div>

            {/* ── Text — below image on mobile, left on desktop ── */}
            <div className="order-2 lg:order-1 w-full lg:w-[52%] p-6 sm:p-9 lg:p-14 relative z-10 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block text-xs font-black text-[#0A4D9E] uppercase tracking-widest mb-4 px-3 py-1.5 bg-[#0A4D9E]/10 rounded-full border border-[#0A4D9E]/15">
                  For Drivers
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#0B132B] mb-4 leading-[1.1] tracking-tight">
                  Drive with us and{" "}
                  <span className="text-[#0A4D9E]">earn more.</span>
                </h2>
                <p className="text-gray-700 text-base sm:text-lg mb-7 leading-relaxed opacity-90 max-w-md">
                  Join the Ryngo driver network and take control of your
                  schedule. Benefit from our low commission rates, insurance
                  coverage, and 24/7 support.
                </p>

                {/* Buttons — full width on mobile, auto on sm+ */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 bg-[#0B132B] text-white px-8 py-4 rounded-2xl font-black text-base min-h-[52px] border border-white/10 transition-all hover-shadow-teal w-full sm:w-auto"
                  >
                    Become a Partner
                    <ArrowRight size={17} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-md border-2 border-[#0B132B]/12 text-[#0B132B] px-8 py-4 rounded-2xl font-black text-base min-h-[52px] transition-all w-full sm:w-auto"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
