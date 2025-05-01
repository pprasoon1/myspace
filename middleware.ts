// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /api/blogs routes (except GET)


  // Let everything else through
  return NextResponse.next();
}

// Only run this middleware on the blog API routes
export const config = {
  matcher: ["/api/blogs/:path*"],
};
