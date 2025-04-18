export default function Projects() {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="p-6 border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">Project {num}</h3>
                <p className="text-gray-600 mb-4">
                  Brief description of the project. Technologies used. Features.
                </p>
                <a
                  href="#"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  