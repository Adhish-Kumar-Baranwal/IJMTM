// models/Assignment.js
import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviewer', required: true },
  assignedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Assigned' },
  deadline: { type: Date }
});

export default mongoose.model('Assignment', assignmentSchema);
