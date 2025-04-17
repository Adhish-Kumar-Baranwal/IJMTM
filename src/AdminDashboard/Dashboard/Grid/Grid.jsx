import React from "react";
import "./Grid.css";
import StatCards from "./StatCard/StatCard";
import PaperSubmission from "./PaperSubmission/PaperSubmission";
import ReviewersApplied from "./ReviewersApplied/ReviewersApplied";
import RecentSubmission from "../../PapersDashboard/RecentSubmission/RecentSubmission";

const Grid = () => {
  return (
    <div className="admin-main-dashboard-grid">
      <StatCards />
      <RecentSubmission />
      <PaperSubmission />
      <ReviewersApplied />
    </div>
  );
};

export default Grid;
