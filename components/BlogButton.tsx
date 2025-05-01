'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";

export default function BlogButton() {
  const router = useRouter();

  const navigateToBlog = () => {
    router.push("/blogs");
  };

  return (
    <motion.button
      onClick={navigateToBlog}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-8 left-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-5 rounded-full shadow-2xl border-4 border-white/20 hover:scale-110 hover:shadow-purple-400/30 transition-all duration-300 z-50 flex items-center gap-2"
      aria-label="Read Blogs"
    >
      <FaBook className="text-2xl" />
      <span className="hidden md:inline font-semibold">Read Blogs</span>
    </motion.button>
  );
}