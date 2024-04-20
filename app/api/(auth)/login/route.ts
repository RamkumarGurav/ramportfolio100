import connect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import errorHandler from "../../_utils/errorHandler";
import User from "@/lib/models/user";
import { ApiError } from "next/dist/server/api-utils";
import { encrypt, sendCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { logger } from "@/utils/logger";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { email, password } = body;
    //IMPstep1) we check if email and password exist in the inputted body if they exit then move to step2
    if (!email || !password) {
      throw new ApiError(400, "Please provide email and password!");
    }

    const user = await User.findOne({
      email: email,
      password: password,
    }).select("+password"); ///user document which includes password as a field -because in user model we made select as false for password to not show in output

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      //if there is no user exists in DB or password is incorrect then give error else move to step3
      throw new ApiError(400, "Invalid Email or Password!"); //401-unathorised
    }

    logger(user);
    // user.password = undefined;
    // // Create the session
    // const expires = new Date(Date.now() + 10 * 1000);
    // const session = await encrypt({ user, expires });

    // // Save the session in a cookie
    // cookies().set("session", session, { expires, httpOnly: true });

    sendCookie(user, 24 * 60 * 60);

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return errorHandler(error, req);
  }
}
