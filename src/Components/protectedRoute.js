import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Redirect to login if no token exists
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based redirection
  if (user) {
    const roleBasedRoutes = {
      partner: "/partner",
      admin: "/admin",
      user: "/",
    };

    // Redirect only if the current path doesn't match the role's expected path
    const expectedPath = roleBasedRoutes[user.role];
    if (location.pathname !== expectedPath) {
      return <Navigate to={expectedPath} replace />;
    }
  }

  // Render children if no redirection is needed
  return children;
};

export default ProtectedRoute;
