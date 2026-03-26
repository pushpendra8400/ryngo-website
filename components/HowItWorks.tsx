"use client";

import { motion } from "framer-motion";
import { Navigation2, SearchCheck, MapPinCheck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Set Destination",
    description:
      "Enter your drop-off point to see instant upfront pricing and estimated arrival times.",
    icon: Navigation2,
  },
  {
    id: 2,
    title: "Matched in Seconds",
    description:
      "Our intelligent dispatch system matches you with the closest top-rated driver partner.",
    icon: SearchCheck,
  },
  {
    id: 3,
    title: "Travel in Comfort",
    description:
      "Step into your ride, share your trip status with loved ones, and reach your destination safely.",
    icon: MapPinCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0B4619]/6 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-black text-[#0B4619] uppercase tracking-widest mb-3 px-4 py-1.5 bg-[#0B4619]/10 rounded-full border border-[#0B4619]/15"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B132B] tracking-tight mb-4"
          >
            Simple, Fast, Reliable
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Our seamless process ensures you spend less time waiting and more
            time moving.
          </motion.p>
        </div>

        {/* ── Mobile: Vertical Timeline ── Desktop: 3-col grid ── */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#0B4619]/25 to-transparent z-0" />

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-0 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.14 }}
                className="relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center pb-8 lg:pb-0"
              >
                {/* Vertical line connector (mobile only) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-[2.1rem] top-[4.5rem] bottom-0 w-px bg-gradient-to-b from-[#0B4619]/30 to-[#0B4619]/05" />
                )}

                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  className="relative shrink-0 w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 lg:mb-6 rounded-[1.5rem] glass-card flex flex-col items-center justify-center border-2 border-white z-10 hover-shadow-teal"
                >
                  <step.icon size={28} className="text-[#0B132B]" />
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gradient-to-br from-[#0B4619] to-[#3D8C40] text-white flex items-center justify-center font-black text-xs border-2 border-white shadow-sm">
                    {step.id}
                  </div>
                </motion.div>

                {/* Text */}
                <div className="flex-1 lg:flex-none pt-1 lg:pt-0">
                  <h3 className="text-lg sm:text-xl font-black text-[#0B132B] mb-1.5 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
