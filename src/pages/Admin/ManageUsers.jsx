import React, { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import usersData from "../../data/users.json";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { showNotification } = useNotification();

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      showNotification("User berhasil dihapus", "success");
    }
  };

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    showNotification("Role user berhasil diubah", "success");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Kelola User</h1>
        <p>Kelola semua user yang terdaftar di TechHub</p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Cari user berdasarkan username atau role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-form-input"
          style={{ maxWidth: "400px" }}
        />
      </div>

      {/* Users Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background:
                          user.role === "admin" ? "#3b82f6" : "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "1rem",
                      }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#1f2937" }}>
                        {user.username}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                        User ID: {user.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="admin-form-input"
                    style={{
                      padding: "0.375rem 0.75rem",
                      fontSize: "0.875rem",
                      minWidth: "120px",
                    }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <span
                    className={`admin-status-badge ${
                      user.role === "admin"
                        ? "admin-status-active"
                        : "admin-status-pending"
                    }`}
                  >
                    {user.role === "admin" ? "Administrator" : "Regular User"}
                  </span>
                </td>
                <td>
                  <div className="admin-action-buttons">
                    <button
                      className="admin-btn-secondary"
                      style={{ padding: "0.25rem 0.5rem", fontSize: "0.85rem" }}
                    >
                      Edit
                    </button>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="admin-btn-danger"
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#f0f9ff",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #bae6fd",
            flex: "1",
            minWidth: "200px",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "#0369a1",
              marginBottom: "0.5rem",
            }}
          >
            Total Users
          </div>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0c4a6e" }}
          >
            {users.length}
          </div>
        </div>

        <div
          style={{
            background: "#f0fdf4",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #bbf7d0",
            flex: "1",
            minWidth: "200px",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "#15803d",
              marginBottom: "0.5rem",
            }}
          >
            Admin Users
          </div>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#14532d" }}
          >
            {users.filter((u) => u.role === "admin").length}
          </div>
        </div>

        <div
          style={{
            background: "#fef3c7",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #fde68a",
            flex: "1",
            minWidth: "200px",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "#92400e",
              marginBottom: "0.5rem",
            }}
          >
            Regular Users
          </div>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#713f12" }}
          >
            {users.filter((u) => u.role === "user").length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
