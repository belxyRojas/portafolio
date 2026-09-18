import { NextResponse } from "next/server";
import type { NextProxy } from "next/server";

export const proxy: NextProxy = () => {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
};

export const config = {
  matcher: ["/vault", "/vault/:path*"],
};
