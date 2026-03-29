"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  User, HelpCircle, Wallet, History, Settings, 
  LogOut, Star, Car, ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface UserProfileProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Trigger - shows name + avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-white/50 transition-all duration-200 border border-transparent hover:border-white/40"
      >
        {/* Avatar */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#0B132B] border-2 border-white/60 shadow-sm flex-shrink-0">
          {user.image ? (
            <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-black text-sm">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        {/* Name */}
        <span className="text-sm font-bold text-[#0B132B] max-w-[100px] truncate hidden sm:block">
          {user.name?.split(" ")[0] || "User"}
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 mt-3 w-[300px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-black text-[#0B132B] truncate">{user.name || "User"}</h3>
                  </div>
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 ml-3 flex-shrink-0 border-2 border-gray-50">
                    {user.image ? (
                      <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0B132B] text-white font-black text-xl">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 px-4 mb-3">
                {[
                  { icon: HelpCircle, label: "Help", href: "/settings?section=help" },
                  { icon: Wallet, label: "Wallet", href: "/settings?section=payments" },
                  { icon: History, label: "Activity", href: "/settings?section=activity" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center gap-1.5 py-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group"
                  >
                    <item.icon size={20} className="text-[#0B132B] group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-[#0B132B]">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="h-px bg-gray-100 mx-4 mb-1" />

              {/* Menu Items */}
              <div className="px-2 py-1">
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#0B132B] group-hover:text-white transition-all">
                    <Settings size={16} />
                  </div>
                  <span className="text-sm font-bold text-[#0B132B]">Settings</span>
                  <ChevronRight size={16} className="text-gray-300 ml-auto" />
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#0B132B] group-hover:text-white transition-all">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-bold text-[#0B132B]">Manage Account</span>
                  <ChevronRight size={16} className="text-gray-300 ml-auto" />
                </Link>

                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#0B132B] group-hover:text-white transition-all">
                    <Car size={16} />
                  </div>
                  <span className="text-sm font-bold text-[#0B132B]">Ride</span>
                  <ChevronRight size={16} className="text-gray-300 ml-auto" />
                </Link>
              </div>

              {/* Sign Out */}
              <div className="px-4 pb-4 pt-2">
                <button
                  onClick={() => { setIsOpen(false); signOut(); }}
                  className="w-full py-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-red-500 font-bold text-sm hover:bg-red-50 hover:border-red-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
