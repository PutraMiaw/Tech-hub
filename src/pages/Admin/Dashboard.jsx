import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Tambahkan ini
import productsData from "../../data/products.json";
import usersData from "../../data/users.json";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    lowStockItems: 0,
    outOfStockItems: 0
  });

  useEffect(() => {
    // Hitung statistik
    const totalRevenue = productsData.reduce((sum, product) => {
      return sum + (product.price * (product.stock || 0));
    }, 0);

    const lowStockItems = productsData.filter(product => product.stock < 10 && product.stock > 0).length;
    const outOfStockItems = productsData.filter(product => product.stock === 0).length;

    setStats({
      totalProducts: productsData.length,
      totalUsers: usersData.length,
      totalRevenue,
      lowStockItems,
      outOfStockItems
    });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard Admin</h1>
        <p>Selamat datang di panel admin TechHub. Kelola toko Anda dari sini.</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {/* Total Products */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#3b82f6' }}>
            📱
          </div>
          <div className="admin-stat-title">Total Produk</div>
          <div className="admin-stat-value">{stats.totalProducts}</div>
          <small>Produk tersedia di sistem</small>
        </div>
        
        {/* Total Users */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#10b981' }}>
            👥
          </div>
          <div className="admin-stat-title">Total Pengguna</div>
          <div className="admin-stat-value">{stats.totalUsers}</div>
          <small>Pengguna terdaftar</small>
        </div>
        
        {/* Total Revenue */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#8b5cf6' }}>
            💰
          </div>
          <div className="admin-stat-title">Nilai Inventori</div>
          <div className="admin-stat-value">{formatCurrency(stats.totalRevenue)}</div>
          <small>Total nilai stok produk</small>
        </div>
        
        {/* Low Stock */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#f59e0b' }}>
            ⚠️
          </div>
          <div className="admin-stat-title">Stok Rendah</div>
          <div className="admin-stat-value">{stats.lowStockItems}</div>
          <small>Produk stok &lt; 10</small>
        </div>

        {/* Out of Stock */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>
            ❌
          </div>
          <div className="admin-stat-title">Habis Stok</div>
          <div className="admin-stat-value">{stats.outOfStockItems}</div>
          <small>Produk stok = 0</small>
        </div>

        {/* Admin Actions */}
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
            ⚡
          </div>
          <div className="admin-stat-title">Aksi Cepat</div>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/admin/products" className="admin-btn-primary" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'center', textDecoration: 'none' }}>
              Tambah Produk
            </Link>
            <Link to="/admin/users" className="admin-btn-secondary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Kelola User
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div style={{ marginTop: '3rem' }}>
        <div className="admin-page-header">
          <h2 className="admin-page-title" style={{ fontSize: '1.5rem' }}>Ringkasan Cepat</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {/* Products by Category */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Produk per Kategori</h3>
            {Array.from(new Set(productsData.map(p => p.category))).map(category => {
              const count = productsData.filter(p => p.category === category).length;
              return (
                <div key={category} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#4b5563' }}>{category}</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{count}</span>
                  </div>
                  <div style={{
                    height: '6px',
                    background: '#e5e7eb',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(count / productsData.length) * 100}%`,
                      background: '#3b82f6',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* User Distribution */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Distribusi User</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10b981',
                  marginRight: '0.5rem'
                }}></div>
                <span style={{ color: '#4b5563' }}>Admin Users</span>
                <span style={{ marginLeft: 'auto', fontWeight: '600', color: '#1f2937' }}>
                  {usersData.filter(u => u.role === 'admin').length}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  marginRight: '0.5rem'
                }}></div>
                <span style={{ color: '#4b5563' }}>Regular Users</span>
                <span style={{ marginLeft: 'auto', fontWeight: '600', color: '#1f2937' }}>
                  {usersData.filter(u => u.role === 'user').length}
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Status Stok</h3>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10b981',
                  marginRight: '0.5rem'
                }}></div>
                <span style={{ color: '#4b5563' }}>Stok Aman (&gt; 20)</span>
                <span style={{ marginLeft: 'auto', fontWeight: '600', color: '#10b981' }}>
                  {productsData.filter(p => p.stock > 20).length}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#f59e0b',
                  marginRight: '0.5rem'
                }}></div>
                <span style={{ color: '#4b5563' }}>Stok Sedang (10-20)</span>
                <span style={{ marginLeft: 'auto', fontWeight: '600', color: '#f59e0b' }}>
                  {productsData.filter(p => p.stock >= 10 && p.stock <= 20).length}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  marginRight: '0.5rem'
                }}></div>
                <span style={{ color: '#4b5563' }}>Stok Rendah (&lt; 10)</span>
                <span style={{ marginLeft: 'auto', fontWeight: '600', color: '#ef4444' }}>
                  {stats.lowStockItems}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ marginTop: '3rem' }}>
        <div className="admin-page-header">
          <h2 className="admin-page-title" style={{ fontSize: '1.5rem' }}>Aktivitas Terbaru</h2>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Last Login */}
            <div style={{
              flex: '1',
              minWidth: '200px',
              padding: '1rem',
              background: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                Login Terakhir
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                {new Date().toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* System Status */}
            <div style={{
              flex: '1',
              minWidth: '200px',
              padding: '1rem',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#0369a1', marginBottom: '0.5rem' }}>
                Status Sistem
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  marginRight: '0.5rem',
                  animation: 'pulse 2s infinite'
                }}></div>
                <span style={{ fontWeight: '600', color: '#0c4a6e' }}>Semua Sistem Normal</span>
              </div>
            </div>

            {/* Quick Links */}
            <div style={{
              flex: '1',
              minWidth: '200px',
              padding: '1rem',
              background: '#fef7ff',
              borderRadius: '8px',
              border: '1px solid #f3e8ff'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#7c3aed', marginBottom: '0.5rem' }}>
                Tautan Cepat
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Link to="/admin/products" className="admin-btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Produk
                </Link>
                <Link to="/admin/users" className="admin-btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                  User
                </Link>
                <Link to="/admin/reports" className="admin-btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Laporan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;