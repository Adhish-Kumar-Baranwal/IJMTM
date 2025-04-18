import React from "react";
import authorData from "../../../../../public/Jsonfolder/AuthorDetail.json";

const AuthorAccount = () => {
  const loggedInAuthor = authorData[0]; // simulate currently logged-in author

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
            {loggedInAuthor.first_name + " " + loggedInAuthor.last_name}
          </span>
          <span className="author-email text-xs block text-stone-500">
            {loggedInAuthor.email}
          </span>
        </div>
      </button>
    </div>
  );
};

export default AuthorAccount;
