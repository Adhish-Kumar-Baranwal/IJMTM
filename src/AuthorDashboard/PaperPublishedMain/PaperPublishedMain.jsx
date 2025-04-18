import React from 'react'
import './PaperPublishedMain.css'
import AuthorTopBar from '../AuthorDashboardSection/AuthorTopBar/AuthorTopBar'
import PapersPublished from '../AuthorDashboardSection/PapersPublished/PapersPublished'

const PaperPublishedMain = () => {
  return (
    <div className='author-ppr-published-page shadow'>
        <AuthorTopBar />
        <div className="px-5">
            <PapersPublished />
        </div>
    </div>
  )
}

export default PaperPublishedMain