import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span>Tech</span>Hub
        </Link>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Beranda
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" onClick={closeMenu}>
              Admin Panel
            </Link>
          )}

          <Link to="/products" onClick={closeMenu}>
            Produk
          </Link>

          {user?.role !== "admin" && (
            <Link to="/cart" className="cart-icon" onClick={closeMenu}>
              <span>Keranjang</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          )}

          {/* Navigasi Auth (Login/Register/Logout) */}
          <div className="auth-nav">
            {user ? (
              <>
                <span className="user-name">Halo, {user.username}</span>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="logout-btn"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-link" onClick={closeMenu}>
                  Masuk
                </Link>
                <span className="auth-separator">|</span>
                <Link
                  to="/register"
                  className="register-btn"
                  onClick={closeMenu}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;
