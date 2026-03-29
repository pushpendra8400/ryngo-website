"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Navigation, Download, LogOut, User, Star, HelpCircle, Wallet, History, Car } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import UserProfile from "./UserProfile";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Riders", href: "/users" },
  { name: "Drivers", href: "/drivers" },
  { name: "Business", href: "/business" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

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
                className="relative h-10 w-10 md:h-12 md:w-12"
              >
                <Image
                  src="/images/logo.png"
                  alt="Ryngo Logo"
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
              {session?.user ? (
                <UserProfile user={session.user} />
              ) : (
                <>
                  <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-[#0B4619] transition-all hover:scale-105 active:scale-95">
                    Sign In
                  </Link>
                  <button className="bg-[#0B132B] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition-all duration-300 hover:-translate-y-0.5 active:scale-95 border border-white/10 hover-shadow-teal">
                    Download App
                  </button>
                </>
              )}
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
              {session?.user && (() => {
                const navUser = session.user;
                return (
                  <div className="space-y-4">
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-sm">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-[#4CAF50]/20">
                          {navUser.image ? (
                            <Image src={navUser.image} alt={navUser.name || "User"} fill className="object-cover" />
                          ) : (
                            <User className="w-full h-full p-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#0B132B] leading-tight">
                            {navUser?.name}
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {[
                          { icon: HelpCircle, label: "Help", href: "/settings?section=help" },
                          { icon: Wallet, label: "Wallet", href: "/settings?section=payments" },
                          { icon: History, label: "Activity", href: "/settings?section=activity" }
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 rounded-2xl active:bg-gray-100 transition-colors"
                          >
                            <item.icon size={20} className="text-[#0B132B]" />
                            <span className="text-[10px] font-bold text-[#0B132B]">{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <Link href="/settings" onClick={closeMobileMenu} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                          <User size={18} className="text-gray-600" />
                          <span className="text-sm font-bold text-[#0B132B]">Manage account</span>
                        </Link>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                          <Car size={18} className="text-gray-600" />
                          <span className="text-sm font-bold text-[#0B132B]">Ride</span>
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => signOut()}
                      className="w-full bg-white border border-red-100 text-red-500 py-4 rounded-2xl text-base font-bold active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                );
              })()}
              {!session?.user && (
                <>
                  <button className="w-full flex items-center justify-center gap-2 bg-[#0B132B] text-white py-4 rounded-2xl text-base font-black shadow-xl active:scale-[0.97] transition-all hover-shadow-teal">
                    <Download size={18} />
                    Download App
                  </button>
                  <Link 
                    href="/login"
                    onClick={closeMobileMenu}
                    className="w-full bg-white/70 border border-black/10 text-[#0B132B] py-4 rounded-2xl text-base font-bold active:scale-[0.97] transition-all flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
