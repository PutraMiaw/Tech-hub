import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import ManageProducts from "./pages/Admin/ManageProducts";
import ManageUsers from "./pages/Admin/ManageUsers";
import Reports from "./pages/Admin/Reports";

import "./App.css";

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="app">
              {/* Header hanya untuk non-admin routes */}
              <Routes>
                <Route path="/admin/*" element={null} />
                <Route path="*" element={<Header />} />
              </Routes>

              <main className="main-content">
                <Routes>
                  {/* ========== PUBLIC ROUTES ========== */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* ========== PROTECTED USER ROUTES ========== */}
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute allowedRoles={["user", "admin"]}>
                        <Cart />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/checkout"
                    element={
                      <PrivateRoute allowedRoles={["user", "admin"]}>
                        <Checkout />
                      </PrivateRoute>
                    }
                  />

                  {/* ========== ADMIN ROUTES ========== */}
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute allowedRoles={["admin"]}>
                        <AdminLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ManageProducts />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="reports" element={<Reports />} />
                  </Route>

                  {/* ========== 404 PAGE ========== */}
                  <Route
                    path="*"
                    element={
                      <div className="page-not-found">
                        <h1>404 - Halaman Tidak Ditemukan</h1>
                        <p>Halaman yang Anda cari tidak ada.</p>
                      </div>
                    }
                  />
                </Routes>
              </main>

              {/* Footer hanya untuk non-admin routes */}
              <Routes>
                <Route path="/admin/*" element={null} />
                <Route path="*" element={<Footer />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
