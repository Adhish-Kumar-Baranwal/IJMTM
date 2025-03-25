const mongoose = require('mongoose');

const ResearchPaperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, required: true }, // PDF file storage URL
    status: { type: String, enum: ['pending', 'rejected', 'approved'], default: 'pending' },
    assignedReviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResearchPaper', ResearchPaperSchema);
