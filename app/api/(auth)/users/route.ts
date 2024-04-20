import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import errorHandler from "../../_utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connect();

    // Find all users
    const users = await User.find();

    // Get the count of users
    const count = await User.countDocuments();
    return NextResponse.json({ success: true, count, data: users });
  } catch (error) {
    return errorHandler(error, req);
  }
}
