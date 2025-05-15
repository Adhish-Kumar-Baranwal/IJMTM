import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./VolumeManagement.css";

const VolumeManagement = () => {
  const [volumes, setVolumes] = useState([]);
  const navigate = useNavigate();
  const handleCreateVolume = () => {
    navigate("/adminPanel/volumes/create");
  };

  useEffect(() => {
    fetch("/Jsonfolder/volumes.json")
      .then((res) => res.json())
      .then((data) => setVolumes(data))
      .catch((err) => console.error("Failed to fetch volumes:", err));
  }, []);

  return (
    <div className="volumes-container">
      <div className="volumes-header-section">
        <div>
          <h2>Volumes Management</h2>
          <p>Manage journal volumes, issues, and associated papers.</p>
        </div>
        <button className="create-volume-btn" onClick={handleCreateVolume}>+ Create New Volume</button>
      </div>

      <div className="search-filter-bar">
        <input type="text" placeholder="Search by title, year, or special issue..." />
        <select>
          <option>All Statuses</option>
          <option>Active</option>
          <option>Published</option>
          <option>Archived</option>
        </select>
        <select>
          <option>All Years</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>
        <button>Filter</button>
      </div>

      <div className="volumes-table">
        <div className="volumes-header">
          <span>Volume</span>
          <span>Year</span>
          <span>Issues</span>
          <span>Papers</span>
          <span>Special Issue</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {volumes.map((vol, idx) => (
          <div className="volumes-row" key={idx}>
            <span className="bold">{vol.volume}</span>
            <span>{vol.year}</span>
            <span>{vol.issues}</span>
            <span>{vol.papers}</span>
            <span>
              <span className="badge">{vol.specialIssue}</span>
            </span>
            <span>
              <span className={`status-badge ${vol.status.toLowerCase()}`}>{vol.status}</span>
            </span>
            <span>...</span>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default VolumeManagement;
