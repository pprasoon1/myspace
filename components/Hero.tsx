'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <div className="text-center px-4 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-4 text-white"
        >
          Hi, I Am Pranay Prasoon
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl mb-8 text-white/90"
        >
          Web Developer | Designer | Tech Enthusiast
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="/resume.pdf"
            download
            className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Download Resume</span>
            <span>↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
  