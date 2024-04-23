import mongoose from "mongoose";

// Define the enum for project status
const Status = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

const ProjectSchema: any = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Please enter your Project Name"],
      trim: true,
      maxlength: [50, "name must contain less than 50 characters"],
      minlength: [2, "name must contain more than 2 characters"],
    },
    url: {
      type: String,
      required: [true, "Please enter your project Url"],
      trim: true,
      maxlength: [200, "Url must contain less than 200 characters"],
      minlength: [3, "Url must contain more than 3 characters"],
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
    addedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// ProjectSchema.pre("save", async function (this: any, next: any) {
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
export default mongoose.models?.projects || mongoose.model("projects", ProjectSchema);
