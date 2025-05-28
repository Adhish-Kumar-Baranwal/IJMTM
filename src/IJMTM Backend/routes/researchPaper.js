//route/researchPaper.js
import express from 'express';
import ResearchPaper from '../models/ResearchPaper.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';
import Submission from '../models/Submission.js';

const router = express.Router();

// GET: Recent Submissions
// router.get("/recent-submissions", async (req, res) => {
//   try {
//     const papers = await ResearchPaper.find({})
//       .populate("author", "name email") 
//       .sort({ createdAt: -1 }) 
//     res.status(200).json(papers);
//   } catch (error) {
//     console.error("Error fetching recent submissions:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// router.get("/recent-submissions", async (req, res) => {
//   try {
//     const papers = await ResearchPaper.find({ status: "Submitted" })
//       .populate("author", "name email")
//       .sort({ createdAt: -1 });

//     if (papers.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No submitted papers found" });
//     }

//     res.status(200).json(papers);
//   } catch (error) {
//     console.error("Error fetching recent submissions:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

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
  const { paperId, reviewers,deadline } = req.body;

  if (!paperId || !Array.isArray(reviewers)) {
    return res.status(400).json({ message: "Missing paperId or reviewers" });
  }

  try {
    const paper = await Submission.findById(paperId);

    if (!paper) {
      return res.status(404).json({ message: "Research paper not found" });
    }

    paper.assignedReviewers = reviewers;
    paper.status = "Assigned";
    paper.reviewDeadline = new Date(deadline);

    await paper.save();

    res.status(200).json({ message: "Reviewers assigned successfully" });
  } catch (error) {
    console.error("Error assigning reviewers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/submission/admin", async (req, res) => {
  try {
    const submissions = await Submission.find({ status: { $ne: "Submitted" } })
      .populate("assignedReviewers", "name email");

    if (submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found" });
    }

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/submission/reviewer/:reviewerId", async (req, res) => {
const { reviewerId } = req.params;

  try {
    const submissions = await Submission.find({
      assignedReviewers: reviewerId,
      status: { $ne: "Assigned" }
    })
    .populate("assignedReviewers", "name email");

    if (submissions.length === 0) {
      return res
        .status(404)
        .json({ message: "No submissions found for this reviewer" });
    }

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/submission/:reviewerId", async (req, res) => {
  const { reviewerId } = req.params;

   try {
    const submissions = await Submission.find({
      assignedReviewers: reviewerId,
      status: "Assigned"
    })
    .populate("assignedReviewers", "name email");

    if (submissions.length === 0) {
      return res
        .status(404)
        .json({ message: "No assigned submissions found for this reviewer" });
    }

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/submission/:submissionId", async (req, res) => {
  const { submissionId } = req.params;
  const { status, reviewComments } = req.body;

  try {
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.status = status;
    submission.reviewComments = reviewComments;

    await submission.save();

    res.status(200).json({ message: "Submission updated successfully" });
  } catch (error) {
    console.error("Error updating submission:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/submission/author/:authorId", async (req, res) => {
  const { authorId } = req.params;

   try {
    const submissions = await Submission.find({
      authorId: authorId,
    })

    if (submissions.length === 0) {
      return res
        .status(404)
        .json({ message: "No  submissions found for this author" });
    }

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



export default router;
