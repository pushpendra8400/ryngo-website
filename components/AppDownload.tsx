"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AppDownload() {
  const [activeTab, setActiveTab] = useState<"rider" | "driver">("rider");

  const apps = {
    rider: {
      title: "Rider App",
      description: "Download the Ryngo app for the fastest booking experience, exclusive promos, and advanced safety features.",
      playStore: "https://play.google.com/store/apps/details?id=com.ryngo.user",
      appStore: "https://apps.apple.com/in/app/ryngo/id6772984650",
      image: "/images/image.png",
      color: "#0B4619"
    },
    driver: {
      title: "Driver App",
      description: "Join the Ryngo driver network and take control of your schedule. Benefit from low commissions and 24/7 support.",
      playStore: "https://play.google.com/store/apps/details?id=com.ryngo.driver",
      appStore: "https://apps.apple.com/in/app/ryngo-driver/id6772253351",
      image: "/images/driverapp.png",
      color: "#0A4D9E"
    }
  };

  return (
    <section id="download" className="relative bg-gradient-to-br from-[#FFF2C6] to-[#FFF8E1] overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#0B4619]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#3D8C40]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 lg:gap-12 pt-12 pb-0 md:pt-16 lg:pt-20">

          {/* ── Text + Buttons ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 text-[#0B132B] text-center lg:text-left pb-8 lg:pb-16"
          >
            {/* Tab Switcher */}
            <div className="inline-flex p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-[#0B4619]/10 mb-8">
              <button
                onClick={() => setActiveTab("rider")}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === "rider"
                    ? "bg-[#0B4619] text-white shadow-lg"
                    : "text-gray-600 hover:text-[#0B4619]"
                  }`}
              >
                Rider App
              </button>
              <button
                onClick={() => setActiveTab("driver")}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === "driver"
                    ? "bg-[#0A4D9E] text-white shadow-lg"
                    : "text-gray-600 hover:text-[#0A4D9E]"
                  }`}
              >
                Driver App
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className={`inline-block text-xs font-black uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border border-opacity-20`}
                  style={{
                    backgroundColor: `${apps[activeTab].color}15`,
                    color: apps[activeTab].color,
                    borderColor: apps[activeTab].color
                  }}
                >
                  {activeTab === "rider" ? "Available Now" : "Earn with Ryngo"}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tight">
                  {activeTab === "rider" ? <>Your ride <br className="hidden sm:block" /> your way.</> : <>Drive more, <br className="hidden sm:block" /> earn more.</>}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-8 leading-snug opacity-90 max-w-md mx-auto lg:mx-0">
                  {apps[activeTab].description}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-sm mx-auto lg:mx-0">
                  <motion.a
                    href={apps[activeTab].appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center transition-all w-full sm:w-auto"
                  >
                    <Image
                      src="/images/app-store-badge.svg"
                      alt="Download on the App Store"
                      width={160}
                      height={48}
                      className="h-[44px] w-auto object-contain"
                    />
                  </motion.a>
                  <motion.a
                    href={apps[activeTab].playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center transition-all w-full sm:w-auto"
                  >
                    <Image
                      src="/images/google-play-badge.png"
                      alt="Get it on Google Play"
                      width={160}
                      height={48}
                      className="h-[64px] w-auto object-contain"
                    />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end items-end"
          >
            <div className="relative w-[220px] sm:w-[280px] lg:w-[340px] xl:w-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={apps[activeTab].image}
                    alt={apps[activeTab].title}
                    width={380}
                    height={520}
                    className="w-full h-auto object-cover rounded-[2.5rem] border-4 border-white shadow-2xl"
                    priority={false}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#0B4619]/20 rounded-full blur-xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
