import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Application from "@/app/api/_api_models/applicationModel";
import { ApiError } from "next/dist/server/api-utils";
import { type NextRequest, NextResponse } from "next/server";

/* =======================================================================
            CREATE APPLICATION
   ======================================================================= */
export async function POST(req: NextRequest) {
  try {
    await connect();

    const {
      companyName,
      aboutCompany,
      resumeName,
      applied,
      gotResponse,
      interviewArranged,
      progressComments,
      hired,
      status,
    } = await req.json();
    let applicationBody = {
      companyName,
      aboutCompany,
      resumeName,
      applied,
      gotResponse,
      interviewArranged,
      progressComments,
      hired,
      status,
    };

    const application = new Application({ ...applicationBody });
    const newApplication = await application.save();
    if (!newApplication) {
      throw new ApiError(500, "Error while creating new application");
    }

    return NextResponse.json(
      { success: true, data: newApplication },
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
    const sortBy = searchParams.get("sortBy") || "createdAt";
    // logger(sortBy);
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const status = searchParams.get("status") || "";
    // Construct the filter object based on the status parameter
    const filter = status ? { status } : {};

    // Construct the search query
    // const searchQuery = search ? { $text: { $name: search } } : {};
    // Construct the search query using prepared regular expression
    const searchQuery = search
      ? { name: { $regex: new RegExp(search, "i") } } // Case-insensitive search
      : {};

    // Find applications based on the filter and search query
    const applications = await Application.find({
      ...filter,
      ...searchQuery,
    })
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 }) // Sort applications based on sortBy and sortOrder
      .skip((page - 1) * limit) // Skip documents based on pagination
      .limit(limit); // Limit the number of documents returned per page

    // Get the total count of applications matching the filter and search query
    const count = await Application.countDocuments({
      ...filter,
      ...searchQuery,
    });

    // Get the count of found applications
    const totalCount = await Application.countDocuments();

    // Get the count of total active applications
    const activeCount = await Application.countDocuments({ status: "active" });

    return NextResponse.json({
      success: true,
      activeCount,
      totalCount,
      count,
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(count / limit),
      data: applications,
    });
  } catch (error) {
    return errorHandler(error, req);
  }
}
