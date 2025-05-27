import React, { useState } from "react";
import axios from "axios";
import "./SignupPage.css"; // Reuse your existing CSS
// import bgImage1 from "../assets/How-to-Write-the-Background-of-Your-Scientific-Paper.jpg";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    contactNumber: "",
    publishedPapers: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    console.log("Login form data:", formData);

    try {
      const res = await axios.post(
        "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/auth/register",
        formData
      );
      setSuccess("Registration successful! You can now log in.");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <a
          href="/"
          id="nav-title"
          className="no-underline p-5 text-2xl font-semibold"
        >
          IJMTM
        </a>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            name="designation"
            placeholder="e.g., Professor, Researcher"
            value={formData.designation}
            onChange={handleChange}
          />

          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter contact number"
            value={formData.contactNumber}
            onChange={handleChange}
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

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {error && <p className="error-msg">{error}</p>}
          {success && (
            <p className="success-msg">
              {success.split("You can now log in.")[0]}
              <a href="/SigninPage" className="login-link">
                Login
              </a>
            </p>
          )}
        </form>
      </div>

      <div className="signup-right">
        <h1>Join the IJMTM Community</h1>
        <p>Submit, review, and publish high-quality research papers.</p>
        <button className="cta-btn">Read Submission Guidelines</button>
      </div>
    </div>
  );
};

export default SignupPage;
