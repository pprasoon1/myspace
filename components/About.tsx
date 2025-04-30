'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-gradient-to-b from-[#131a15] to-[#1a232a]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center bg-white/10 rounded-2xl p-10 shadow-lg backdrop-blur-md border border-white/10"
      >
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="text-gray-200 text-xl leading-relaxed">
          I'm <span className="text-green-400 font-semibold">Pranay Prasoon</span>, a passionate full-stack developer with a love for building beautiful, performant, and accessible web apps.<br /><br />
          My expertise includes JavaScript, React, Next.js, Node.js, and more. I thrive on solving complex problems and delivering impactful digital experiences.
        </p>
      </motion.div>
    </section>
  );
}
