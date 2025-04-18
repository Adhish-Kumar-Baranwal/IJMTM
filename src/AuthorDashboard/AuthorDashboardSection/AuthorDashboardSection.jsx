import React from 'react';
import "./AuthorDashboardSection.css";
import AuthorTopBar from './AuthorTopBar/AuthorTopBar';

const AuthorDashboardSection = () => {
  return (
    <div className='author-main-dashboard shadow'>
        <AuthorTopBar />
        {/* <AuthorGridSection /> */}
    </div>
  );
};

export default AuthorDashboardSection;
