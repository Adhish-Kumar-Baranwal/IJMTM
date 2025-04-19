import React from "react";
import "./AuthorDashboardSection.css";
import AuthorTopBar from "./AuthorTopBar/AuthorTopBar";
import PapersSubmitted from "./PapersSubmitted/PapersSubmitted";
import PapersPublished from "./PapersPublished/PapersPublished";
import PapersApproved from "./PapersApproved/PapersApproved";

const AuthorDashboardSection = () => {
  return (
    <div className="author-main-dashboard shadow">
      <AuthorTopBar />
      <div className="px-5">
        <PapersSubmitted />
        <PapersApproved />
        <PapersPublished />
      </div>
    </div>
  );
};

export default AuthorDashboardSection;
