import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SigninPage.css";
import bgImage1 from "../assets/How-to-Write-the-Background-of-Your-Scientific-Paper.jpg";

const SigninPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Login form data:", formData);


    try {
      const res = await axios.post(
        
        "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/auth/login",
        formData
      );
      console.log("Submitting login:", formData);
      alert(`Login successful! Welcome, ${res.data.user.name}`);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

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
        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="show-password">
  <input
    type="checkbox"
    checked={showPassword}
    onChange={() => setShowPassword(!showPassword)}
  />
  Show Password
</label>


          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          {error && <p className="error-msg">{error}</p>}

          <div className="signin-options">
            <label className="signin-checkbox">
              <input type="checkbox" /> Remember Me
            </label>
            <div className="signin-links">
              <Link to="#">Forgot Your Password?</Link>
              <br></br>
              <Link to="/SignupPage">Create an Account</Link>
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
