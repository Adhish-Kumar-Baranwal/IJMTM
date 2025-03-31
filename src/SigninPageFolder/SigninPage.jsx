import React, { useState } from "react";
import axios from "axios";
import "./SigninPage.css";
import bgImage1 from "../assets/How-to-Write-the-Background-of-Your-Scientific-Paper.jpg";

const SigninPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("https://fw9vjsxr-5000.inc1.devtunnels.ms/api/auth/login", formData);
      alert(`Login successful! Welcome, ${res.data.username}`);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <a href="/" id="nav-title" className="no-underline p-5 text-2xl font-semibold">
          IJMTM
        </a>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          {error && <p className="error-msg">{error}</p>}

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
