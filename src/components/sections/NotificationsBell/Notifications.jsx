import React, { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
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

  // Close dropdown when clicked outside
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
      {/* <div
        className="bell-icon"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <FaBell size={22} />
      </div> */}

      <button
        className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
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
