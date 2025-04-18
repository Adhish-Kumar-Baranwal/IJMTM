import React from "react";
import "./ReviewerGridSection.css";
import ReviewerStatCard from "./ReviewerStatCard/ReviewerStatCard";
import ReviewersPapersAssigned from "./ReviewersPapersAssigned/ReviewersPapersAssigned";
import ReviewersPapersReviewDone from "./ReviewersPapersReviewDone/ReviewersPapersReviewDone";

const ReviewerGridSection = () => {
  return (
    <div className="reviewer-main-dashboard-grid">
        <ReviewerStatCard />
        <ReviewersPapersAssigned />
        <ReviewersPapersReviewDone />
    </div>
  );
};

export default ReviewerGridSection;
