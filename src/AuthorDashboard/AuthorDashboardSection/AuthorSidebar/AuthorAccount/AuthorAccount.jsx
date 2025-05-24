import React from "react";
import "./AuthorAccount.css"

const AuthorAccount = () => {
  
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="author-acc-container">
      <button className="author-acc-button">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Aneka"
          alt="avatar"
          className="author-acc-avatar shadow"
        />
        <div className="author-text text-start">
          <span className="author-name text-sm font-bold block">
            {user?.name || "Author Name"}
          </span>
          <span className="author-email text-xs block text-stone-500">
            {user?.email || "author@email.com"}
          </span>
        </div>
      </button>
    </div>
  );
};

export default AuthorAccount;
