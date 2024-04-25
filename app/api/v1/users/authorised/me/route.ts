import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import User from "@/app/api/_api_models/userModel";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
/* =======================================================================
        GET - ME
   ======================================================================= */
export async function GET(req: NextRequest) {
  try {
    await connect();
    const id = headers().get("userId");

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(403, "You are not allowed to perform this operation");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(403, "You are not allowed to perform this operation");
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return errorHandler(error, req);
  }
}
