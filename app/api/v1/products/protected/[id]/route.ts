import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import connect from "@/app/api/_api_database/db";
import errorHandler from "@/app/api/_api_lib/helpers/errorHandler";
import Product from "@/app/api/_api_models/productModel";

/* =======================================================================
        GET ONE PRODUCT
   ======================================================================= */
export async function GET(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing product id");
    }

    const product = await Product.findOne({ _id: id, status: "active" }).select(
      "-authorisedInfo"
    );
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return errorHandler(error, req);
  }
}
