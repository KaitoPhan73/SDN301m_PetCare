import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/dashboard/"];
const authPaths = ["/login", "/register"];
const publicPaths = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRaw = request.cookies.get("user")?.value;
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (
    privatePaths.some((path) => pathname.startsWith(path)) &&
    !(user && user.role === "Admin")
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/logout", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard/revenue", request.url));
    }
  }

  if (authPaths.some((path) => pathname.startsWith(path)) && user) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
