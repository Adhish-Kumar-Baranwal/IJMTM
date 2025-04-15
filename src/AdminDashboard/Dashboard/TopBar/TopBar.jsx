import React from "react";
import { FiBell } from "react-icons/fi";
import "./TopBar.css";
import adminData from "../../../../public/Jsonfolder/AdminDetail.json";

const TopBar = () => {
  const loggedInAdmin = adminData[0];

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
            Hello {loggedInAdmin.first_name}
          </span>
          <span className="text-xs block text-stone-500">{formattedDate}</span>
        </div>
        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiBell />
          <span>Notifications</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
