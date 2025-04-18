import React from 'react'
import "./AssignedPapers.css"
import ReviewerTopBar from '../ReviewerDashboardSection/ReviewerTopBar/ReviewerTopBar'
import ReviewersPapersAssigned from '../ReviewerDashboardSection/ReviewerGridSection/ReviewersPapersAssigned/ReviewersPapersAssigned'

const AssignedPapers = () => {
  return (
    <div className='assigned-dashboard shadow'>
        <ReviewerTopBar />
        <div className="px-5">
            <ReviewersPapersAssigned />
        </div>
    </div>
  )
}

export default AssignedPapers