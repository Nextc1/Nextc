// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const supabase = createMiddlewareClient({ req, res: NextResponse.next() });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;
  if (pathname === "/kyc" && !session) {
    return NextResponse.redirect(new URL("/api/auth/signup", req.url));
  }

  return NextResponse.next();
}
