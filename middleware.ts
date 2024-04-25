import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import errorHandler from "./app/api/_api_lib/helpers/errorHandler";
import { isRouteProtected } from "./app/api/_api_middlewares/isRouteProtected";
import { isRouteAuthorised } from "./app/api/_api_middlewares/isRouteAuthorised";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./app/api/_api_auth/routes";

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    // Clone the request headers
    // ADDING BASEURL TO EVERY INCOMING REQUEST HEADER
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-base-url", req.url);

    const res = NextResponse.next({ request: { headers: requestHeaders } });

    if (
      pathname.startsWith("/secure-region") ||
      pathname.startsWith("/api/v1/projects/authorised") ||
      pathname.startsWith("/api/v1/skills/authorised") ||
      pathname.startsWith("/api/v1/job-applications/authorised")
    ) {
      return await isRouteAuthorised(req, res);
    } else {
      return res;
    }
  } catch (error) {
    return errorHandler(error, req);
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

// // Export middleware functions and their corresponding matchers
// export default async function middleware(req: NextRequest) {
//   try {
//     const url = req.nextUrl;
//     const { pathname } = url;
//     const method = req.method;
//     const res = NextResponse.next();

//     if (pathname.includes("/protected")) {
//       return await isRouteProtected(req, res);
//     } else if (pathname.includes("/authorised")) {
//       return await isRouteAuthorised(req, res);
//     } else {
//       return res;
//     }
//   } catch (error) {
//     return errorHandler(error, req);
//   }
// }
/* =======================================================================
        new matcher from clerk 
   ======================================================================= */

// export const config = {

//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

/* =======================================================================
        chained middlewares
   ======================================================================= */
// Define middleware stacks for different paths
// const middlewareForProtectedRoutes = chainMiddlewares([isRouteProtected]);
// const middlewareForProtectedAndAuthorisedRoutes = chainMiddlewares([
//   isRouteAuthorised,
// ]);
