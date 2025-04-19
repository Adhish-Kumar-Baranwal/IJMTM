import React from "react";

const AccountToggle = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="border-b mb-4 mt-2 pb-2 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Aneka" // You can also use a dynamic seed based on the user's name or ID if needed
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">
            {user?.name || "Admin Name"} {/* Displaying the name from localStorage */}
          </span>
          <span className="text-xs block text-stone-500">
            {user?.email || "admin@example.com"} {/* Displaying the email from localStorage */}
          </span>
        </div>
      </button>
    </div>
  );
};

export default AccountToggle;
