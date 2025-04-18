// app/api/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const blog = await Blog.findById(params.id);
  if (!blog) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ blog });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await request.json();
  const updatedBlog = await Blog.findByIdAndUpdate(
    params.id,
    { title, content, updatedAt: new Date() },
    { new: true }
  );
  return NextResponse.json({ blog: updatedBlog });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Blog deleted" });
}
