import React from 'react'
import "./ReviewerDashboardSection.css"
import ReviewerTopBar from './ReviewerTopBar/ReviewerTopBar'
import ReviewerGridSection from './ReviewerGridSection/ReviewerGridSection'

const ReviewerDashboardSection = () => {
  return (
    <div className='reviewer-main-dashboard shadow'>
        <ReviewerTopBar />
        <ReviewerGridSection />
    </div>
  )
}

export default ReviewerDashboardSection