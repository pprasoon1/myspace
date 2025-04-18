// app/api/blogs/[id]/toggle/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const blog = await Blog.findById(params.id);
  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  blog.published = !blog.published;
  await blog.save();
  return NextResponse.json({ blog });
}
