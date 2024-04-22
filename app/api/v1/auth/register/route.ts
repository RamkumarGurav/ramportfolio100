import { sendCookie } from "@/app/api/_api_auth/auth";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import User from "@/app/api/_api_models/userModel";
import { ApiError } from "next/dist/server/api-utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const registerToken = headers().get("register-token")
      ? headers().get("register-token")
      : "";
    if (registerToken === "1JS15ec071@") {
      const body = await req.json();
      const { name, email, password, avatar, role } = body;

      const newUser = new User({ name, email, password, avatar, role });

      const newRegister = await newUser.save();
      if (!newRegister) {
        throw new ApiError(500, "Error while creating new user");
      }
      const userData: any = { ...newRegister };
      delete userData.password;
      await sendCookie(userData, 7 * 24 * 60 * 60);

      return NextResponse.json(
        { success: true, message: "New user created successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "You are not allowed to perform this action",
        },
        { status: 403 }
      );
    }
  } catch (error) {
    return errorHandler(error, req);
  }
}
