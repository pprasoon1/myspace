export default function Skills() {
    const skills = ["JavaScript", "React", "Node.js", "MongoDB", "Tailwind CSS", "Next.js"];
  
    return (
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }
  