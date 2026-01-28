'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto space-y-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">About Me</h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl mx-auto">
            I am a <span className="text-white font-medium">Backend-focused Software Engineer</span> with strong expertise in distributed systems, data engineering, and applied machine learning.
            I have experience building scalable backend architectures, real-time systems, and production-grade ML pipelines, including NLP services and time-series forecasting models.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl mx-auto mt-4">
            Adept at delivering end-to-end backend + ML solutions from data ingestion to deployment, I enjoy solving complex infrastructure challenges and optimizing performance for data-intensive applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 pt-8"
        >
          <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Backend Systems</h3>
            <p className="text-zinc-400">
              Architecting high-throughput, distributed services using FastAPI, Node.js, and Golang.
            </p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Data Engineering</h3>
            <p className="text-zinc-400">
              Building pipelines with Kafka/Celery, and managing polyglot persistence (SQL, NoSQL, Time-series).
            </p>
          </div>
          <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Applied ML</h3>
            <p className="text-zinc-400">
              Deploying inference services, NLP pipelines, and forecasting models to production environments.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
