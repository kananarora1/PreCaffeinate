import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "partner") {
    return <Navigate to="/partner" replace />;
  } 
  else if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
   else if (user?.role === "user") {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default ProtectedRoute;
