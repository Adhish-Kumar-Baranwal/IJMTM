import React from 'react'
import ReviewerAccount from './ReviewerAccount/ReviewerAccount'
import ReviewerRouteSelect from './ReviewerRouteSelect/ReviewerRouteSelect'

const ReviewerSideBar = () => {
  return (
    <div className='bg-stone-100'>
        <div className='sticky top-4 h-[94vh]'>
          <ReviewerAccount />
          <ReviewerRouteSelect />
        </div>
    </div>
  )
}

export default ReviewerSideBar