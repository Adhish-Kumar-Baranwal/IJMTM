import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./ReviewerRouteSelect.css";
import {
  MdOutlineDashboard,
  MdOutlineDocumentScanner,
  MdDocumentScanner,
} from "react-icons/md";
import { SiBookstack } from "react-icons/si";

const ReviewerRouteSelect = () => {

  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="route-select-section">
      <Link to="dashboard" className={`route-links ${isActive('dashboard') ? "active shadow" : ""}`}>
        <MdOutlineDashboard />
        <span>Dashboard</span>
      </Link>

      <Link to="assignedPaper" className={`route-links ${isActive('assignedPaper') ? "active shadow" : ""}`}>
        <MdOutlineDocumentScanner />
        <span>Assigned Papers</span>
      </Link>
      
      <Link to="reviewedPaper" className={`route-links ${isActive('reviewedPaper') ? "active shadow" : ""}`}>
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
