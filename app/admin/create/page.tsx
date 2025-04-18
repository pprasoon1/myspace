'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-48"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
