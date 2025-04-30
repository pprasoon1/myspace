'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaPen } from 'react-icons/fa';

export default function CreateBlogPage() {
  const authContext = useAuth();
  const user = authContext?.user;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong.');
    }
  };

  if (!user) return <p>Loading...</p>;
  if (user.role !== 'admin') return <p className="text-red-500">Access denied.</p>;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c] relative overflow-hidden">
      {/* Green blurred glow background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-2xl bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-800/30 px-8 py-12"
      >
        <div className="flex items-center gap-3 mb-8">
          <FaPen className="text-green-400 text-3xl" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
            Create New Blog
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-green-700 rounded-lg text-green-200 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-green-700 rounded-lg text-green-200 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition h-48 resize-none"
            required
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg flex items-center justify-center gap-2"
          >
            <FaPen /> Publish Blog
          </button>
        </form>
      </motion.div>
    </section>
  );
}
