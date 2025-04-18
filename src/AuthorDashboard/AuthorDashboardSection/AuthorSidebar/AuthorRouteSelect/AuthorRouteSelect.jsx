import React from "react";
import { Link } from "react-router-dom";
import "./AuthorRouteSelect.css";
import {
  MdOutlineDashboard,
  MdOutlineDocumentScanner,
  MdDocumentScanner,
} from "react-icons/md";

const AuthorRouteSelect = () => {
  return (
    <div className="author-route-select-section">
      <Link to="dashboard" className="author-route-links">
        <MdOutlineDashboard />
        <span>Dashboard</span>
      </Link>

      <Link to="" className="author-route-links">
        <MdOutlineDocumentScanner />
        <span>Submitted Papers</span>
      </Link>

      <Link to="" className="author-route-links">
        <MdDocumentScanner />
        <span>Published Papers</span>
      </Link>

    </div>
  );
};

export default AuthorRouteSelect;
