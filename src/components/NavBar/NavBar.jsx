import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { navLists } from "../../constants";

const NavBar = () => {
  const [dropdown, setDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
      n;
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 
               max-w-7xl w-full bg-white border border-gray-300 
               rounded-lg shadow-lg px-8 py-3 flex items-center 
               justify-between z-1000">
      <nav className="flex w-full items-center justify-center">
        <Link
          to="/"
          id="nav-title"
          className="no-underline text-xl font-semibold"
        >
          IJMTM
        </Link>
        <div className="flex flex-1 w-full justify-center max-sm:hidden">
          {/* Navigation List */}
          <ul className="flex cursor-pointer">
            {navLists.map((item, index) => (
              <li
                key={index}
                className="px-4 relative group"
                onMouseEnter={() => setDropdown(index)}
                ref={dropdownRef}
              >
                <span className="cursor-pointer">{item.name}</span>

                {/* Dropdown Menu */}
                {item.submenu && dropdown === index && (
                  <ul
                    className="absolute left-0 mt-2 w-50 bg-white border border-gray-300 shadow-md rounded-lg flex flex-col"
                    onMouseEnter={() => setDropdown(index)} // Prevents flickering
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-4 py-2 hover:bg-gray-200 hover:rounded-lg"
                      >
                        <span>{subItem.name}</span>
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
          onClick={() => navigate("/SigninPage")} //Navigate to SigninPage
        >
          Sign In
        </a>
      </nav>
    </header>
  );
};

export default NavBar;
