import React from "react";
import { Link } from "react-router-dom";
import "./RouteSelect.css";
import {
  MdOutlineDashboard,
  MdOutlineDocumentScanner,
  MdOutlineCurrencyRupee,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GrSchedule } from "react-icons/gr";

const RouteSelect = () => {
  return (
    <div className="route-select-section">
      <Link to="dashboard" className="route-links">
        <MdOutlineDashboard />
        <span>Dashboard</span>
      </Link>

      <Link to="reviewer-page" className="route-links">
        <FiUsers />
        <span>Reviewers</span>
      </Link>

      <Link to="" className="route-links">
        <FiUsers />
        <span>Authors</span>
      </Link>

      <Link to="" className="route-links">
        <MdOutlineDocumentScanner />
        <span>Papers</span>
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
