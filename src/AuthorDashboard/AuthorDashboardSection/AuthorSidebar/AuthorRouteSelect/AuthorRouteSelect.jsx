import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AuthorRouteSelect.css";
import {
  MdOutlineDashboard,
  MdOutlineDocumentScanner,
  MdDocumentScanner,
} from "react-icons/md";
import { GrSchedule } from "react-icons/gr";

const AuthorRouteSelect = () => {

  const location = useLocation(); 
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="author-route-select-section">
      <Link to="authorDashboard" className={`author-route-links ${isActive('authorDashboard') ? "active shadow" : ""}`}>
        <MdOutlineDashboard />
        <span>Dashboard</span>
      </Link>

      <Link to="paperSubmitted" className={`author-route-links ${isActive('paperSubmitted') ? "active shadow" : ""}`}>
        <MdOutlineDocumentScanner />
        <span>Submitted Papers</span>
      </Link>

      <Link to="paperApproved" className={`author-route-links ${isActive('paperApproved') ? "active shadow" : ""}`}>
        <MdDocumentScanner />
        <span>Approved Papers</span>
      </Link>

      <Link to="paperPublished" className={`author-route-links ${isActive('paperPublished') ? "active shadow" : ""}`}>
        <MdDocumentScanner />
        <span>Published Papers</span>
      </Link>

    </div>
  );
};

export default AuthorRouteSelect;
