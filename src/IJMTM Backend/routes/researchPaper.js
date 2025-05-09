//researchPaper.js
import express from 'express';
import ResearchPaper from '../models/ResearchPaper.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET: Recent Submissions
router.get("/recent-submissions", async (req, res) => {
  try {
    const papers = await ResearchPaper.find({})
      .populate("author", "name email") // Populate author details (if needed)
      .sort({ createdAt: -1 }) // Most recent first
      

    res.status(200).json(papers);
  } catch (error) {
    console.error("Error fetching recent submissions:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Author uploads a research paper
router.post("/upload-paper", async (req, res) => {
  const { title, fileUrl, author } = req.body;

  const researchPaper = new ResearchPaper({ title, fileUrl, author });

  try {
    await researchPaper.save();
    res.status(201).json({ message: "Research Paper submitted for review" });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(400).json({ message: "Upload failed", error });
  }
});


// Fetch all research papers (Admin)
router.get('/', authenticate, authorizeRoles(['admin']), async (req, res) => {
  const papers = await ResearchPaper.find().populate('author assignedReviewers');
  res.json(papers);
});

export default router;
