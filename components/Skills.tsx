'use client';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript } from 'react-icons/si';

const skillIcons = {
  JavaScript: <SiJavascript className="text-yellow-400" />,
  React: <FaReact className="text-blue-400" />,
  "Node.js": <FaNodeJs className="text-green-500" />,
  MongoDB: <SiMongodb className="text-green-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  Git: <FaGitAlt className="text-orange-400" />,
};

export default function Skills() {
  const skills: (keyof typeof skillIcons)[] = [
    "JavaScript", "React", "Node.js", "MongoDB", 
    "Tailwind CSS", "Next.js", "TypeScript", "Git"
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-[#171d1a] to-[#232b22]">
      <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-gradient-to-br from-[#1a232a]/70 to-[#183a2c]/60 text-green-200 px-6 py-3 rounded-full font-medium shadow-lg border border-green-700/30 hover:shadow-green-400/30 hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl">{skillIcons[skill]}</span>
              <span className="tracking-wide">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
