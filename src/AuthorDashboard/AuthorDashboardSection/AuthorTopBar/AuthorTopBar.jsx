import React from "react";
import "./AuthorTopBar.css";
import Notifications from "../../../components/NotificationsBell/Notifications";

const AuthorTopBar = () => {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="author-topbar">
      <div className="author-topbar-container">
        <div>
          <span className="author-topbar-user">
            Hello {user?.name || "Author"}
          </span>
          <span className="author-topbar-date">{formattedDate}</span>
        </div>
        <Notifications role="Author" />
      </div>
    </div>
  );
};

export default AuthorTopBar;
