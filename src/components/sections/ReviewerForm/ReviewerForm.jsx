import React, { useState } from "react";
import axios from "axios";
import "./ReviewerForm.css";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../../Footer/Footer";

const ReviewerForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",  
    email: "",
    designation: "",
    publishedPapers: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isLogin
        ? "https://fw9vjsxr-5000.inc1.devtunnels.ms/api/reviewer/login"
        : "https://fw9vjsxr-5000.inc1.devtunnels.ms/api/reviewer/register";

      const response = await axios.post(url, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <NavBar />
      <div className="reviewer-page-container">
        <div className="reviewer-form-wrapper">
          <h2 className="reviewer-form-title">
            {isLogin ? "Existing User Login" : "Reviewer Registration"}
          </h2>

          <p className="reviewer-switch-text">
            {isLogin ? "New User? " : "Already have an account? "}
            <span className="reviewer-switch-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register here" : "Login"}
            </span>
          </p>

          <form className="reviewer-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="reviewer-form-group">
                  <label className="reviewer-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="reviewer-input"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="reviewer-form-group">
                  <label className="reviewer-label">Contact Number</label>
                  <input
                    type="tel"
                    name="contact"
                    className="reviewer-input"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="reviewer-form-group">
                  <label className="reviewer-label">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    className="reviewer-input"
                    placeholder="Enter your designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="reviewer-form-group">
                  <label className="reviewer-label">Published Papers</label>
                  <textarea
                    name="publishedPapers"
                    className="reviewer-textarea"
                    placeholder="List your published papers"
                    value={formData.publishedPapers}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </>
            )}

            <div className="reviewer-form-group">
              <label className="reviewer-label">Email</label>
              <input
                type="email"
                name="email"
                className="reviewer-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reviewer-form-group">
              <label className="reviewer-label">Password</label>
              <input
                type="password"
                name="password"
                className="reviewer-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="reviewer-submit-btn">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {message && <p className="reviewer-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default ReviewerForm;
