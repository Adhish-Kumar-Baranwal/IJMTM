import React from "react";
import "./PapersDashboard.css";
import TopBar from "../Dashboard/TopBar/TopBar";
import PaperSubmission from "../Dashboard/Grid/PaperSubmission/PaperSubmission";
import RecentSubmission from "./RecentSubmission/RecentSubmission";

const PapersDashboard = () => {
  return (
    <div className="admin-paper-page shadow">
      <TopBar />
        <div className="p-5 pt-0">
          <RecentSubmission />
          <PaperSubmission />
      </div>
    </div>
  );
};

export default PapersDashboard;
