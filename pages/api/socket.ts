// pages/api/socket.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { Message } from "@/models/Message";

export const config = { api: { bodyParser: false } };

// very simple cookie parser
function parseCookies(cookieHeader: string) {
  return cookieHeader
    .split(";")
    .map((c) => c.trim().split("="))
    .reduce<Record<string,string>>((acc, [k, v]) => {
      acc[k] = decodeURIComponent(v);
      return acc;
    }, {});
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) return res.status(500).end("Socket not available");

  const sock: any = res.socket;
  if (!sock.server.io) {
    await dbConnect();

    const httpServer = sock.server as HTTPServer;
    const io = new IOServer(httpServer, { path: "/api/socket" });

    io.use(async (socket, next) => {
      try {
        // 1) grab cookie header from the handshake request
        const cookieHeader = socket.request.headers.cookie;
        if (!cookieHeader) throw new Error("No cookies");

        // 2) parse out the token
        const cookies = parseCookies(cookieHeader);
        const token = cookies["token"];
        if (!token) throw new Error("No token cookie");

        // 3) verify JWT
        const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        // 4) load user
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");

        // 5) attach to socket for later use
        socket.data.user = {
          id: user._id.toString(),
          name: user.name,
          role: user.role,
        };

        next();
      } catch (err) {
        next(new Error("Unauthorized"));
      }
    });

    io.on("connection", (socket) => {
      const me = socket.data.user.id;
      socket.join(me);

      socket.on("send_message", async ({ to, content }) => {
        const msg = await Message.create({ from: me, to, content });
        const out = {
          _id: msg._id.toString(),
          from: me,
          to,
          content,
          createdAt: msg.createdAt.toISOString(),
        };
        io.to(to).to(me).emit("receive_message", out);
      });
    });

    sock.server.io = io;
  }

  res.end();
}
