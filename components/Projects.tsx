'use client';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: "Project 1",
      description: "A modern web application built with React and Node.js",
      tech: "React, Node.js, MongoDB",
      link: "#"
    },
    {
      title: "Project 2",
      description: "Real-time chat application with WebSocket",
      tech: "Next.js, Socket.io, Tailwind",
      link: "#"
    },
    {
      title: "Project 3",
      description: "E-commerce platform with payment integration",
      tech: "React, Stripe, Express",
      link: "#"
    }
  ];

  return (
    <section className="py-32 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-sm text-gray-500 mb-6">{project.tech}</p>
              <a
                href={project.link}
                className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
              >
                View Project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
  