// app/blogs/page.tsx
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import Link from "next/link";
import React from "react";

export default async function BlogsPage() {
  await dbConnect();
  // only show published posts
  const blogs = await Blog.find({ published: true })
      .select("_id title createdAt")
      .sort({ createdAt: -1 })
      .lean() as unknown as { _id: string; title: string; createdAt: string }[];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
      {blogs.length === 0 ? (
        <p>No published posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((b) => (
            <li key={b._id}>
              <Link
                href={`/blogs/${b._id}`}
                className="text-xl text-blue-600 hover:underline"
              >
                {b.title}
              </Link>
              <p className="text-gray-500 text-sm">
                {new Date(b.createdAt!).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
