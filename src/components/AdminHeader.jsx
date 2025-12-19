import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <header className="admin-header">
        <div className="admin-nav-container">
          {/* Hamburger untuk mobile */}
          <button
            className="hamburger admin-hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Logo */}
          <Link to="/admin/dashboard" className="admin-logo">
            <span>Tech</span>Hub
          </Link>

          {/* Admin Info */}
          <div className="admin-user-info">
            <span className="admin-greeting">
              Halo, {user?.username || "Admin"}
            </span>
            <button onClick={handleLogout} className="admin-logout-btn">
              Keluar
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav className={`admin-mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <div className="admin-mobile-nav-content">
            <Link
              to="/admin/dashboard"
              onClick={toggleMenu}
              className="admin-mobile-nav-link"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              onClick={toggleMenu}
              className="admin-mobile-nav-link"
            >
              Kelola Produk
            </Link>
            <Link
              to="/admin/users"
              onClick={toggleMenu}
              className="admin-mobile-nav-link"
            >
              Kelola User
            </Link>
            <Link
              to="/admin/reports"
              onClick={toggleMenu}
              className="admin-mobile-nav-link"
            >
              Laporan
            </Link>
            <div className="admin-mobile-auth">
              <span className="admin-mobile-user">
                {user?.username || "Admin"}
              </span>
              <button onClick={handleLogout} className="admin-mobile-logout">
                Keluar
              </button>
            </div>
          </div>
        </nav>

        {/* Overlay */}
        {isMenuOpen && (
          <div className="admin-menu-overlay" onClick={toggleMenu}></div>
        )}
      </header>

      {/* Sidebar untuk desktop */}
      <aside
        className={`admin-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}
      >
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? "◀" : "▶"}
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <h3 className="sidebar-title">
              {isSidebarOpen ? "Admin Panel" : "AP"}
            </h3>
          </div>

          <ul className="sidebar-menu">
            <li>
              <Link to="/admin/dashboard" className="sidebar-link">
                <span className="sidebar-icon">📊</span>
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="sidebar-link">
                <span className="sidebar-icon">📱</span>
                {isSidebarOpen && <span>Kelola Produk</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="sidebar-link">
                <span className="sidebar-icon">👥</span>
                {isSidebarOpen && <span>Kelola User</span>}
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className="sidebar-link">
                <span className="sidebar-icon">📈</span>
                {isSidebarOpen && <span>Laporan</span>}
              </Link>
            </li>
            <li>
              <Link to="/" className="sidebar-link">
                <span className="sidebar-icon">🏠</span>
                {isSidebarOpen && <span>Kembali ke Toko</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminHeader;
