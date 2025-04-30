'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/app/context/AuthContext";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

interface Message {
  _id: string;
  from: string;
  to: string;
  content: string;
  createdAt: string;
}

interface UserOption {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  online?: boolean;
}

interface ChatModalProps {
  onClose: () => void;
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [peerId, setPeerId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Load user list for admins
  useEffect(() => {
    if (user?.role === "admin") {
      setLoadingUsers(true);
      fetch("/api/users", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.users || []);
        })
        .catch(() => setError("Failed to load users."))
        .finally(() => setLoadingUsers(false));
    }
  }, [user]);

  // Set peerId for regular users
  useEffect(() => {
    if (!user) return;
    if (user.role === "user") {
      setPeerId(process.env.NEXT_PUBLIC_ADMIN_ID!);
    }
  }, [user]);

  // Load chat history
  useEffect(() => {
    if (user && peerId) {
      setLoadingMessages(true);
      fetch(`/api/messages/${peerId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data.messages || []))
        .catch(() => setError("Failed to load messages."))
        .finally(() => setLoadingMessages(false));
    }
  }, [user, peerId]);

  // Initialize Socket.IO
  useEffect(() => {
    if (user && peerId) {
      fetch("/api/socket")
        .then(() => {
          const sock = io({
            path: "/api/socket",
            withCredentials: true,
          });
          setSocket(sock);

          sock.on("receive_message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
          });

          sock.on("users_online", (onlineIds: string[]) => {
            setUsers((prev) =>
              prev.map((u) => ({ ...u, online: onlineIds.includes(u._id) }))
            );
          });

          return () => {
            sock.disconnect();
          };
        })
        .catch(() => setError("Socket connection failed."));
    }
    return () => {
      socket?.disconnect();
    };
  }, [user, peerId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!socket || !input.trim() || !peerId) return;
    setSending(true);
    socket.emit("send_message", { to: peerId, content: input.trim() });
    setInput("");
    setSending(false);
  }, [socket, input, peerId]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !sending && input.trim()) {
      sendMessage();
    }
  };

  if (!user) return null;

  // Helper: get admin avatar
  const adminAvatar = (
    <img
      src="/stone.png" // Replace with your hero image path
      alt="Admin"
      className="w-8 h-8 rounded-full border-2 border-green-400 object-cover"
    />
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a232a] via-[#222e23] to-[#183a2c] bg-opacity-95">
      {/* Green blurred glow background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 w-full h-full max-w-4xl max-h-[95vh] flex flex-col rounded-3xl shadow-2xl border border-green-800/30 bg-[#181e1a]/90 backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-900/40 bg-[#181e1a]/80">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-600/30 w-12 h-12 flex items-center justify-center text-2xl font-bold text-green-200">
              {user.name?.[0] ?? "?"}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-200">{user.name}</h2>
              <p className="text-xs text-green-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-white text-3xl transition"
            aria-label="Close chat"
          >
            <FaTimes />
          </button>
        </div>

        {/* Admin: choose user */}
        {user.role === "admin" && (
          <div className="p-4 bg-[#181e1a]/80 border-b border-green-900/40">
            <label className="block text-sm font-medium mb-1 text-green-300">Chat with:</label>
            <select
              value={peerId}
              onChange={(e) => setPeerId(e.target.value)}
              className="border p-2 rounded w-full bg-[#161e1a] text-green-200 border-green-700"
              disabled={loadingUsers}
            >
              <option value="">Select a user…</option>
              {loadingUsers ? (
                <option>Loading…</option>
              ) : (
                users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email}) {u.online ? "🟢" : "⚪"}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-sm">{error}</div>
        )}

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-transparent"
          style={{ scrollbarWidth: "thin" }}
        >
          {loadingMessages ? (
            <div className="text-center text-green-300 mt-10">Loading messages…</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-green-300 mt-10">No messages yet.</div>
          ) : (
            messages.map((m, idx) => {
              const mine = m.from === user.id;
              const isAdmin = m.from === process.env.NEXT_PUBLIC_ADMIN_ID;
              return (
                <div
                  key={m._id}
                  className={`flex w-full ${mine ? "justify-end" : "justify-start"}`}
                >
                  {/* Admin avatar only for admin messages (left side) */}
                  {!mine && isAdmin && (
                    <div className="flex-shrink-0 mr-2">{adminAvatar}</div>
                  )}
                  <div
                    className={`relative max-w-[70vw] md:max-w-[40vw] px-5 py-3 rounded-2xl shadow-lg
                      ${mine
                        ? "bg-gradient-to-br from-green-500 to-green-700 text-white rounded-br-none"
                        : isAdmin
                          ? "bg-white/90 text-green-900 rounded-bl-none"
                          : "bg-gray-100/80 text-green-900 rounded-bl-none"
                      }
                    `}
                  >
                    <p className="break-words">{m.content}</p>
                    <span className="block text-[11px] text-green-300 mt-2 text-right">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {/* Space for alignment if needed */}
                  {mine && <div className="w-10" />}
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 p-6 border-t border-green-900/40 bg-[#181e1a]/80">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a message…"
            className="flex-1 border border-green-700 bg-[#232b22]/60 p-3 rounded-lg text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={sending}
            autoFocus
          />
          <button
            onClick={sendMessage}
            className={`bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-3 rounded-xl font-semibold transition flex items-center gap-2 shadow
              ${input.trim() && !sending
                ? "hover:scale-105"
                : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!input.trim() || sending}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96);}
          to { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}
