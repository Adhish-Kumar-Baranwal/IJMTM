import React from 'react'
import "./PaperSubmittedMain.css";
import AuthorTopBar from '../AuthorDashboardSection/AuthorTopBar/AuthorTopBar';
import PapersSubmitted from '../AuthorDashboardSection/PapersSubmitted/PapersSubmitted';

const PaperSubmittedMain = () => {
  return (
    <div className='author-ppr-submitted-page shadow'>
        <AuthorTopBar />
        <div className="px-5">
            <PapersSubmitted />
        </div>
    </div>
  )
}

export default PaperSubmittedMain