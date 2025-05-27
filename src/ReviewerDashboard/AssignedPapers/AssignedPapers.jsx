import React from 'react';
import "./AssignedPapers.css";
import ReviewerTopBar from '../ReviewerDashboardSection/ReviewerTopBar/ReviewerTopBar';
import ReviewersPapersAssigned from '../ReviewerDashboardSection/ReviewerGridSection/ReviewersPapersAssigned/ReviewersPapersAssigned';

const AssignedPapers = () => {
  // Get reviewer ID from localStorage (or use context/store)
  const reviewerId = localStorage.getItem("reviewerId");

  return (
    <div className='assigned-dashboard shadow'>
      <ReviewerTopBar />
      <div className="px-5">
        {/* ✅ Pass reviewerId as prop */}
        <ReviewersPapersAssigned reviewerId={reviewerId} />
      </div>
    </div>
  );
};

export default AssignedPapers;
