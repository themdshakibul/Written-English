import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/items/manage", "/items/add"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for our dummy auth token (In reality, Better-Auth session cookie)
  const token = request.cookies.get("auth-token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If the user is trying to access a protected route and is not logged in
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is logged in and tries to access login/register
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }

  return NextResponse.next();
}

// Ensure the middleware runs only on specific paths to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
