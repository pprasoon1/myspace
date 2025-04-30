import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default async function BlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({ published: true })
    .select("_id title createdAt")
    .sort({ createdAt: -1 })
    .lean() as unknown as { _id: string; title: string; createdAt: string }[];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#16251f] via-[#1a232a] to-[#1c2b22] py-20 px-4 relative overflow-hidden">
      {/* Green blurred glow background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-3xl w-full mx-auto bg-[#181e1a]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 px-8 py-14">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent drop-shadow-lg">
          Blog Posts
        </h1>
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-300">No published posts yet.</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {blogs.map((b) => (
              <li
                key={b._id}
                className="group bg-white/5 border border-white/10 rounded-xl px-6 py-5 shadow-lg hover:shadow-green-500/20 transition-all duration-300"
              >
                <Link
                  href={`/blogs/${b._id}`}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <span className="text-2xl font-semibold text-green-300 group-hover:text-white transition">
                    {b.title}
                  </span>
                  <span className="flex items-center gap-2 text-gray-400 text-sm mt-2 md:mt-0">
                    <FaCalendarAlt className="text-green-400" />
                    {new Date(b.createdAt!).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
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
  );
}
