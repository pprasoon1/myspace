'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ this is needed
        },
        body: JSON.stringify({ name, email, password }),
      });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }

    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleRegister} className="bg-white p-8 shadow rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Register
        </button>
      </form>
    </div>
  );
}
