// components/ChatButton.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
export default function ChatButton() {
  const { user } = useAuth();
  const router = useRouter();
  const [showChatModal, setShowChatModal] = useState(false);

  const handleClick = () => {
    if (!user) {
      // not logged in → go to login page
      router.push('/auth/login');
    } else {
      // logged in → open chat
      setShowChatModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
      >
        💬 Message Me
      </button>

      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Chat with Admin</h2>
              <button
                onClick={() => setShowChatModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {/* TODO: Replace this placeholder with your Socket.IO chat UI */}
            <p className="text-gray-600">Chat UI goes here…</p>
          </div>
        </div>
      )}
    </>
  );
}
