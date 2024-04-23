import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Skill from "@/app/api/_api_models/skillModel";
import { ApiError } from "next/dist/server/api-utils";
import { type NextRequest, NextResponse } from "next/server";

/* =======================================================================
            CREATE SKILL
   ======================================================================= */
export async function POST(req: NextRequest) {
  try {
    await connect();

    const { skillName, level, description, image, position, status } =
      await req.json();
    let skillBody = { skillName, level, description, image, position, status };

    const skill = new Skill({ ...skillBody });
    const newSkill = await skill.save();
    if (!newSkill) {
      throw new ApiError(500, "Error while creating new skill");
    }

    return NextResponse.json(
      { success: true, data: newSkill },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
    GET ALL WITH PAGINATION
 ======================================================================= */
export async function GET(req: NextRequest) {
  try {
    await connect();

    // Extract query parameters from the request
    const searchParams = req.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "position";
    // logger(sortBy);
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const status = searchParams.get("status") || "";
    // Construct the filter object based on the status parameter
    const filter = status ? { status } : {};

    // Construct the search query
    // const searchQuery = search ? { $text: { $name: search } } : {};
    // Construct the search query using prepared regular expression
    const searchQuery = search
      ? { name: { $regex: new RegExp(search, "i") } } // Case-insensitive search
      : {};

    // Find skills based on the filter and search query
    const skills = await Skill.find({
      ...filter,
      ...searchQuery,
    })
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 }) // Sort skills based on sortBy and sortOrder
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit the number of documents returned per page

    // Get the total count of skills matching the filter and search query
    const count = await Skill.countDocuments({
      ...filter,
      ...searchQuery,
    });

    // Get the count of found skills
    const totalCount = await Skill.countDocuments();
    // Get the count of found skills
    const activeCount = await Skill.countDocuments({ status: "active" });

    return NextResponse.json({
      success: true,
      activeCount,
      totalCount,
      count,
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(count / limit),
      data: skills,
    });
  } catch (error) {
    return errorHandler(error, req);
  }
}
