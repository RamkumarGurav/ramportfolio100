import mongoose from "mongoose";

// Define the enum for skill status
const Status = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

const SkillSchema: any = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, "Please enter your Skill Name"],
      trim: true,
      maxlength: [50, "name must contain less than 50 characters"],
      minlength: [2, "name must contain more than 2 characters"],
    },
    level: {
      type: Number,
      required: [true, "Please enter your skill level "],
      min: [0, "Level cannot be negative"], // Minimum price validation
      max: [100, "Level cannot exceed 100"], // Maximum price validation
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description must contain less than 200 characters"],
      minlength: [2, "Description must contain more than 2 characters"],
    },

    image: { type: String, default: "default.jpg" },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    },
    addedBy: { type: mongoose.Schema.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

// prettier-ignore
export default mongoose.models?.skills || mongoose.model("skills", SkillSchema);
