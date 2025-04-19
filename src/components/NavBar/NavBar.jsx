import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLists } from "../../constants";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const [dropdown, setDropdown] = useState();
  const navigate = useNavigate();
  const { userType } = useAuth(); // 'author', 'admin', 'reviewer', or null

  const goToDashboard = () => {
    if (userType === "author") navigate("/author/authorDashboard");
    else if (userType === "admin") navigate("/adminPanel/dashboard");
    else if (userType === "reviewer") navigate("/reviewerDashboard/dashboard");
  };

  return (
    <header
      className="w-full bg-white border border-gray-300 px-8 py-3 flex items-center justify-between z-1000"
      onMouseLeave={() => setDropdown(null)}
    >
      <nav className="flex w-full items-center justify-center mx-20 z-1000">
        {/* Logo */}
        <Link to="/" className="no-underline text-3xl font-bold">
          IJMTM
        </Link>

        {/* Navigation Menu */}
        <div className="flex flex-1 w-full justify-center max-sm:hidden">
          <ul className="flex cursor-pointer">
            {navLists.map((item, index) => (
              <li
                key={index}
                className="px-4 relative group"
                onMouseEnter={() => setDropdown(index)}
              >
                <span className="cursor-pointer">{item.name}</span>

                {/* Dropdown Menu */}
                {dropdown === index && item.submenu && (
                  <ul className="absolute left-0 mt-2 w-50 bg-white border border-gray-300 shadow-md rounded-lg flex flex-col">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link to={subItem.path}>
                        <li
                          key={subIndex}
                          className="px-4 py-2 hover:bg-gray-200 hover:rounded-lg"
                        >
                          {subItem.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {userType ? (
            <button
              onClick={goToDashboard}
              className="px-4 py-2 bg-green-500 rounded-md cursor-pointer font-semibold text-white"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/SigninPage")}
              className="px-4 py-2 bg-blue-400 rounded-md cursor-pointer font-semibold text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
