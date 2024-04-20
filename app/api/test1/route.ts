import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import errorHandler from "../_utils/errorHandler";
import { cookies } from "next/headers";
import { logger } from "@/utils/logger";

export async function GET(req: NextRequest) {
  try {
    const expires = new Date(Date.now() + 120 * 1000);
    const session = "ram";

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    return NextResponse.json(
      {
        status: true,
        statusCode: 200,
        message: "Welcome to our api",
      },
      {
        status: 200, // Explicitly set the status code to 200
      }
    );
  } catch (err) {
    return errorHandler(err, req);
  }
}
