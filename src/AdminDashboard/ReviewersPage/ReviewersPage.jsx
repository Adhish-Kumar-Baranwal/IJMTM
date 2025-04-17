import React from "react";
import TopBar from "../Dashboard/TopBar/TopBar";
import "./ReviewersPage.css";
import ReviewersApplied from "../Dashboard/Grid/ReviewersApplied/ReviewersApplied";
import ActiveReviewers from "./ActiveReviewers/ActiveReviewers";
import TotalReviewers from "./TotalReviewers/TotalReviewers";

const ReviewersPage = () => {
  return (
    <div className="admin-reviewer-page shadow">
      <TopBar />
      <div className="admin-reviewer-page-tables">
        <ActiveReviewers />
        <ReviewersApplied />
        <TotalReviewers />
      </div>
    </div>
  );
};

export default ReviewersPage;
