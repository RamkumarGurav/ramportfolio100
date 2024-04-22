import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import errorHandler from "./app/api/_api_lib/helpers/errorHandler";
import { isRouteProtected } from "./app/api/_api_middlewares/isRouteProtected";
import { isRouteAuthorised } from "./app/api/_api_middlewares/isRouteAuthorised";

// Export middleware functions and their corresponding matchers
export default async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const { pathname } = url;
    const method = req.method;
    const res = NextResponse.next();

    if (pathname.includes("/protected")) {
      return await isRouteProtected(req, res);
    } else if (pathname.includes("/authorised")) {
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

/* =======================================================================
        chained middlewares
   ======================================================================= */
// Define middleware stacks for different paths
// const middlewareForProtectedRoutes = chainMiddlewares([isRouteProtected]);
// const middlewareForProtectedAndAuthorisedRoutes = chainMiddlewares([
//   isRouteAuthorised,
// ]);
