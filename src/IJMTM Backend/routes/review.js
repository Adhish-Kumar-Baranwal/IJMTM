import express from 'express';
import Review from '../models/Review.js';
import ResearchPaper from '../models/ResearchPaper.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Reviewer provides feedback
router.post('/:paperId/feedback', authenticate, authorizeRoles(['reviewer']), async (req, res) => {
  const { feedback, status } = req.body;
  const review = new Review({
    researchPaper: req.params.paperId,
    reviewer: req.user.id,
    feedback,
    status
  });

  try {
    await review.save();
    if (status === 'approved') {
      await ResearchPaper.findByIdAndUpdate(req.params.paperId, { status: 'approved' });
    }
    res.status(201).json({ message: 'Review submitted' });
  } catch (error) {
    res.status(400).json({ message: 'Review failed', error });
  }
});

export default router;
