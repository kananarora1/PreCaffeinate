import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "partner" && location.pathname !== "/partner") {
    return <Navigate to="/partner" replace />;
  } else if (user?.role === "admin" && location.pathname !== "/admin") {
    return <Navigate to="/admin" replace />;
  } else if (user?.role === "user" && location.pathname !== "/app") {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default ProtectedRoute;
