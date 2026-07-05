import { Navigate } from "react-router-dom";
import { useAuth } from "../feature/auth/authContext";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
};
