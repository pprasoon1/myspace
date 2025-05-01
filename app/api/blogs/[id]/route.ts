// app/api/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import { getCurrentUser } from "@/lib/auth";

interface Params {
  id: string;
}

// GET /api/blogs/:id
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  await dbConnect();
  const blog = await Blog.findById(params.id);
  if (!blog) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ blog });
}

// PUT /api/blogs/:id
export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  await dbConnect();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await request.json();
  const updated = await Blog.findByIdAndUpdate(
    params.id,
    { title, content, updatedAt: new Date() },
    { new: true }
  );
  if (!updated) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ blog: updated });
}

// DELETE /api/blogs/:id
export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  await dbConnect();
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const deleted = await Blog.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Blog deleted" });
}
