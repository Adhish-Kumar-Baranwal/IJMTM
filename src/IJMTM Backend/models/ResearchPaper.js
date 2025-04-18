import mongoose from 'mongoose';

const ResearchPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'rejected', 'approved'], default: 'pending' },
  assignedReviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  submissionDate: { type: Date, default: Date.now }
});

const ResearchPaper = mongoose.model('ResearchPaper', ResearchPaperSchema);
export default ResearchPaper;
