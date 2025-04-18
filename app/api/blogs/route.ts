// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  await dbConnect();

  // only admin can create
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = (await request.json()) as {
    title?: string;
    content?: string;
  };

  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content are required" },
      { status: 400 }
    );
  }

  const blog = await Blog.create({ title, content, published: false });
  return NextResponse.json({ blog });
}
