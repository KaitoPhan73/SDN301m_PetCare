import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateAdminPaths = ["/admin/"];
const authPaths = ["/login", "/register"];
const privateCustomerPaths = ["/profile/"];
const publicPaths = ["/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRaw = request.cookies.get("user")?.value;
  const user = userRaw ? JSON.parse(userRaw) : null;

  if (
    privateCustomerPaths.some((path) => pathname.startsWith(path)) &&
    !(user && user.role === "Customer")
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/logout", request.url));
    } else {
      return NextResponse.redirect(new URL(pathname, request.url));
    }
  }

  if (
    privateAdminPaths.some((path) => pathname.startsWith(path)) &&
    !(user && user.role === "Admin")
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/logout", request.url));
    } else {
      return NextResponse.redirect(new URL("/admin/users", request.url));
    }
  }

  if (authPaths.some((path) => pathname.startsWith(path)) && user) {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/admin/:path*", "/profile/:path*"],
};
