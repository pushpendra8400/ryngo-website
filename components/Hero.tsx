"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-20 pb-10 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-transparent flex items-center">
      {/* Background subtle orbs */}
      <div className="absolute top-20 right-0 w-72 h-72 md:w-96 md:h-96 bg-[#3D8C40]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0B4619]/8 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* ── Text Content (Stacks on top for mobile) ── */}
          <div className="text-center lg:text-left order-1">

            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2.5 bg-[#0B4619]/12 rounded-full px-4 py-2 mb-5 border border-[#0B4619]/20 backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D8C40] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0B4619]" />
              </span>
              <span className="text-xs font-black text-[#0B4619] tracking-widest uppercase">
                Meet the Mobility
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0B132B] leading-[1.08] mb-4 md:mb-6"
            >
              Move with Ryngo.<br />
              <span className="text-gradient">Arrive in style.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-gray-600 mb-7 md:mb-9 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Experience premium ride booking — professional drivers, high-end fleet, and zero-compromise safety at your fingertips.
            </motion.p>

            {/* Search / Pickup Input */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-5"
            >
              <div className="glass-card p-2 pl-4 rounded-2xl sm:rounded-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl mx-auto lg:mx-0 hover-shadow-teal">
                <div className="flex items-center gap-3 flex-1 py-2 px-1 border-b sm:border-b-0 sm:border-r border-white/40">
                  <MapPin className="text-[#0B132B] shrink-0" size={18} />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    className="w-full bg-transparent border-none outline-none text-[#0B132B] placeholder-[#0B132B]/45 font-semibold text-sm"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#0B132B] text-white px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-full font-bold text-sm hover:bg-black transition-all active:scale-[0.97] min-h-[48px] border border-white/10 hover-shadow-teal whitespace-nowrap">
                  Request Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Coming Soon Tag */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF2C6] border border-[#0B4619]/15 rounded-full text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#0B4619] shrink-0" />
                Coming soon in your city
              </div>
            </motion.div>
          </div>

          {/* ── Vehicle Card / Map (below on mobile, right on desktop) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="order-2 relative flex items-center justify-center"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4E6D0]/30 to-transparent rounded-full blur-3xl -z-10" />

            {/* Map card */}
            <motion.div
              className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none lg:w-full aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-b from-gray-800 to-[#0B132B] rounded-[2.5rem] overflow-hidden border-2 border-white/70 animate-float shadow-2xl"
            >
              {/* Map background */}
              <div className="absolute inset-0">
                <Image
                  src="/images/map.png"
                  alt="Ryngo Map"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 50vw"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/50 via-transparent to-transparent" />

              {/* Ride status card (overlaid at bottom) */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B4619] flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">Driver nearby</p>
                      <p className="text-sm font-black text-[#0B132B] truncate">Arriving in 2 min</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#3D8C40] animate-pulse shrink-0" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
