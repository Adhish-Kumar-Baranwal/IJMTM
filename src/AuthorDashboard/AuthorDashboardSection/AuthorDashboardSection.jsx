import React from "react";
import "./AuthorDashboardSection.css";
import AuthorTopBar from "./AuthorTopBar/AuthorTopBar";
import PapersSubmitted from "./PapersSubmitted/PapersSubmitted";
import PapersPublished from "./PapersPublished/PapersPublished";

const AuthorDashboardSection = () => {
  return (
    <div className="author-main-dashboard shadow">
      <AuthorTopBar />
      <div className="px-5">
        <PapersSubmitted />
        <PapersPublished />
      </div>
    </div>
  );
};

export default AuthorDashboardSection;
