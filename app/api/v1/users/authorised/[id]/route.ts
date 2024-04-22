import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import User from "@/app/api/_api_models/userModel";

// /* =======================================================================
//         GET ONE USER
//    ======================================================================= */
// export async function GET(req: NextRequest, context: { params: any }) {
//   try {
//     await connect();
//     const id = context.params.id;

//     if (!id || !Types.ObjectId.isValid(id)) {
//       throw new ApiError(400, "Invalid or missing user id");
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       throw new ApiError(404, "User not found");
//     }
//     return NextResponse.json({ success: true, data: user });
//   } catch (error) {
//     return errorHandler(error, req);
//   }
// }

/* =======================================================================
        UPDATE ONE USER
   ======================================================================= */
export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const body = await req.json();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing user id");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedUser) {
      throw new ApiError(500, "Error While Updating");
    }

    return NextResponse.json(
      { success: true, data: updatedUser, message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}

// /* =======================================================================
//         DELETE ONE USER
//    ======================================================================= */
// export async function DELETE(req: NextRequest, context: { params: any }) {
//   try {
//     await connect();
//     const id = context.params.id;

//     if (!id || !Types.ObjectId.isValid(id)) {
//       throw new ApiError(400, "Invalid or missing user id");
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       throw new ApiError(404, "User not found");
//     }

//     const deletedUser = await User.findByIdAndDelete(id);
//     console.log(deletedUser);

//     if (!deletedUser) {
//       throw new ApiError(500, "Error while Deleting ");
//     }

//     return NextResponse.json(
//       { success: true, message: "Deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return errorHandler(error, req);
//   }
// }
