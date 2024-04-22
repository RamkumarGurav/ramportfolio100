import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import User from "@/app/api/_api_models/userModel";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import { sendCookie } from "@/app/api/_api_auth/auth";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { email, password } = body;
    //IMPstep1) we check if email and password exist in the inputted body if they exit then move to step2
    if (!email || !password) {
      throw new ApiError(400, "Please provide email and password!");
    }

    const user: any = await User.findOne({
      email: email,
    }).select("+password"); ///user document which includes password as a field -because in user model we made select as false for password to not show in output

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      //if there is no user exists in DB or password is incorrect then give error else move to step3
      throw new ApiError(400, "Invalid Email or Password!"); //401-unathorised
    }

    if (!user.isVerified) {
      throw new ApiError(400, "Please Verify your account!");
    }

    const userData: any = {
      _id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    await sendCookie(userData, 7 * 24 * 60 * 60);

    return NextResponse.json(
      { success: true, data: userData },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}
