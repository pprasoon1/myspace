

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth"; // assumes you have this util
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json(user);
}
