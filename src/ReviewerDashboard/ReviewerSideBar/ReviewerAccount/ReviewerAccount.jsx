import React from "react";
import reviewerData from "../../../../public/Jsonfolder/ReviewerDetail.json";

const ReviewerAccount = () => {
  const loggedInAdmin = reviewerData[0]; // simulate currently logged-in admin

  return (
    <div className="border-b mb-4 mt-2 pb-2 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Aneka"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">
            {loggedInAdmin.first_name + " " + loggedInAdmin.last_name}
          </span>
          <span className="text-xs block text-stone-500">
            {loggedInAdmin.email}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReviewerAccount;
