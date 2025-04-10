import React from "react";
import adminData from "../../../../public/Jsonfolder/AdminDetail.json"; // adjust the path as needed

const AccountToggle = () => {
  const loggedInAdmin = adminData[0]; // simulate currently logged-in admin

  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
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

export default AccountToggle;
