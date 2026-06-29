import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { appRoutes, authRoutes, protectedRoutes } from "@/lib/auth/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === appRoutes.home) {
    return NextResponse.redirect(new URL(authRoutes.signIn, request.url));
  }

  const session = await auth();
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthPage =
    pathname === authRoutes.signIn || pathname === authRoutes.signUp;

  if (isProtected && !session) {
    return NextResponse.redirect(new URL(authRoutes.signIn, request.url));
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL(appRoutes.profileEdit, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/main/:path*", "/auth/signin", "/auth/signup"],
};
