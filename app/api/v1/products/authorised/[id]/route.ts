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

    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        UPDATE ONE PRODUCT
   ======================================================================= */
export async function PATCH(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const body = await req.json();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing product id");
    }

    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProduct) {
      throw new ApiError(500, "Error While Updating");
    }

    return NextResponse.json(
      { success: true, data: updatedProduct, message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, req);
  }
}

/* =======================================================================
        DELETE ONE PRODUCT
   ======================================================================= */
export async function DELETE(req: NextRequest, context: { params: any }) {
  try {
    await connect();
    const id = context.params.id;

    if (!id || !Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid or missing product id");
    }

    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log(deletedProduct);

    if (!deletedProduct) {
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
