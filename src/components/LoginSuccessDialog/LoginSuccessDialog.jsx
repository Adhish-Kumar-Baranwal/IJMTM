import { useEffect, useState } from "react";
import "./LoginSuccessDialog.css";

const LoginSuccessDialog = ({ username }) => {
  const [visible, setVisible] = useState(!!username);

  useEffect(() => {
    if (username) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        window.location.href = "/"; // Default redirect
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [username]);

  if (!visible) return null;

  return (
    <div className="login-dialog-overlay">
      <div className="login-dialog-box">
        <h2>Login Successful!</h2>
        <p>Welcome, {username} 🎉</p>
      </div>
    </div>
  );
};

export default LoginSuccessDialog;
