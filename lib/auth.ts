// lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export function signToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

/** 👇 New helper to get the current user from the JWT cookie */
export async function getCurrentUser() {
  await dbConnect();
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(id).select("-password");
    return user;
  } catch {
    return null;
  }
}
