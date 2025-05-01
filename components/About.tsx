'use client';
import { motion } from 'framer-motion';
import { FaReact, FaNode, FaPython } from 'react-icons/fa';
import { SiTensorflow, SiScikitlearn, SiNextdotjs } from 'react-icons/si';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-gradient-to-b from-[#131a15] to-[#1a232a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-[#181e1a]/80 backdrop-blur-lg rounded-xl p-8 shadow-md border border-white/10 space-y-8"
      >
        <h2 className="text-3xl font-semibold text-green-400 text-center">
          About Me
        </h2>

        <p className="text-gray-300 text-base leading-relaxed">
          I’m <span className="font-medium text-white">Pranay Prasoon</span>, a 2nd-year B.Tech CSE student at Bennett University, Noida. I blend full-stack development and machine learning to build user-focused, scalable solutions.
        </p>

        {/* Highlighted Achievements */}
        <div className="text-gray-400 text-sm space-y-3">
          <p>🔹 Top 10 at National Hackathon 2024 for a real-time analytics dashboard.</p>
          <p>🔹 Crop yield prediction model built with scikit-learn & TensorFlow.</p>
          <p>🔹 Open-source contributor & author of ML optimization articles.</p>
        </div>

        {/* Core Skills */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-center text-green-300">
          <FaReact size={32} title="React" />
          <SiNextdotjs size={32} title="Next.js" />
          <FaNode size={32} title="Node.js" />
          <FaPython size={32} title="Python" />
          <SiScikitlearn size={32} title="scikit-learn" />
          <SiTensorflow size={32} title="TensorFlow" />
        </div>

        {/* Methodology */}
        <div className="grid sm:grid-cols-3 gap-6 text-gray-300 text-sm">
          <div className="space-y-1">
            <h3 className="font-medium text-white">Collaborative</h3>
            <p>Team-first mindset, agile workflow, clear communication.</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-white">Analytical</h3>
            <p>Data-driven decision making, rigorous evaluation, continuous tuning.</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-white">User-Centric</h3>
            <p>Empathy-led design, accessibility, performance optimization.</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-around text-center text-gray-300 text-sm">
          <div>
            <p className="text-xl font-semibold text-green-400">8+</p>
            <p>Projects</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-green-400">1500+</p>
            <p>GitHub Stars</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-green-400">2000+</p>
            <p>Hours Coded</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-green-500 ml-4 pl-4 text-gray-400 text-sm space-y-6">
          <div>
            <span className="absolute -left-2 top-0 w-4 h-4 bg-green-400 rounded-full"></span>
            <p className="font-medium text-white">2023</p>
            <p>Started B.Tech CSE at Bennett University</p>
          </div>
          <div>
            <span className="absolute -left-2 w-4 h-4 bg-green-400 rounded-full"></span>
            <p className="font-medium text-white">2024</p>
            <p>National Hackathon – Real-time Analytics Dashboard</p>
          </div>
          <div>
            <span className="absolute -left-2 w-4 h-4 bg-green-400 rounded-full"></span>
            <p className="font-medium text-white">2025</p>
            <p>Launched Cropwise – ML-based agri-recommendation app</p>
          </div>
        </div>

        {/* Fun Facts */}
      
      </motion.div>
    </section>
  );
}
