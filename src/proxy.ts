import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/items/manage", "/items/add", "/admin"];
const authRoutes = ["/login", "/register"];
const SESSION_COOKIE = "better-auth.session_token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = request.cookies.has(SESSION_COOKIE);

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
