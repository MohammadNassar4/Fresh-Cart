import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const protectedRoutes = [
    "/cart",
    "/wishlist",
    "/allorders",
    "/profile/addresses",
    "/profile/settings",
    "/profile",
  ];
  const authRoutes = ["/login", "/register"];
  const pathName = req.nextUrl.pathname;

  const myToken = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = myToken?.token;

  if (
    !accessToken &&
    protectedRoutes.some((path) => pathName.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (accessToken && authRoutes.some((path) => pathName.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/allorders/:path*",
    "/profile/:path*",
    "/login/:path*",
    "/register/:path*",
    "/profile/addresses/:path*",
    "/profile/settings/:path*",
  ],
};
