import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/proxy";

const handleI18n = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Area admin: tanpa locale, hanya penyegaran sesi login.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }
  return handleI18n(request);
}

export const config = {
  matcher: ["/", "/(id|en)/:path*", "/admin/:path*"],
};
