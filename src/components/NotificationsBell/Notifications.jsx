import React, { useEffect, useState, useRef } from "react";
import "./Notifications.css";
import { FiBell } from "react-icons/fi";

const Notifications = ({ role = "Author" }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    fetch("/JsonFolder/Notifications.json")
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data[role] || []);
      })
      .catch((error) => console.error("Error loading notifications:", error));
  }, [role]);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      <button
        className="notification-btn"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <FiBell />
        <span>Notifications</span>
      </button>

      {showDropdown && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <p className="notification-empty">No new notifications</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                {notification}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
