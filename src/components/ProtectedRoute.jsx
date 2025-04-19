import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { userType } = useAuth();

  // If not logged in
  if (!userType) {
    return <Navigate to="/SigninPage" replace />;
  }

  // If user role isn't allowed
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
