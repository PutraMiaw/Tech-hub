import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Tampilkan loading saat menunggu autentikasi
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          background: "#f5f7fa",
        }}
      >
        <div
          className="loading"
          style={{ width: "40px", height: "40px" }}
        ></div>
      </div>
    );
  }

  // Jika belum login
  if (!user) {
    // Redirect ke login yang sesuai
    if (allowedRoles?.includes("admin")) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/login" />;
  }

  // Jika role tidak diizinkan
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect berdasarkan role
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
