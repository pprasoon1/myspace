'use client';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      title: "BU RoomSearch",
      description: "A website that helps students find and change their roommates, hostel rooms. Helped more than 1500 users.",
      tech: "React.js, Express.js, MongoDB",
      link: "https://uiroomsearch.vercel.app"
    },
    {
      title: "DevPilot-Pro",
      description: "An AI powered application that learners with project based learning by providing realtime AI support and step by step approach while building projects",
      tech: "Gemini-pro, React.js, Express.js, MongoDB",
      link: "devpilot-pro.vercel.app"
    },
    {
      title: "Cropwise",
      description: "An ML-driven agriculture recommendation system for selecting crops and fertilizers.",
      tech: "Python, SkLearn, React, Express",
      link: "cropwise-dti.vercel.app"
    },
    
  ];
  

  return (
    <section id="projects" className="py-32 px-6 bg-gradient-to-b from-[#1a232a] to-[#101a14]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-2xl shadow-xl border border-white/10 p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 group backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-3 text-green-400">{project.title}</h3>
              <p className="text-gray-200 mb-3">{project.description}</p>
              <p className="text-sm text-green-200 mb-6">{project.tech}</p>
              <a
                href={project.link}
                className="inline-flex items-center text-green-400 font-medium hover:text-white transition-colors"
              >
                View Project
                <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
