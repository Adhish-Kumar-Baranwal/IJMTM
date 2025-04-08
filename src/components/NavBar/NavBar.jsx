import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLists } from "../../constants";

const NavBar = () => {
  const [dropdown, setDropdown] = useState();
  const navigate = useNavigate();

  return (
    <header
      className="w-full bg-white border border-gray-300 px-8 py-3 flex items-center justify-between z-1000"
      onMouseLeave={() => setDropdown(null)}
    >
      <nav className="flex w-full items-center justify-center mx-60 z-1000">
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
                      <li
                        key={subIndex}
                        className="px-4 py-2 hover:bg-gray-200 hover:rounded-lg"
                      >
                        <Link to={subItem.path}>{subItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Sign In Button */}
        <a
          href="/SigninPage"
          className="px-4 py-2 bg-blue-400 rounded-md cursor-pointer font-semibold"
          onClick={() => navigate("/SigninPage")}
        >
          Sign In
        </a>
      </nav>
    </header>
  );
};

export default NavBar;
