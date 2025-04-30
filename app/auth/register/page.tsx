'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }

    router.push('/auth/login');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c] relative overflow-hidden">
      {/* Green blurred glow background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 px-8 py-12"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
          Create Account
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
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
              <input
                type="text"
                placeholder="Name"
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/10 rounded-lg text-green-200 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/10 rounded-lg text-green-200 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
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
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Register
          </button>
          <div className="flex justify-between items-center mt-2 text-sm">
            <a href="/auth/login" className="text-green-400 hover:underline">Already have an account?</a>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
