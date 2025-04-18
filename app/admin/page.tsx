'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

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

  if (user?.role !== "admin") return <p className="text-red-500">Access denied.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <Link href="/admin/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        + Create New Blog
      </Link>

      <div className="mt-8 space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.published ? '✅ Published' : '🚫 Unpublished'}</p>
            <div className="space-x-2 mt-2">
              <Link href={`/admin/edit/${blog._id}`} className="text-blue-500">Edit</Link>
              <button onClick={async () => {
                await fetch(`/api/blogs/${blog._id}`, { method: 'DELETE' });
                setBlogs(blogs.filter(b => b._id !== blog._id));
              }} className="text-red-500">Delete</button>
              <button onClick={async () => {
                await fetch(`/api/blogs/${blog._id}/toggle`, { method: 'PATCH' });
                location.reload();
              }} className="text-yellow-500">
                {blog.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
