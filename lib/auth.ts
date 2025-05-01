// lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User as UserModel } from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export function signToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/** Read the HTTP-only “token” cookie, verify it, and return a plain JS user */
export async function getCurrentUser() {
  await dbConnect();
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };
    const user = await UserModel.findById(id).select("-password").lean() as { _id: string; name: string; email: string; role: string } | null;
    if (!user) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}
