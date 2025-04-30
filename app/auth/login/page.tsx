'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in, go home
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c] relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 px-8 py-12"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
          Welcome Back
        </h2>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/10 rounded-lg text-green-200 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/10 rounded-lg text-green-200 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Sign In
          </button>
          <div className="flex justify-between items-center mt-2 text-sm">
            <a href="#" className="text-green-400 hover:underline">Forgot password?</a>
            <a href="/auth/register" className="text-green-400 hover:underline">Register</a>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
