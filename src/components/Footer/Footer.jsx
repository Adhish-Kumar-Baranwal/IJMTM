// import React from "react";
// import "./Footer.css";
// import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         {/* Logo Section */}
//         <div className="footer-logo">
//           <div className="logo-icon"></div>
//           <h3>IJMTM</h3>
//           <div className="social-icons">
//             <FaFacebook />
//             <FaTwitter />
//             <FaYoutube />
//           </div>
//         </div>

//         {/* Links Section */}
//         <div className="footer-links">
//           <div>
//             <h4>Company</h4>
//             <ul>
//               <li>About Us</li>
//             </ul>
//           </div>

//           <div>
//             <h4>Help & Support</h4>
//             <ul>
//               <li>Contact Us</li>
//               <li>Knowledge Center</li>
//             </ul>
//           </div>

//           <div>
//             <h4>Legal</h4>
//             <ul>
//               <li>Terms & Conditions</li>
//               <li>Privacy Policy</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <div className="footer-bottom">
//         <p>All rights reserved. Copyright © 2025 IJMTM </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from "react";
import "./Footer.css";
import logo from "../../assets/Intersect.png"

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
