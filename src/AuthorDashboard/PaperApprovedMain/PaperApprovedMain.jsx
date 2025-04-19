import React from 'react'
import './PaperApprovedMain.css'
import AuthorTopBar from '../AuthorDashboardSection/AuthorTopBar/AuthorTopBar'
import PapersApproved from '../AuthorDashboardSection/PapersApproved/PapersApproved'

const PaperApprovedMain = () => {
  return (
    <div className='author-ppr-approved-page shadow'>
        <AuthorTopBar />
        <div className="px-5">
            <PapersApproved />
        </div>
    </div>
  )
}

export default PaperApprovedMain