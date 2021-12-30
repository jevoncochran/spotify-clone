import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow the request if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes("/images") || pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect to login if no token AND requesting a protected route
  if (!token && pathname !== "/login") {
    if (!token) {
      console.log("THERE IS NO TOKEN");
    }
    return NextResponse.redirect("/login");
  }
};
