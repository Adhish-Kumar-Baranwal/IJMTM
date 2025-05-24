//model/Submission.js
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  title: String,
  domain: String,
  noAuthors: Number,
  authors: Array,
  documentType: String,
  abstract: String,
  pdfFileId: mongoose.Schema.Types.ObjectId,
  submissionDate: Date,
}, { collection: "submissions" });

module.exports = mongoose.model("Submission", submissionSchema);
