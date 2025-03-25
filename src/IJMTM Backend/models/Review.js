const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    researchPaper: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchPaper', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feedback: { type: String, required: true },
    status: { type: String, enum: ['pending', 'rejected', 'approved'], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
