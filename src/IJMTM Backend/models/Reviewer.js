// models/Reviewer.js
import mongoose from "mongoose";

const ReviewerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  domain: { type: String, required: true },
  institute: { type: String, required: true },
  whyBeReviewer: { type: String, required: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  status: {
    type: String,
     enum: ["Pending", "Approved", "Rejected"],
    default: "Pending", // So admin can approve later
  },
  appliedDate: { type: Date, default: Date.now }, // New field added
}, { timestamps: true });

const Reviewer = mongoose.model("Reviewer", ReviewerSchema);
export default Reviewer;

