import React from "react";
import "./ReviewerTopBar.css";
import reviewerData from "../../../../public/Jsonfolder/ReviewerDetail.json"
import Notifications from "../../../components/sections/NotificationsBell/Notifications";

const ReviewerTopBar = () => {
  const loggedInReviewer = reviewerData[0];

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
            Hello {loggedInReviewer.first_name}
          </span>
          <span className="text-xs block text-stone-500">{formattedDate}</span>
        </div>
        <Notifications />
      </div>
    </div>
  );
};

export default ReviewerTopBar;