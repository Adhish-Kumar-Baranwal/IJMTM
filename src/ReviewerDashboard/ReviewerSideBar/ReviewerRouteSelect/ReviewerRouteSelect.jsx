import React from "react";
import { Link } from "react-router-dom";
import "./ReviewerRouteSelect.css";
import {
  MdOutlineDashboard,
  MdOutlineDocumentScanner,
  MdDocumentScanner,
} from "react-icons/md";
import { SiBookstack } from "react-icons/si";

const ReviewerRouteSelect = () => {
  return (
    <div className="route-select-section">
      <Link to="dashboard" className="route-links">
        <MdOutlineDashboard />
        <span>Dashboard</span>
      </Link>

      <Link to="assignedPaper" className="route-links">
        <MdOutlineDocumentScanner />
        <span>Assigned Papers</span>
      </Link>
      
      <Link to="reviewedPaper" className="route-links">
      <MdDocumentScanner />
        <span>Reviews Done</span>
      </Link>

      <Link to="" className="route-links">
      <SiBookstack />
        <span>Volumes</span>
      </Link>

    </div>
  );
};

export default ReviewerRouteSelect;
