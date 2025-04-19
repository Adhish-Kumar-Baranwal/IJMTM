import React from "react";

const AuthorAccount = () => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="author-border mb-4 mt-2 pb-2 border-stone-300">
      <button className="author-button flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Aneka"
          alt="avatar"
          className="author-avatar size-8 rounded shrink-0 bg-violet-500 shadow"
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
