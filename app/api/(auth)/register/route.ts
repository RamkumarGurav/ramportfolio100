import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import errorHandler from "../../_utils/errorHandler";
import User from "@/lib/models/user";
import { ApiError } from "next/dist/server/api-utils";
import { encrypt, sendCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { name, email, password, avatar, role } = body;

    const newUser = new User({ name, email, password, avatar, role });

    const newRegister = await newUser.save();
    newRegister.password = undefined;
    sendCookie(newRegister, 24 * 60 * 60);

    return NextResponse.json(
      { success: true, data: newRegister },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}
