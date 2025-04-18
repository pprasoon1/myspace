'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "./../../../context/AuthContext";

interface Blog {
  _id: string;
  title: string;
  content: string;
  published: boolean;
}

export default function EditBlogPage() {
  const auth = useAuth();
  const user = auth?.user;
  const router = useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Fetch the blog on mount
  useEffect(() => {
    if (!user || user.role !== "admin") return;
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blog) {
          setBlog(data.blog);
          setTitle(data.blog.title);
          setContent(data.blog.content);
        } else {
          setError(data.message || "Unable to load blog");
        }
      })
      .catch(() => setError("Unable to load blog"));
  }, [id, user]);

  if (!user) return <p>Loading...</p>;
  if (user.role !== "admin") return <p className="text-red-500">Access denied.</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p>Loading blog...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.message || "Update failed");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Blog Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-48"
          placeholder="Blog Content"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
