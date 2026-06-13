import { Navigate } from "react-router-dom";
import useAuthStore from "../features/auth/authStore";

const ProtectedRoute = ({ children, role }) => {
  const { token, user } = useAuthStore();

  // Not logged in or invalid session
  if (!token || token === "null" || token === "undefined" || !user) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;