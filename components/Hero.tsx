export default function Hero() {
    return (
      <section className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Hi, I'm [Your Name]</h1>
          <p className="text-xl mb-6">Web Developer | Designer | Tech Enthusiast</p>
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Download Resume
          </a>
        </div>
      </section>
    );
  }
  