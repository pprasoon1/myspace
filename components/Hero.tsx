'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaBehance, FaDribbble } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a232a] via-[#192a1d] to-[#183a2c]">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-emerald-400 rounded-full blur-3xl"
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center justify-center h-screen">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 right-6 left-6 flex justify-between items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-green-400 font-bold text-2xl flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-md bg-green-400 flex items-center justify-center text-black font-bold text-lg">
              P
            </div>
            <span>Pranay</span>
          </motion.div>
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#about" className="hover:text-green-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-green-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-green-400 transition-colors">Experience</a>
            <a href="#resume" className="hover:text-green-400 transition-colors">Resume</a>
          </div>
        </motion.nav>

        {/* Hero content container */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12 mt-16">
          {/* Text content (left side) */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 text-left"
          >
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-green-400 font-medium mb-2"
            >
              Hello, I'm
            </motion.h2>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              Pranay Prasoon
            </motion.h1>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-green-400 mb-6"
            >
              Full-Stack Developer
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-300 text-lg mb-8 max-w-lg"
            >
              I am a Full-stack Developer & ML enthusiast, combining design prowess with technical skills to create stunning web applications and immersive digital experiences.
            </motion.p>
            
            {/* Social icons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex space-x-5 mb-8"
            >
              <a href="https://github.com/pprasoon1" className="text-white hover:text-green-400 transition-colors" aria-label="GitHub">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/pranay-prasoon" className="text-white hover:text-green-400 transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
              <a href="https://leetcode.com/pranayprasoon" className="text-white hover:text-green-400 transition-colors" aria-label="LeetCode">
                <SiLeetcode size={24} />
              </a>
              {/* <a href="https://dribbble.com/pranay-prasoon" className="text-white hover:text-green-400 transition-colors" aria-label="Dribbble">
                <FaDribbble size={24} />
              </a> */}
              <a href="mailto:pprasoon999@gmail.com" className="text-white hover:text-green-400 transition-colors" aria-label="Email">
                <FaEnvelope size={24} />
              </a>
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume" 
                className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
              >
                Resume
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/blogs" 
                className="px-8 py-3 border border-green-400 text-green-400 rounded-full font-medium hover:bg-green-400/10 transition-colors"
              >
                Read Blogs
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Image container (right side) */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 flex justify-center items-center"
          >
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"></div>
              
              {/* Profile image with border */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-br from-green-400 to-emerald-600"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#192a1d]">
                  <img 
                    src="/stone.png" 
                    alt="Pranay Prasoon" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Skills banner */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="px-8 py-3 bg-[#1a232a]/80 backdrop-blur-md rounded-xl text-center text-gray-400">
            <span className="font-medium text-green-400 mr-3">SKILLS:</span>
            <span>REACT</span> <span className="mx-2">•</span>
            <span>NODE.JS</span> <span className="mx-2">•</span>
            <span>PYTHON</span> <span className="mx-2">•</span>
            <span>MACHINE LEARNING</span> <span className="mx-2">•</span>
            <span>WORDPRESS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}