'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "PulseIQ – Real-Time Public Sentiment & Intelligence",
    tech: ["Python", "FastAPI", "Celery", "Redis", "MongoDB", "TimescaleDB", "Elasticsearch", "Docker"],
    description: "A high-throughput, distributed data pipeline for ingesting real-time social and news data.",
    points: [
      "Architected a distributed data ingestion pipeline for real-time social/news data.",
      "Implemented async task orchestration (Celery/Redis) to decouple ingestion from ML inference.",
      "Built a dedicated NLP microservice with fine-tuned BERT models and spaCy NER.",
      "Designed polyglot persistence: MongoDB (docs), TimescaleDB (time-series), Elasticsearch (search).",
      "Containerized and orchestrated 6+ microservices using Docker Compose."
    ],
    links: { github: "#", demo: "#" }
  },
  {
    title: "Crypto Price Prediction System",
    tech: ["Python", "Pandas", "Scikit-learn", "ARIMA", "Prophet", "NumPy"],
    description: "Time-series forecasting system to predict cryptocurrency price trends.",
    points: [
      "Implemented and compared ARIMA and Facebook Prophet models for short/medium-term forecasting.",
      "Performed advanced data preprocessing: Stationarity checks, Trend/seasonality decomposition.",
      "Evaluated models using RMSE, MAE, and rolling-window validation.",
      "Designed for easy extension to real-time price ingestion and API-based predictions."
    ],
    links: { github: "#", demo: "#" }
  },
  {
    title: "SafeChat – ML-Powered Secure Chat",
    tech: ["Node.js", "Express.js", "MongoDB", "Socket.IO", "Python", "NLP"],
    description: "Real-time chat platform with built-in ML-powered moderation.",
    points: [
      "Developed a real-time chat platform with ML-powered message moderation.",
      "Implemented NLP models to detect toxic/unsafe messages and classify intent.",
      "Designed backend APIs to block, flag, or sanitize messages in real-time.",
      "Integrated ML inference into the chat pipeline with minimal latency impact."
    ],
    links: { github: "#", demo: "#" }
  },
  {
    title: "Scalable Online IDE Backend",
    tech: ["Node.js", "Express.js", "MongoDB", "Docker", "WebSockets"],
    description: "Backend services for a browser-based online IDE executing untrusted code.",
    points: [
      "Executed untrusted user code securely inside isolated Docker containers.",
      "Implemented real-time collaboration using WebSockets.",
      "Built project isolation, execution lifecycle management, and authentication.",
      "Designed for scalability to handle concurrent user sessions."
    ],
    links: { github: "#", demo: "#" }
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-zinc-400">Selected work conceptualizing and building complex systems.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all group"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  {/* <div className="flex gap-4 text-zinc-400">
                    <a href={project.links.github} className="hover:text-white"><FaGithub size={20} /></a>
                    <a href={project.links.demo} className="hover:text-white"><FaExternalLinkAlt size={18} /></a>
                  </div> */}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-zinc-800/80 text-blue-300 text-xs font-medium rounded-full border border-blue-900/30">
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 text-zinc-400 text-sm list-disc pl-4 marker:text-zinc-600">
                  {project.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
