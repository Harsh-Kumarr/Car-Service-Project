import { Navigate } from "react-router-dom";
import useAuthStore from "../features/auth/authStore";

const GuestRoute = ({ children }) => {
  const { token, user } = useAuthStore();

  if (token && token !== "null" && token !== "undefined") {
    // Already logged in — redirect to their dashboard
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === "mechanic") return <Navigate to="/mechanic/jobs" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
