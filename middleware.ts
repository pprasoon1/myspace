// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /api/blogs routes (except GET)
  if (pathname.startsWith("/api/blogs") && req.method !== "GET") {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
      const { role } = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
        role: string;
      };
      if (role !== "admin") {
        return new NextResponse("Forbidden", { status: 403 });
      }
    } catch (err) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  // Let everything else through
  return NextResponse.next();
}

// Only run this middleware on the blog API routes
export const config = {
  matcher: ["/api/blogs/:path*"],
};
