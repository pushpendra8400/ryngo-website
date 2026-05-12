"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Mail, Lock, Chrome, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    await signIn("google", { callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.07)] border border-gray-100 p-8 space-y-6">
          
          {/* Logo/Header */}
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <LogIn className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0B132B]">Welcome back</h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to your Ryngo account</p>
            </div>
          </div>


          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-4 py-3 flex items-center gap-3 text-sm font-medium"
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#0B132B] text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#0B132B]/20 mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-gray-400 font-medium">or continue with</span>
            </div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 border-gray-100 bg-white text-gray-700 font-bold text-sm hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <Chrome size={20} className="text-red-500" />
            Sign in with Google
          </button>

          <p className="text-center text-xs text-gray-400">
            New to Ryngo?{" "}
            <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              Create an account
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
