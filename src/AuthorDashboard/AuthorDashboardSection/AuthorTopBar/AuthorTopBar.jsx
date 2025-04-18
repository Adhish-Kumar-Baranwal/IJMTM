import React from "react";
import "./AuthorTopBar.css";
import authorData from "../../../../public/Jsonfolder/AuthorDetail.json";
import Notifications from "../../../components/sections/NotificationsBell/Notifications";

const AuthorTopBar = () => {
  const loggedInAuthor = authorData[0];

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-2 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            Hello {loggedInAuthor.first_name}
          </span>
          <span className="text-xs block text-stone-500">{formattedDate}</span>
        </div>
        <Notifications role="Author" />
      </div>
    </div>
  );
};

export default AuthorTopBar;
