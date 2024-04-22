import { logger } from "@/lib/frontend_lib/helpers/logger";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../_api_models/userModel";
import connect from "../_api_database/db";
import errorHandler from "../_api_lib/helpers/errorHandler";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function sendCookie(data: any, seconds: number) {
  if (data == null && seconds == 0) {
    cookies().set("session", "", { expires: new Date(0) });
    // logger("empty cookie");
  } else {
    const expires = new Date(Date.now() + seconds * 1000);
    const session = await encrypt({ data: data, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    // logger("solid cookie");
  }
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// export async function login(formData: FormData) {
//   // Verify credentials && get the user

//   const { email, password } = req.body;
//   //IMPstep1) we check if email and password exist in the inputted body if they exit then move to step2
//   if (!email || !password) {
//     return next(new AppError("Pleases provide email and password!", 400)); //400-bad request
//   }
//   //IMPstep2)checking if user exist by chicking whether given email exists in users collection then if the inputted password is compared with the  userpassword that is stored data base-if both matches then move to step3 and  create token and send it to client
//   const user = await User.findOne({ email: email }).select("+password"); ///user document which includes password as a field -because in user model we made select as false for password to not show in output

//   if (!user || !(await user.isPasswordCorrect(password, user.password))) {
//     //if there is no user exists in DB or password is incorrect then give error else move to step3
//     return next(new AppError("Invalid email or password", 401)); //401-unathorised
//   }

//   const user = { email: formData.get("email"), name: "John" };

//   // Create the session
//   const expires = new Date(Date.now() + 10 * 1000);
//   const session = await encrypt({ user, expires });

//   // Save the session in a cookie
//   cookies().set("session", session, { expires, httpOnly: true });
// }

// export async function logout() {
//   // Destroy the session
//   cookies().set("session", "", { expires: new Date(0) });
// }

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
