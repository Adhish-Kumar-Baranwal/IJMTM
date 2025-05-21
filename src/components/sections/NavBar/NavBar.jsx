import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { navLists } from "../../../constants";
import { useAuth } from "../../../context/AuthContext";

const NavBar = () => {
  const [dropdown, setDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userType } = useAuth();

  const goToDashboard = () => {
    if (userType === "author") navigate("/author/authorDashboard");
    else if (userType === "admin") navigate("/adminPanel/dashboard");
    else if (userType === "reviewer") navigate("/reviewerDashboard/dashboard");
  };

  return (
    <header className="nav-header" onMouseLeave={() => setDropdown(null)}>
      <nav className="nav-container">
        {/* Logo */}
        <Link to="/" className="no-underline text-3xl font-bold">
          IJMTM
        </Link>

        {/* Hamburger menu (visible on mobile) */}
        <button
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <div className="nav-menu max-sm:hidden">
          <ul className="nav-menu-ulist-1">
            {navLists.map((item, index) => (
              <li
                key={index}
                className="nav-menu-li-1 group"
                onMouseEnter={() => setDropdown(index)}
              >
                <span className="cursor-pointer">{item.name}</span>
                {dropdown === index && item.submenu && (
                  <ul className="nav-dropdown-menu shadow-md">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link to={subItem.path} key={subIndex}>
                        <li className="nav-dropdown-list-items">
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

        {/* Buttons */}
        <div className="nav-btn-section max-sm:hidden">
          {userType ? (
            <button onClick={goToDashboard} className="nav-profile-btn">
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/SigninPage")}
              className="nav-signin-btn"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu sm:hidden">
          <ul className="mobile-nav-list">
            {navLists.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                <span className="font-semibold">{item.name}</span>
                {item.submenu && (
                  <ul className="mobile-submenu">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link to={subItem.path} key={subIndex}>
                        <li className="mobile-subitem">{subItem.name}</li>
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mobile-nav-item">
              {userType ? (
                <button onClick={goToDashboard}>Profile</button>
              ) : (
                <button onClick={() => navigate("/SigninPage")}>
                  Sign In
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
