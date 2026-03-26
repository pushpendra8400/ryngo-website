"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Zap } from "lucide-react";

const services = [
  {
    id: "cab",
    title: "RynGO Cab",
    description:
      "The everyday standard. Clean, air-conditioned cars with vetted professional drivers.",
    icon: "/images/cab-icon.png",
    features: ["Up to 4 passengers", "AC & Non-AC options"],
    isPremium: false,
  },
  {
    id: "auto",
    title: "RynGO Auto",
    description:
      "Cut through traffic effortlessly with our rapid auto service. Perfect for urban commutes.",
    icon: "/images/auto-icon.png",
    features: ["Fast urban travel", "Lowest pricing"],
    isPremium: false,
  },
  {
    id: "prime",
    title: "RynGO Prime",
    description:
      "Travel in luxury. Executive sedans, premium comfort, and a dedicated concierge experience.",
    icon: "/images/cab-icon.png",
    features: ["Executive sedans", "Priority dispatch"],
    isPremium: true,
  },
];

export default function Services() {
  return (
    <section className="section-padding bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#0B4619]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-black text-[#0B4619] uppercase tracking-widest mb-3 px-4 py-1.5 bg-[#0B4619]/10 rounded-full border border-[#0B4619]/15"
          >
            Our Fleet
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B132B] tracking-tight leading-tight mb-3"
          >
            Choose your comfort
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="text-gray-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed"
          >
            Tailored transport solutions for every need, from quick commutes to
            executive travel.
          </motion.p>
        </div>

        {/* Cards — single col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col h-full rounded-[1.75rem] overflow-hidden border-2 ${
                service.isPremium
                  ? "border-[#3D8C40]/40 bg-gradient-to-br from-[#0B4619] to-[#1a5c27] text-white shadow-xl shadow-[#0B4619]/20"
                  : "glass-card border-white/50 hover-shadow-teal"
              } p-6 sm:p-7`}
            >
              {/* Prime badge */}
              {service.isPremium && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Zap size={12} className="text-[#FFF2C6]" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FFF2C6]">
                    Prime
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 mb-5 rounded-[1.5rem] overflow-hidden border-2 ${
                  service.isPremium
                    ? "border-white/25"
                    : "border-white"
                } shrink-0`}
              >
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className={`text-xl sm:text-2xl font-black mb-2 tracking-tight ${
                    service.isPremium ? "text-white" : "text-[#0B132B]"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed mb-5 ${
                    service.isPremium ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          service.isPremium
                            ? "bg-white/20"
                            : "bg-gradient-to-br from-[#0B4619] to-[#3D8C40]"
                        }`}
                      >
                        <Check
                          size={11}
                          className={service.isPremium ? "text-white" : "text-white"}
                          strokeWidth={3}
                        />
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          service.isPremium ? "text-white/90" : "text-[#0B132B]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <button
                className={`w-full min-h-[48px] py-3 rounded-xl font-black text-base transition-all duration-300 active:scale-[0.97] ${
                  service.isPremium
                    ? "bg-white text-[#0B4619] hover:bg-[#FFF2C6]"
                    : "bg-[#0B132B] text-white hover:bg-black hover-shadow-teal"
                }`}
              >
                Book {service.title.split(" ")[1]}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
