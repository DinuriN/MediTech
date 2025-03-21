import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedUserType }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token) {
    return <Navigate to="/loginForUsers" replace />;
  }

  if (userType !== allowedUserType) {
    alert("Access Denied");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
