import mongoose from "mongoose";

const ReviewerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  publishedPapers: { type: String, required: true },
  password: { type: String, required: true }, // Password for login
}, { timestamps: true });

export default mongoose.model("Reviewer", ReviewerSchema);
