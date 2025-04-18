import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashed,
        role: 'user', // 👈 This should be saved by default
      });

    return NextResponse.json({ message: "User registered", user });
  } catch (err) {
    console.error("[REGISTER ERROR]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
