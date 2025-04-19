// auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/SigninPage" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
