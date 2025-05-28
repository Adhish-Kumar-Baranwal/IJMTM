//model/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  title: String,
  domain: String,
  noAuthors: Number,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authors: Array,
  documentType: String,
  abstract: String,
  pdfFileId: mongoose.Schema.Types.ObjectId,
  submissionDate: Date,
  assignedReviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer' }],
  status: { type: String , default: 'Submitted' },
  reviewDeadline: { type: Date },
  reviewComments: {type: String},
}, { collection: "submissions" });

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;


