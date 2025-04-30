'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaEyeSlash, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const authContext = useAuth();
  const user = authContext?.user;
  interface Blog {
    _id: string;
    title: string;
    published: boolean;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data.blogs);
    };
    fetchBlogs();
  }, []);

  if (user?.role !== "admin")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c]">
        <div className="bg-[#181e1a]/90 rounded-3xl shadow-2xl border border-green-800/30 px-8 py-16 text-center">
          <p className="text-2xl font-bold text-red-400">Access denied.</p>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c] py-20 px-4 relative overflow-hidden">
      {/* Green blurred glow background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-3xl bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-800/30 px-8 py-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
            Admin Dashboard
          </h1>
          <Link
            href="/admin/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            <FaPlus /> Create New Blog
          </Link>
        </div>
        <div className="space-y-6">
          {blogs.length === 0 && (
            <div className="text-center text-green-200 py-8">
              No blogs found.
            </div>
          )}
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 border border-green-700/20 rounded-xl px-6 py-5 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h2 className="text-2xl font-semibold text-green-200">{blog.title}</h2>
                <p className="mt-1">
                  {blog.published ? (
                    <span className="inline-flex items-center gap-1 text-green-400 font-semibold">
                      <FaCheckCircle /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-yellow-400 font-semibold">
                      <FaEyeSlash /> Unpublished
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-3 mt-2 md:mt-0">
                <Link
                  href={`/admin/edit/${blog._id}`}
                  className="inline-flex items-center gap-1 text-blue-400 hover:underline font-medium"
                  title="Edit"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={async () => {
                    await fetch(`/api/blogs/${blog._id}`, { method: 'DELETE' });
                    setBlogs(blogs.filter(b => b._id !== blog._id));
                  }}
                  className="inline-flex items-center gap-1 text-red-400 hover:underline font-medium"
                  title="Delete"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={async () => {
                    await fetch(`/api/blogs/${blog._id}/toggle`, { method: 'PATCH' });
                    location.reload();
                  }}
                  className={`inline-flex items-center gap-1 font-semibold ${
                    blog.published
                      ? "text-yellow-400 hover:text-green-400"
                      : "text-green-400 hover:text-yellow-400"
                  }`}
                  title={blog.published ? "Unpublish" : "Publish"}
                >
                  {blog.published ? <FaEye /> : <FaCheckCircle />}
                  {blog.published ? "Unpublish" : "Publish"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
