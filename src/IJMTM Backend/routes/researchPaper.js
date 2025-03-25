const express = require('express');
const ResearchPaper = require('../models/ResearchPaper');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Author uploads a research paper
router.post('/upload', authenticate, authorizeRoles(['author']), async (req, res) => {
    const { title, fileUrl } = req.body;
    const researchPaper = new ResearchPaper({ title, fileUrl, author: req.user.id });

    try {
        await researchPaper.save();
        res.status(201).json({ message: 'Research Paper submitted for review' });
    } catch (error) {
        res.status(400).json({ message: 'Upload failed', error });
    }
});

// Fetch all research papers (Admin)
router.get('/', authenticate, authorizeRoles(['admin']), async (req, res) => {
    const papers = await ResearchPaper.find().populate('author assignedReviewers');
    res.json(papers);
});

module.exports = router;
