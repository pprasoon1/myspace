import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";
import { getCurrentUser } from "@/lib/auth";

// Define a more specific type for your handler context
type BlogRouteContext = {
  params: {
    id: string;
  };
};

export async function GET(
  req: Request,
  context: BlogRouteContext
) {
  await dbConnect();
  const id = context.params.id;
  const blog = await Blog.findById(id);
  
  if (!blog) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  
  return NextResponse.json({ blog });
}

export async function PUT(
  req: Request,
  context: BlogRouteContext
) {
  await dbConnect();
  const user = await getCurrentUser();
  
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();
  const updatedBlog = await Blog.findByIdAndUpdate(
    context.params.id,
    { title, content, updatedAt: new Date() },
    { new: true }
  );
  
  return NextResponse.json({ blog: updatedBlog });
}

export async function DELETE(
  req: Request,
  context: BlogRouteContext
) {
  await dbConnect();
  const user = await getCurrentUser();
  
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await Blog.findByIdAndDelete(context.params.id);
  return NextResponse.json({ message: "Blog deleted" });
}