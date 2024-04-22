import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Project from "@/app/api/_api_models/projectModel";

/* =======================================================================
        GET ONE PROJECT
   ======================================================================= */
export async function GET(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing project id");
    }

    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        UPDATE ONE PROJECT
   ======================================================================= */
export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const body = await req.json();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing project id");
    }

    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProject) {
      throw new ApiError(500, "Error While Updating");
    }

    return NextResponse.json(
      { success: true, data: updatedProject, message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        DELETE ONE PROJECT
   ======================================================================= */
export async function DELETE(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing project id");
    }

    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    console.log(deletedProject);

    if (!deletedProject) {
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
