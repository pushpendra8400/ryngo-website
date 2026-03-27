"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: "mini",
    title: "Ryngo mini",
    description: "Budget-friendly everyday rides with top-rated drivers and AC comfort.",
    icon: "/images/ryngo-mini.png",
    features: ["Up to 4 passengers", "Economical pricing"],
    isPremium: false,
  },
  {
    id: "sedan",
    title: "Ryngo sedan",
    description: "Spacious sedans for comfortable city travel and extra luggage space.",
    icon: "/images/ryngo-sedan.png",
    features: ["Spacious sedans", "AC & comfort"],
    isPremium: false,
  },
  {
    id: "prime",
    title: "Ryngo prime",
    description: "Premium sedan experience with priority dispatch and top-tier comfort.",
    icon: "/images/ryngo-prime.png",
    features: ["Top-tier comfort", "Priority dispatch"],
    isPremium: true,
  },
  {
    id: "taxi",
    title: "Ryngo taxi",
    description: "Reliable city taxi service for quick hailing and efficient transit.",
    icon: "/images/ryngo-taxi.png",
    features: ["Standard city taxi", "Local expertise"],
    isPremium: false,
  },
  {
    id: "electric",
    title: "Ryngo electric",
    description: "Eco-friendly rides with our zero-emission electric vehicle fleet.",
    icon: "/images/ryngo-electric.png",
    features: ["Zero emissions", "Silent commute"],
    isPremium: false,
  },
  {
    id: "xl",
    title: "Ryngo Xl",
    description: "Extra-large vehicles for group travel or extra luggage capacity.",
    icon: "/images/ryngo-mini.png", // Placeholder
    features: ["6+ passengers", "Large cargo space"],
    isPremium: false,
  },
  {
    id: "auto",
    title: "Ryngo auto",
    description: "Fast, flexible, and affordable three-wheeler rides for urban traffic.",
    icon: "/images/auto-icon.png",
    features: ["Fast urban travel", "Lowest pricing"],
    isPremium: false,
  },
  {
    id: "autoprime",
    title: "Ryngo auto prime",
    description: "Premium auto experience with enhanced comfort and priority service.",
    icon: "/images/auto-icon.png", // Placeholder
    features: ["Premium comfort", "Quickest pickup"],
    isPremium: true,
  },
];

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(services.length / itemsPerSlide);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Chunk services into groups of 4 for the carousel
  const carouselData = [];
  for (let i = 0; i < services.length; i += itemsPerSlide) {
    carouselData.push(services.slice(i, i + itemsPerSlide));
  }

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

        {/* Carousel Container */}
        <div className="relative group px-1">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {carouselData[currentSlide].map((service, index) => (
                  <motion.div
                    key={service.id}
                    className={`relative flex flex-col h-full rounded-[1.75rem] overflow-hidden border-2 transition-all duration-300 ${
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
                        service.isPremium ? "border-white/25" : "border-white"
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
                        className={`text-lg sm:text-xl font-black mb-2 tracking-tight ${
                          service.isPremium ? "text-white" : "text-[#0B132B]"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                          service.isPremium ? "text-white/80" : "text-gray-700"
                        }`}
                      >
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-1.5 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                service.isPremium
                                  ? "bg-white/20"
                                  : "bg-gradient-to-br from-[#0B4619] to-[#3D8C40]"
                              }`}
                            >
                              <Check
                                size={10}
                                className="text-white"
                                strokeWidth={3}
                              />
                            </div>
                            <span
                              className={`text-xs font-bold ${
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
                      className={`w-full min-h-[44px] py-2.5 rounded-xl font-black text-sm transition-all duration-300 active:scale-[0.97] ${
                        service.isPremium
                          ? "bg-white text-[#0B4619] hover:bg-[#FFF2C6]"
                          : "bg-[#0B132B] text-white hover:bg-black hover-shadow-teal"
                      }`}
                    >
                      Book {service.title}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-8 items-center">
            {/* Dots */}
            <div className="flex gap-2 mx-auto">
              {carouselData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === i ? "bg-[#0B4619] w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[-15px] lg:left-[-60px]">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0B4619] hover:text-white transition-all text-[#0B132B] border border-gray-100 hidden md:flex active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-[-15px] lg:right-[-60px]">
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0B4619] hover:text-white transition-all text-[#0B132B] border border-gray-100 hidden md:flex active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
