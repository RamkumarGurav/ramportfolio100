import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Skill from "@/app/api/_api_models/skillModel";

/* =======================================================================
        GET ONE SKILL
   ======================================================================= */
export async function GET(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing skill id");
    }

    const skill = await Skill.findById(id);
    if (!skill) {
      throw new ApiError(404, "Skill not found");
    }
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        UPDATE ONE SKILL
   ======================================================================= */
export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const body = await req.json();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing skill id");
    }

    const skill = await Skill.findById(id);
    if (!skill) {
      throw new ApiError(404, "Skill not found");
    }

    const updatedSkill = await Skill.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedSkill) {
      throw new ApiError(500, "Error While Updating");
    }

    return NextResponse.json(
      { success: true, data: updatedSkill, message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        DELETE ONE SKILL
   ======================================================================= */
export async function DELETE(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing skill id");
    }

    const skill = await Skill.findById(id);
    if (!skill) {
      throw new ApiError(404, "Skill not found");
    }

    const deletedSkill = await Skill.findByIdAndDelete(id);
    console.log(deletedSkill);

    if (!deletedSkill) {
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
