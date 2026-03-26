"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AppDownload() {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF2C6] to-[#FFF8E1] overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#0B4619]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#3D8C40]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        {/* Mobile: stack vertically. Desktop: side-by-side */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 lg:gap-12 pt-12 pb-0 md:pt-16 lg:pt-20">
          
          {/* ── Text + Buttons (centered on mobile) ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 text-[#0B132B] text-center lg:text-left pb-8 lg:pb-16"
          >
            <span className="inline-block text-xs font-black text-[#0B4619] uppercase tracking-widest mb-4 px-3 py-1.5 bg-[#0B4619]/12 rounded-full border border-[#0B4619]/15">
              Available Now
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tight">
              Your city in <br className="hidden sm:block" />
              your pocket.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-8 leading-snug opacity-90 max-w-md mx-auto lg:mx-0">
              Download the RynGO app for the fastest booking experience,
              exclusive promos, and advanced safety features.
            </p>

            {/* App Buttons — stacked on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm mx-auto lg:mx-0">
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-3 bg-[#0B132B] text-white px-6 py-3.5 rounded-2xl font-bold text-base min-h-[52px] hover:bg-black transition-all border border-white/10 shadow-none hover-shadow-teal w-full sm:w-auto"
              >
                {/* Apple icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center justify-center gap-3 bg-white/80 border-2 border-[#0B132B]/12 text-[#0B132B] px-6 py-3.5 rounded-2xl font-bold text-base min-h-[52px] hover:bg-white transition-all w-full sm:w-auto"
              >
                {/* Play Store icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path fill="#00C840" d="M3 20.5v-17c0-.83 1-.83 1.5-.5l14 8.5-14 8.5c-.5.33-1.5.3-1.5-.5z" opacity="0"/>
                  <path fill="#EA4335" d="M3.18 23.85L12.95 14 3.4.14C3.15.32 3 .65 3 1.05v21.9c0 .4.15.73.18.9z"/>
                  <path fill="#FBBC05" d="M20.6 11.1l-3-1.8-5.1 4.7 5.1 4.7 3.05-1.85c.85-.5.85-1.8-.05-2.3l.5-.5z" opacity="0"/>
                  <path fill="#00C840" d="M3.18 23.85l9.77-9.85-2.1-2.1L3.18 23.85z"/>
                  <path fill="#FBBC05" d="M3.18.15l9.77 9.85-2.1 2.1L3.18.15z"/>
                  <path fill="#4285F4" d="M12.95 12l7.65-4.6c.85-.5.85-1.8 0-2.3L12.95 12z"/>
                  <path fill="#EA4335" d="M20.6 16.9L12.95 12l7.65 4.6c.85.5.85 1.8 0 2.3z"/>
                </svg>
                Google Play
              </motion.a>
            </div>

          </motion.div>

          {/* ── Phone Mockup (below on mobile, right on desktop) ── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end items-end"
          >
            <div className="relative w-[220px] sm:w-[280px] lg:w-[340px] xl:w-[380px]">
              <Image
                src="/images/image.png"
                alt="RynGO Mobile App"
                width={380}
                height={520}
                className="w-full h-auto object-cover rounded-[2.5rem] border-4 border-white shadow-2xl"
                priority={false}
              />
              {/* Glow under image */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#0B4619]/20 rounded-full blur-xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
