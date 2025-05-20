import React, { useState } from "react";
import "./AuthorForm.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../../Footer/Footer";

const AuthorForm = () => {
  const [isSignup, setIsSignup] = useState(true);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <>
      <NavBar />
      <div className="author-form-container">
        <h2 className="form-title">Author Form</h2>
        <div className="form-box">
          {isSignup ? (
            <>
              <h3 className="form-subtitle">Sign Up</h3>
              <form className="author-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Register
                </button>
              </form>
              <p className="switch-text">
                Already have an account? <span onClick={toggleForm}>Login</span>
              </p>
            </>
          ) : (
            <>
              <h3 className="form-subtitle">Login</h3>
              <form className="author-form">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Login
                </button>
              </form>
              <p className="switch-text">
                Don't have an account? <span onClick={toggleForm}>Sign Up</span>
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthorForm;
