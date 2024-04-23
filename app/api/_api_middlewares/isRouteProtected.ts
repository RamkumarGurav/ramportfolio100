import { NextRequest, NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { ApiError } from "next/dist/server/api-utils";
import { decrypt, encrypt, sendCookie } from "../_api_auth/auth";
import errorHandler from "../_api_lib/helpers/errorHandler";

export async function isRouteProtected(req: NextRequest, res: NextResponse) {
  try {
    const headersList = headers();
    const cookieStore = cookies();
    let token;

    if (
      headersList.get("Authorization") &&
      headersList.get("Authorization")?.startsWith("Bearer")
    ) {
      token = headersList.get("Authorization")?.split(" ")[1]; //jwt token that is sent in headers authorization field
    } else if (cookieStore.get("session")) {
      //if there is jwt in cookie
      token = cookieStore.get("session")?.value;
    }

    if (!token) {
      //if there is no token in the req,  means user is not logged in and error is generated
      throw new ApiError(
        401,
        "You are not logged in! Please login to get access"
      );
    }

    const jwtPayload = await decrypt(token);
    const userData = { ...jwtPayload.data };

    if (!userData) {
      throw new ApiError(
        401,
        "The user belonging to this token no longer exists"
      );
    }

    // console.log("userDATA", userData);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 7 * 1000);
    const session = await encrypt({ data: userData, expires });
    console.log("SESSESION", session);
    res.cookies.set("session", session, { expires, httpOnly: true });
    res.headers.set("userId", userData.id);
    return res;
  } catch (error) {
    return errorHandler(error, req);
  }
}
