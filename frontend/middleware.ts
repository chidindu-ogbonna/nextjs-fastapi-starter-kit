import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import axios from "axios";

export const config = {
  matcher: ["/((?!api/auth/verify).*api/.*)"]
};

export async function middleware(req: NextRequest) {
  try {
    if (req.nextUrl.pathname.includes("/api/webhooks")) {
      return NextResponse.next();
    }
    const verifyURL = new URL(
      "/api/auth/verify",
      process.env.PUBLIC_API_URL || req.url
    );
    const authHeader = headers().get("Authorization");
    const response = await axios.post(
      verifyURL.toString(),
      {},
      { headers: { Authorization: authHeader } }
    );
    const newResponse = NextResponse.next();
    newResponse.headers.set("x-user", JSON.stringify(response.data.data));
    return newResponse;
  } catch (error) {
    console.error(`[MIDDLEWARE] error: ${error}`);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }
}
