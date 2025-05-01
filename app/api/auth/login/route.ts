// // app/api/auth/login/route.ts
// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/dbConnect";
// import { User } from "@/models/User";
// import { comparePassword, signToken } from "@/lib/auth";

// export async function POST(request: Request) {
//   await dbConnect();
//   const { email, password } = (await request.json()) as {
//     email: string;
//     password: string;
//   };

//   const user = await User.findOne({ email });
//   if (!user) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
//   }

//   const isMatch = await comparePassword(password, user.password);
//   if (!isMatch) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
//   }

//   const token = signToken({ id: user._id, role: user.role });

//   // Build response and set HTTP‑only cookie
//   const res = NextResponse.json({
//     user: { id: user._id, name: user.name, email: user.email, role: user.role },
//   });
//   res.cookies.set("token", token, {
//     httpOnly: true,
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//     secure: process.env.NODE_ENV === "production",
//   });
//   return res;
// }

import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  await dbConnect();
  const { email, password } = (await request.json()) as { email: string; password: string };

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = signToken({ id: user._id, role: user.role });

  // Set the HTTP‑only cookie with the JWT
  const res = NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
