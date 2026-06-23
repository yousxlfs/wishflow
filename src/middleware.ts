import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, appRoutes } from "@/lib/auth/routes";

// import { auth } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Главная всегда ведёт на вход
  if (pathname === appRoutes.home) {
    return NextResponse.redirect(new URL(authRoutes.signIn, request.url));
  }

  // TODO: раскомментируй, когда подключишь auth()
  //
  // const session = await auth();
  //
  // const isProtected = protectedRoutes.some((route) =>
  //   pathname.startsWith(route),
  // );
  // const isAuthPage =
  //   pathname === authRoutes.signIn || pathname === authRoutes.signUp;
  //
  // if (isProtected && !session) {
  //   return NextResponse.redirect(new URL(authRoutes.signIn, request.url));
  // }
  //
  // if (isAuthPage && session) {
  //   return NextResponse.redirect(new URL(appRoutes.dashboard, request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/main/:path*", "/auth/signin", "/auth/signup"],
};
