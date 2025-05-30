import React from "react";
import "./Footer.css";
import logo from "../../assets/IJMTM_icon.png"

const Footer = () => {
  return (
    <footer class="footer-simple">
      <div class="footer-container">
        <div class="footer-brand">
          <div class="footer-logo-circle"> <img src={logo} alt="" /> </div>
          <span class="footer-logo-text">IJMTM</span>
          <p class="footer-tagline">Innovating Research, Sharing Knowledge</p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h4>About</h4>
            <a href="/journal-information">About IJMTM</a>
            <a href="/journal-policies">Publishing Policy</a>
            <a href="/contact-us" class="contact-heading">
              Contact Us
            </a>
          </div>

          <div class="footer-column">
            <h4>Resources</h4>
            <a href="/published-papers">Papers A–Z</a>
            <a href="/browse-volumes">Journals A–Z</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <p>© 2025 International Journal of Modern Technology and Management</p>
      </div>
    </footer>
  );
};

export default Footer;
