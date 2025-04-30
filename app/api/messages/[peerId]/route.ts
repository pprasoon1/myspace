// app/api/messages/[peerId]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { Message } from "@/models/Message";

export async function GET(
  request: Request,
  { params }: { params: { peerId: string } }
) {
  // **await params** before destructuring (Next 15 requirement)
  const { peerId } = await params;

  await dbConnect();

  // 1) Read HTTP-only cookie
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2) Verify token
  let meId: string;
  try {
    meId = (jwt.verify(token, process.env.JWT_SECRET as string) as any).id;
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // 3) Validate peerId
  if (!peerId) {
    return NextResponse.json({ message: "peerId is required" }, { status: 400 });
  }

  // 4) Verify both users exist
  const [me, peer] = await Promise.all([
    User.findById(meId),
    User.findById(peerId),
  ]);
  if (!me || !peer) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // 5) Fetch chat history
  const messages = await Message.find({
    $or: [
      { from: meId, to: peerId },
      { from: peerId, to: meId },
    ],
  })
    .sort({ createdAt: 1 })
    .lean();

  return NextResponse.json({ messages });
}
