import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password); // Panggil fungsi login baru
    if (result.success && result.role === "user") {
      navigate("/products");
    } else if (result.success && result.role !== "user") {
      alert("Ini halaman login user, silakan gunakan login admin.");
      logout();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <div className="checkout-form">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Masuk Pelanggan
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Masukkan username user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn" style={{ width: "100%" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
