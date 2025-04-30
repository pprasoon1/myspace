// app/api/users/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  // 1) Connect to the database
  await dbConnect();

  // 2) Only admins may fetch the user list
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  // 3) Fetch all non-admin users
  const users = await User.find({ role: "user" })
    .select("_id name email")
    .lean();

  // 4) Return them
  return NextResponse.json({ users });
}
