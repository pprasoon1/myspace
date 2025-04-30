// components/ChatButton.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';
import ChatModal from "./ChatModal";

export default function ChatButton() {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onClick = () => {
    if (!user) return router.push("/auth/login");
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow"
      >
        💬 Message Me
      </button>
      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  );
}
