import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Application from "@/app/api/_api_models/applicationModel";
/* =======================================================================
        GET ONE APPLICATION
   ======================================================================= */
export async function GET(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing application id");
    }

    const application = await Application.findById(id);
    if (!application) {
      throw new ApiError(404, "Application not found");
    }
    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        UPDATE ONE APPLICATION
   ======================================================================= */
export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const body = await req.json();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing application id");
    }

    const application = await Application.findById(id);
    if (!application) {
      throw new ApiError(404, "Application not found");
    }

    const updatedApplication = await Application.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedApplication) {
      throw new ApiError(500, "Error While Updating");
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedApplication,
        message: "Updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        DELETE ONE APPLICATION
   ======================================================================= */
export async function DELETE(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing application id");
    }

    const application = await Application.findById(id);
    if (!application) {
      throw new ApiError(404, "Application not found");
    }

    const deletedApplication = await Application.findByIdAndDelete(id);
    console.log(deletedApplication);

    if (!deletedApplication) {
      throw new ApiError(500, "Error while Deleting ");
    }

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}
