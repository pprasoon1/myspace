'use client';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      title: "Modern Portfolio",
      description: "A sleek, animated portfolio website built with Next.js and Tailwind CSS.",
      tech: "Next.js, Tailwind CSS, Framer Motion",
      link: "#"
    },
    {
      title: "Real-Time Chat App",
      description: "A scalable chat platform with live messaging and notifications.",
      tech: "React, Node.js, Socket.io",
      link: "#"
    },
    {
      title: "E-Commerce Platform",
      description: "Complete e-commerce solution with payment and admin dashboard.",
      tech: "React, Stripe, Express.js",
      link: "#"
    }
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
