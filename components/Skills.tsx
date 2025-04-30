'use client';
import { motion } from 'framer-motion';

export default function Skills() {
  const skills = [
    "JavaScript", "React", "Node.js", "MongoDB", 
    "Tailwind CSS", "Next.js", "TypeScript", "Git"
  ];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
  