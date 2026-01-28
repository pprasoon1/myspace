'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-[#0a0a0a] text-white px-6 overflow-hidden">

      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black opacity-50 z-0" />

      {/* Navigation - Simple & Top */}
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 max-w-6xl mx-auto w-full">
        <div className="text-xl font-bold tracking-tight text-white">Pranay.</div>
        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

        {/* Profile Image - Minimal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-zinc-800 shadow-2xl"
        >
          <img
            src="/stone.jpeg"
            alt="Pranay Prasoon"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            Pranay Prasoon
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-400 font-medium"
          >
            Backend & ML Engineer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-zinc-400 text-lg leading-relaxed"
          >
            Backend-focused Software Engineer with strong expertise in distributed systems, data engineering, and applied machine learning. Experienced in building scalable backend architectures and production-grade ML pipelines.
          </motion.p>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-6 pt-4"
        >
          <a href="https://github.com/pprasoon1" className="text-zinc-400 hover:text-white transition-colors"><FaGithub size={24} /></a>
          <a href="https://linkedin.com/in/pranay-prasoon" className="text-zinc-400 hover:text-blue-400 transition-colors"><FaLinkedin size={24} /></a>
          <a href="https://leetcode.com/pranayprasoon" className="text-zinc-400 hover:text-yellow-500 transition-colors"><SiLeetcode size={24} /></a>
          <a href="mailto:pprasoon999@gmail.com" className="text-zinc-400 hover:text-white transition-colors"><FaEnvelope size={24} /></a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8"
        >
          <a href="https://docs.google.com/document/d/1MKOv99oxgPe9NRpz71Y6lsvTVIxsgyK2/edit?usp=sharing&ouid=108070849503608885193&rtpof=true&sd=true" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors">
            View Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
}