'use client';
import { motion } from 'framer-motion';

export default function Experience() {
  const jobs = [
    {
      title: "Software Developer Intern",
      company: "Tripfox Travellers",
      period: "November 2023 - February 2024",
      description:
        "Built scalable backend APIs with Node.js & Express. Worked on a team of 4 to build a flight booking platform.",
    },
    {
      title: "Co-Head of Tech",
      company: "Alan Turing Club BU",
      period: "Jul 2024 - Present",
      description:
        "Organized various tech events, including hackathons, workshops, and guest lectures. Contributed in the development of Alan Turing Club BU's website.",
    },
  ];

  return (
    <section id="experience" className="py-32 px-6 bg-gradient-to-b from-[#232b22] to-[#171d1a]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>
        <div className="space-y-8">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-green-400">
                {job.title} <span className="text-white/80 font-normal">@ {job.company}</span>
              </h3>
              <p className="text-green-200 text-sm mb-3">{job.period}</p>
              <p className="text-gray-200">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
