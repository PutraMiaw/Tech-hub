import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success && result.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      alert("Akses Ditolak: Kredensial Admin Tidak Ditemukan");
      logout();
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "400px", marginTop: "100px" }}
    >
      <div className="checkout-form" style={{ borderTop: "5px solid #1a1a2e" }}>
        <h2 style={{ textAlign: "center", color: "#1a1a2e" }}>Admin TechHub</h2>
        <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#666" }}>
          Pintu Masuk Staff & Pengelola
        </p>
        <form onSubmit={handleAdminSubmit} style={{ marginTop: "20px" }}>
          <div className="form-group">
            <label>Admin ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ width: "100%", backgroundColor: "#1a1a2e" }}
          >
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
