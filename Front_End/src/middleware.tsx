import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/dashboard/users"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const accessToken = request.cookies.get("accessToken")?.value;
  // console.log("accessToken", accessToken);
  // Chưa đăng nhập thì không cho vào private paths
  // if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // // Đăng nhập rồi thì không cho vào login/register nữa
  // if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
  //   return NextResponse.redirect(new URL("/dashboard/brand", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
