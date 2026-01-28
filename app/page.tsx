import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import BlogButton from "@/components/BlogButton";

export const dynamic = 'force-dynamic';  // disables static generation
export const revalidate = 0;
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Footer />
      <BlogButton />
      <ChatButton />
    </main>
  );
}
