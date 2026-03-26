"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Navigation, Download } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Users", href: "/users" },
  { name: "Drivers", href: "/drivers" },
  { name: "Business", href: "/business" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/50 backdrop-blur-xl shadow-md border-b border-white/30 py-2"
            : "bg-transparent py-3 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 md:h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-8 w-24 md:h-10 md:w-32"
              >
                <Image
                  src="/images/logo.png"
                  alt="RynGO Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-4 py-2 group"
                  >
                    <span
                      className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-[#0B132B]"
                          : "text-gray-600 group-hover:text-[#0B132B]"
                      }`}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/60 blur-[1px] rounded-full shadow-sm -z-0 border border-white/40"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <motion.div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0B132B] rounded-full group-hover:w-4 transition-all duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-bold text-gray-700 hover:text-[#0B4619] transition-all hover:scale-105 active:scale-95">
                Log In
              </button>
              <button className="bg-[#0B132B] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all duration-300 hover:-translate-y-0.5 active:scale-95 border border-white/10 hover-shadow-teal">
                Download App
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                className="w-11 h-11 rounded-xl bg-white/50 border border-white/50 text-gray-700 hover:text-[#0B132B] focus:outline-none transition-all active:scale-90 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-40 bg-[#ECF4E8]/97 backdrop-blur-xl flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 mt-16">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                Menu
              </span>
              <button
                onClick={closeMobileMenu}
                className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center text-gray-600 active:scale-90 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <ul className="space-y-2">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between px-5 py-4 rounded-2xl text-lg font-bold transition-all ${
                          isActive
                            ? "bg-[#0B4619] text-white shadow-lg"
                            : "text-[#0B132B] hover:bg-white/60 active:scale-[0.98]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-white/80" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="px-4 pb-8 space-y-3 safe-bottom"
            >
              <button className="w-full flex items-center justify-center gap-2 bg-[#0B132B] text-white py-4 rounded-2xl text-base font-black shadow-xl active:scale-[0.97] transition-all hover-shadow-teal">
                <Download size={18} />
                Download App
              </button>
              <button className="w-full bg-white/70 border border-black/10 text-[#0B132B] py-4 rounded-2xl text-base font-bold active:scale-[0.97] transition-all">
                Log In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
