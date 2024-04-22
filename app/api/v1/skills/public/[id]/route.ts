import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import Skill from "@/app/api/_api_models/skillModel";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";

export async function GET(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing skill id");
    }

    const skill = await Skill.findOne({ _id: id, status: "active" });
    if (!skill) {
      throw new ApiError(404, "Skill not found");
    }
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return errorHandler(error, req);
  }
}
