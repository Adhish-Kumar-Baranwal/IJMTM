import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./RouteSelect.css";
import {
  MdOutlineDashboard,
  MdOutlineDocumentScanner,
  MdOutlineCurrencyRupee,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GrSchedule } from "react-icons/gr";
import { SiBookstack } from "react-icons/si";

const RouteSelect = () => {

  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="route-select-section">
      <Link to="dashboard" className={`route-links ${isActive('dashboard') ? "active shadow" : ""}`}>
        <MdOutlineDashboard />
        <span>Dashboard</span>
      </Link>

      <Link to="reviewerPage" className={`route-links ${isActive('reviewerPage') ? "active shadow" : ""}`}>
        <FiUsers />
        <span>Reviewers</span>
      </Link>

      <Link to="authorInfo" className={`route-links ${isActive('authorInfo') ? "active shadow" : ""}`}>
        <FiUsers />
        <span>Authors</span>
      </Link>

      <Link to="paperDashboard" className={`route-links ${isActive('paperDashboard') ? "active shadow" : ""}`}>
        <MdOutlineDocumentScanner />
        <span>Papers</span>
      </Link>

      <Link to="" className="route-links">
      <SiBookstack />
        <span>Volumes</span>
      </Link>

      <Link to="" className="route-links">
        <GrSchedule />
        <span>Conference</span>
      </Link>

      <Link to="" className="route-links">
        <MdOutlineCurrencyRupee />
        <span>Payment</span>
      </Link>
    </div>
  );
};

export default RouteSelect;
