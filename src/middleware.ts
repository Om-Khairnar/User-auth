import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // Redirect authenticated users away from login/register pages
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!isPublicPath && !token) {
    // Redirect unauthenticated users to the login page if they try to access protected routes
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/profile"],
};
