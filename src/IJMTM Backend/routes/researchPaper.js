//route/researchPaper.js
import express from 'express';
import ResearchPaper from '../models/ResearchPaper.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET: Recent Submissions
router.get("/recent-submissions", async (req, res) => {
  try {
    const papers = await ResearchPaper.find({})
      .populate("author", "name email") 
      .sort({ createdAt: -1 }) 
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

// Assign reviewers to a paper
router.post("/assign-reviewers", async (req, res) => {
  const { paperId, reviewers } = req.body;

  if (!paperId || !Array.isArray(reviewers)) {
    return res.status(400).json({ message: "Missing paperId or reviewers" });
  }

  try {
    const paper = await ResearchPaper.findById(paperId);

    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" });
    }

    paper.assignedReviewers = reviewers;
    paper.reviewDeadline = new Date(deadline);

    await paper.save();

    res.status(200).json({ message: "Reviewers assigned successfully" });
  } catch (error) {
    console.error("Error assigning reviewers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
