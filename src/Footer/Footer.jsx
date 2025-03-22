import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer mt-50">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <div className="logo-icon"></div>
          <h3>IJMTM</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
            </ul>
          </div>

          {/* <div>
            <h4>Resources</h4>
            <ul>
              <li>Illustrations</li>
              <li>Bits & Snippets</li>
              <li>Affiliate Program</li>
            </ul>
          </div> */}

          <div>
            <h4>Help & Support</h4>
            <ul>
              <li>Contact Us</li>
              <li>Knowledge Center</li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>All rights reserved. Copyright © 2025 IJMTM </p>
      </div>
    </footer>
  );
};

export default Footer;
