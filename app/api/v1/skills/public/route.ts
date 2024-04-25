import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Skill from "@/app/api/_api_models/skillModel";
import { type NextRequest, NextResponse } from "next/server";

/* =======================================================================
    GET ALL WITH PAGINATION
 ======================================================================= */
export async function GET(req: NextRequest) {
  try {
    await connect();

    // Extract query parameters from the request
    const searchParams = req.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "position";
    // logger(sortBy);
    const sortOrder = searchParams.get("sortOrder") || "asc";

    // Construct the filter object based on the status parameter
    const filter = { status: "active" };

    // Construct the search query
    const searchQuery = search
      ? { skillName: { $regex: new RegExp(search, "i") } } // Case-insensitive search
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

    // Get the count of total active skills

    return NextResponse.json({
      success: true,
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
