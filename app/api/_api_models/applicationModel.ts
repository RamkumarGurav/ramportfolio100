import mongoose from "mongoose";

// Define the enum for application status
const ApplicationStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

const ApplicationSchema: any = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    aboutCompany: String,
    resumeName: { type: String, required: true },
    applied: { type: Boolean, required: true, default: true },
    gotResponse: { type: Boolean, required: true, default: false },
    interviewArranged: { type: Boolean, required: true, default: false },
    hired: { type: Boolean, required: true, default: false },
    progressComments: String,
    status: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.ACTIVE,
    },
    addedBy: { type: mongoose.Schema.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

// prettier-ignore
export default mongoose.models?.applications || mongoose.model("applications", ApplicationSchema);
