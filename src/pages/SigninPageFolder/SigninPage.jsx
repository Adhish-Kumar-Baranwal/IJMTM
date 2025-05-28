import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SigninPage.css";
import { useAuth } from "../../context/AuthContext";
import LoginSuccessDialog from "../../components/LoginSuccessDialog/LoginSuccessDialog";
import logo from "../.././assets/Intersect.png"


const SigninPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { login } = useAuth(); // ✅ Get login method
  const navigate = useNavigate(); // ✅ Navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/auth/login",
        formData
      );

      const user = res.data.user;
      const role = user.role.toLowerCase(); // e.g., 'author', 'admin', 'reviewer'

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      setUserName(user.name);

      // ✅ Call the context login method
      login(role); // This sets userType in context

      // Redirect based on role
      if (role === "admin") {
        navigate("/adminPanel");
      } else if (role === "reviewer") {
        navigate("/reviewerDashboard");
      } else {
        navigate("/author");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <Link
          to="/"
          className="flex items-center gap-1 no-underline text-3xl font-bold"
        >
          <img src={logo} className="w-[28px] h-[28px]" alt="" />
          IJMTM
        </Link>
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
            <div className="signin-links">
              <Link to="#">Forgot Your Password?</Link>
              <br></br>
              <Link to="/SignupPage">Create an Account</Link>
            </div>
          </div>
        </form>
      </div>

      <div className="signin-right">
        <h1>Join the IJMTM Community</h1>
        <p>Submit, review, and publish high-quality research papers.</p>
        {/*  onClick={() => navigate("/SigninPage")} */}
        <button className="cta-btn">Read Submission Guidelines</button>
      </div>
      <LoginSuccessDialog username={userName} />
    </div>
  );
};

export default SigninPage;
