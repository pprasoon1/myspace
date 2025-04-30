'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-32 px-6 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="text-gray-700 text-xl leading-relaxed">
          I'm a passionate full-stack developer with experience building web apps
          using JavaScript, React, Node.js, and more. I love solving problems and
          turning ideas into reality through elegant and efficient code.
        </p>
      </motion.div>
    </section>
  );
}
  