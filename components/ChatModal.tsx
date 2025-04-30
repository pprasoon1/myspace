'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/app/context/AuthContext";

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
  avatarUrl?: string; // Optionally support avatars
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
      fetch("/api/users")
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
          const sock = io({ path: "/api/socket" });
          setSocket(sock);

          sock.on("receive_message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
          });

          // Optionally: handle online status
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
    // Cleanup on unmount
    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line
  }, [user, peerId]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message handler
  const sendMessage = useCallback(async () => {
    if (!socket || !input.trim() || !peerId) return;
    setSending(true);
    socket.emit("send_message", { to: peerId, content: input.trim() });
    setInput("");
    setSending(false);
  }, [socket, input, peerId]);

  // Send on Enter
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !sending && input.trim()) {
      sendMessage();
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[90vh] flex flex-col p-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Close chat"
        >
          <span aria-hidden>✕</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-full bg-indigo-100 w-10 h-10 flex items-center justify-center text-xl font-bold">
            {user.name?.[0] ?? "?"}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Admin: choose user */}
        {user.role === "admin" && (
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Chat with:</label>
            <select
              value={peerId}
              onChange={(e) => setPeerId(e.target.value)}
              className="border p-2 rounded w-full"
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
          className="flex-1 overflow-y-auto p-2 mb-2 space-y-2 bg-gray-50 rounded"
          style={{ scrollbarWidth: "thin" }}
        >
          {loadingMessages ? (
            <div className="text-center text-gray-400 mt-10">Loading messages…</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">No messages yet.</div>
          ) : (
            messages.map((m, idx) => {
              const mine = m.from === user.id;
              // Group messages by sender
              const prev = messages[idx - 1];
              const isFirstOfGroup = !prev || prev.from !== m.from;
              return (
                <div key={m._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-end gap-2">
                    {!mine && isFirstOfGroup && (
                      <div className="w-7 h-7 rounded-full bg-indigo-200 flex items-center justify-center text-sm font-bold">
                        {users.find(u => u._id === m.from)?.name?.[0] || "?"}
                      </div>
                    )}
                    <div
                      className={`relative inline-block max-w-[70%] px-4 py-2 rounded-2xl shadow ${
                        mine
                          ? "bg-indigo-500 text-white rounded-br-none"
                          : "bg-white text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p>{m.content}</p>
                      <span className="block text-[10px] text-gray-400 mt-1 text-right">
                        {new Date(m.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a message…"
            className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            disabled={sending}
            autoFocus
          />
          <button
            onClick={sendMessage}
            className={`bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition ${
              input.trim() && !sending
                ? "hover:bg-indigo-700"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!input.trim() || sending}
            aria-label="Send message"
          >
            {sending ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            ) : (
              "Send"
            )}
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
