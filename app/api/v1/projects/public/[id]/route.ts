import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import Project from "@/app/api/_api_models/projectModel";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";

export async function GET(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing project id");
    }

    const project = await Project.findOne({ _id: id, status: "active" });
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return errorHandler(error, req);
  }
}
