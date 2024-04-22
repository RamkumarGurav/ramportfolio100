import mongoose from "mongoose";

// Define the enum for product status
const ProductStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
  DISCONTINUED: "discontinued",
  OUT_OF_STOCK: "out_of_stock",
  COMING_SOON: "coming_soon",
  PRE_ORDER: "pre_order",
  LIMITED_EDITION: "limited_edition",
  ON_SALE: "on_sale",
  NEW: "new",
  BACKORDERED: "backordered",
};

const ProductSchema: any = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: "default.jpg" },
    protectedInfo: {
      type: String,
      default: "only user can see me",
    },
    authorisedInfo: {
      type: String,
      default: "only admin can see me",
    },
    status: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.ACTIVE,
    },
    addedBy: { type: mongoose.Schema.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

// prettier-ignore
export default mongoose.models?.products || mongoose.model("products", ProductSchema);
