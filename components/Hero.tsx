'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c] overflow-hidden">
      {/* Green glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-700 rounded-full filter blur-2xl"
      />

      <div className="relative z-10 max-w-3xl w-full mx-auto px-6 py-16 bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/15 text-center space-y-8">
        {/* Profile Image with Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative inline-block">
            <img
              src="/stone.png" // Replace with your image path
              alt="Pranay Prasoon"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-green-400 shadow-lg"
            />
            <span className="absolute inset-0 rounded-full ring-4 ring-green-500/30 animate-pulse"></span>
          </div>
        </motion.div>
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold mb-2 text-green-400 drop-shadow-lg"
        >
          Full-Stack Developer & Data Scientist
        </motion.h1>
        {/* Subheadline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-semibold mb-4 text-white tracking-wide"
        >
          React/Next.js Expert & Machine Learning Enthusiast
        </motion.h2>
        {/* Short Intro */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto"
        >
          I blend software engineering and data science to build scalable, intelligent digital products. From web apps to predictive analytics, I turn ideas into impactful solutions using Python, React, and ML. Let’s create something extraordinary together.
        </motion.p>
        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-6 mb-4"
        >
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition text-2xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition text-2xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:your@email.com"
            className="text-white hover:text-green-400 transition text-2xl"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </motion.div>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Have any Project?
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-white/20 text-green-400 rounded-full font-semibold border border-green-400 hover:bg-green-400 hover:text-white transition-all transform hover:scale-105 shadow-lg"
          >
            Hire Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
