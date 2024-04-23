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
      unique: true,
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
    position: {
      type: Number,
      default: 99999,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description must contain less than 200 characters"],
      minlength: [2, "Description must contain more than 2 characters"],
    },

    image: { type: String },
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

// SkillSchema.pre("save", async function (this: any, next: any) {
//   if (this.isNew) {
//     try {
//       // Find the highest position value in the existing documents
//       const highestPosition = await this.constructor
//         .findOne({}, { position: 1 })
//         .sort({ position: -1 });
//       // Set the position value for the new document
//       this.position = highestPosition ? highestPosition.position + 1 : 1;

//       next(); // Continue with the save operation
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     next();
//   }
// });

// prettier-ignore
export default mongoose.models?.skills || mongoose.model("skills", SkillSchema);
