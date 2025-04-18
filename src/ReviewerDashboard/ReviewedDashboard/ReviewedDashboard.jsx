import React from 'react'
import "./ReviewedDashboard.css"
import ReviewerTopBar from '../ReviewerDashboardSection/ReviewerTopBar/ReviewerTopBar'
import ReviewersPapersReviewDone from '../ReviewerDashboardSection/ReviewerGridSection/ReviewersPapersReviewDone/ReviewersPapersReviewDone'

const ReviewedDashboard = () => {
  return (
    <div className='reviewed-dashboard shadow'>
        <ReviewerTopBar />
        <div className="px-5">
            <ReviewersPapersReviewDone />
        </div>
    </div>
  )
}

export default ReviewedDashboard