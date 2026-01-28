'use client';
import { motion } from 'framer-motion';

const skills = [
  {
    category: "Languages",
    items: ["Python", "Golang", "TypeScript", "JavaScript (ES6+)", "SQL", "Bash"]
  },
  {
    category: "Backend & Systems",
    items: ["FastAPI", "Node.js", "Express.js", "WebSockets", "Socket.IO", "Celery & Redis", "Microservices", "gRPC", "GraphQL"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "TimescaleDB", "Elasticsearch", "Redis", "Data Modeling"]
  },
  {
    category: "Machine Learning",
    items: ["Scikit-learn", "PyTorch", "ARIMA/Prophet", "NLP (spaCy, BERT)", "Inference Services", "Model Deployment"]
  },
  {
    category: "AI & LLM",
    items: ["Gemini API", "LangChain", "LangGraph", "RAG Pipelines", "Prompt Engineering"]
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Docker Compose", "Git/GitHub", "CI/CD", "Linux", "AWS"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Technical Proficiency</h2>
          <p className="text-zinc-400">A comprehensive toolkit for building end-to-end data-intensive applications.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-zinc-800 pb-2">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm hover:bg-zinc-700 hover:text-white transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
