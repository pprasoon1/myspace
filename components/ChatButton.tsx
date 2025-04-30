'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';
import ChatModal from "./ChatModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments } from "react-icons/fa";

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
      <motion.button
        onClick={onClick}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-green-500 to-green-700 text-white p-5 rounded-full shadow-2xl border-4 border-white/20 hover:scale-110 hover:shadow-green-400/30 transition-all duration-300 z-50 flex items-center gap-2"
        aria-label="Message Me"
      >
        <FaComments className="text-2xl" />
        <span className="hidden md:inline font-semibold">Message Me</span>
      </motion.button>
      <AnimatePresence>
        {open && <ChatModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
