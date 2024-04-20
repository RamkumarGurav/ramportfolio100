import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import errorHandler from "../../_utils/errorHandler";
import User from "@/lib/models/user";
import { ApiError } from "next/dist/server/api-utils";
import { encrypt, sendCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // Save the session in a cookie
    // cookies().set("session", "", { expires: new Date(0) });
    sendCookie(null, 0);
    return NextResponse.json(
      { success: true, message: "Successfully logged out" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}
