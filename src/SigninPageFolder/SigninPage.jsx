import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SigninPage.css";
import { useAuth } from "../context/AuthContext";

const SigninPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();         // ✅ Get login method
  const navigate = useNavigate();      // ✅ Navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://fw9vjsxr-5000.inc1.devtunnels.ms/api/auth/login",
        formData
      );

      // Save token and user data to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(`Login successful! Welcome, ${res.data.user.name}`);

      // Redirect based on role
      if (res.data.user.role === "Admin") {
        window.location.href = "/adminPanel";
      } else if (res.data.user.role === "Reviewer") {
        window.location.href = "/reviewerDashboard";
      } else {
        window.location.href = "/author";
      }

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
