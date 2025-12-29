import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hasResult = req.cookies.get("hasResult")?.value;

  if (!hasResult) {
    return NextResponse.redirect(new URL("/analyze", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/result", "/result/:path*"],
};
