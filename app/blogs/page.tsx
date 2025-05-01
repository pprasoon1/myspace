import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import BlogNav from "@/components/BlogNav";

export const revalidate = 0;

export default async function BlogsPage() {
  try {
    const db = await dbConnect();
    
    const blogs = await Blog.find({ published: true })
      .select("_id title createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return (
      <>
        <BlogNav />
        <section className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-[#16251f] via-[#1a232a] to-[#1c2b22] py-20 px-4 relative overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none animate-pulse" />
          <div className="relative z-10 max-w-4xl w-full mx-auto bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 px-8 py-14">
            <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
              Latest Blog Posts
            </h1>
            {blogs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-300">No published posts yet.</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {blogs.map((blog) => (
                  <li
                    key={String(blog._id)}
                    className="group bg-white/5 border border-white/10 rounded-xl px-8 py-6 shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <span className="text-2xl font-semibold text-green-300 group-hover:text-white transition">
                        {blog.title}
                      </span>
                      <span className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaCalendarAlt className="text-green-400" />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Database connection error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#16251f] via-[#1a232a] to-[#1c2b22]">
        <div className="bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 text-center">
          <h2 className="text-2xl text-red-400 mb-4">Unable to load blogs</h2>
          <p className="text-gray-300">Please try again later</p>
        </div>
      </div>
    );
  }
}
