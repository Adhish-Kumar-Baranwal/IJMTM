import React from "react";
import "./SigninPage.css";
import bgImage1 from "../assets/How-to-Write-the-Background-of-Your-Scientific-Paper.jpg";

const SigninPage = () => {
  return (
    <div className="signin-container">
      <div className="signin-left">
        <a
          href="/"
          id="nav-title"
          className="no-underline p-5 text-2xl font-semibold"
        >
          IJMTM
        </a>
        <form className="signin-form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />

          <button type="submit" className="signin-btn">
            Log In
          </button>

          <div className="signin-options">
              <label className="signin-checkbox">
                <input type="checkbox" /> Remember Me
              </label>
            <div className="signin-links">
              <a href="#">Forgot Your Password?</a>
            </div>
          </div>
        </form>
      </div>

      <div className="signin-right">
        <h1>Lorem Ipsum Dolor Sit Amet</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button className="cta-btn">Download free eBook</button>
      </div>

    </div>
  );
};

export default SigninPage;
