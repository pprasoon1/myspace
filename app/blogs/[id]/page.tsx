// app/blogs/[id]/page.tsx
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import React from "react";

interface Params {
  params: {
    id: string;
  };
}

export default async function BlogDetailPage({ params }: Params) {
  // **await** the incoming params per Next 15 requirements
  const { id } = await params;

  await dbConnect();
  const blog = await Blog.findById(id).lean() as { published?: boolean; title: string; createdAt: string; content: string } | null;

  if (!blog || !blog.published) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold">Post Not Found</h1>
        <p>This post does not exist or is not published.</p>
      </div>
    );
  }

  return (
    <article className="prose lg:prose-xl p-8 max-w-3xl mx-auto">
      <h1 className="font-bold">{blog.title}</h1>
      <p className="text-gray-500">
        {new Date(blog.createdAt!).toLocaleDateString()}
      </p>
      <div>{blog.content}</div>
    </article>
  );
}
