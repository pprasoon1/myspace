'use client';
import Link from 'next/link';
import { FaHome, FaNewspaper } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BlogNav() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#181e1a]/80 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
        >
          <FaHome className="text-xl" />
          <span className="font-semibold">Home</span>
        </Link>
        <Link 
          href="/blogs" 
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
        >
          <FaNewspaper className="text-xl" />
          <span className="font-semibold">All Blogs</span>
        </Link>
      </div>
    </motion.nav>
  );
}