import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Project from "@/app/api/_api_models/projectModel";
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
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "position";
    // logger(sortBy);
    const sortOrder = searchParams.get("sortOrder") || "asc";

    // Construct the filter object based on the status parameter
    const filter = { status: "active" };

    // Construct the search query
    const searchQuery = search
      ? { projectName: { $regex: new RegExp(search, "i") } } // Case-insensitive search
      : {};

    // Find projects based on the filter and search query
    const projects = await Project.find({
      ...filter,
      ...searchQuery,
    })
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 }) // Sort projects based on sortBy and sortOrder
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit the number of documents returned per page

    // Get the total count of projects matching the filter and search query
    const count = await Project.countDocuments({
      ...filter,
      ...searchQuery,
    });

    // Get the count of found projects

    // Get the count of total active projects

    return NextResponse.json({
      success: true,
      count,
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(count / limit),
      data: projects,
    });
  } catch (error) {
    return errorHandler(error, req);
  }
}
