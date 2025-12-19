import React, { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import productsData from "../../data/products.json";
import usersData from "../../data/users.json";

const Reports = () => {
  const [reports, setReports] = useState({
    productsByCategory: {},
    stockStatus: { high: 0, medium: 0, low: 0 },
    revenueByCategory: {},
    userGrowth: []
  });
  
  const [timeRange, setTimeRange] = useState("monthly");
  const { showNotification } = useNotification();

  useEffect(() => {
    generateReports();
    showNotification("Laporan dimuat", "info");
  }, []);

  const generateReports = () => {
    // Products by category
    const productsByCategory = {};
    productsData.forEach(product => {
      productsByCategory[product.category] = (productsByCategory[product.category] || 0) + 1;
    });

    // Stock status
    const stockStatus = {
      high: productsData.filter(p => p.stock > 20).length,
      medium: productsData.filter(p => p.stock >= 10 && p.stock <= 20).length,
      low: productsData.filter(p => p.stock < 10).length
    };

    // Revenue by category (estimated)
    const revenueByCategory = {};
    productsData.forEach(product => {
      const revenue = product.price * product.stock;
      revenueByCategory[product.category] = (revenueByCategory[product.category] || 0) + revenue;
    });

    // User growth (simulated data)
    const userGrowth = usersData.map((user, index) => ({
      month: `User ${index + 1}`,
      count: index + 1
    }));

    setReports({
      productsByCategory,
      stockStatus,
      revenueByCategory,
      userGrowth
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockColor = (stock) => {
    if (stock > 20) return '#10b981';
    if (stock >= 10) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Laporan</h1>
        <p>Analisis dan laporan kinerja TechHub</p>
        
        <div style={{ marginTop: '1rem' }}>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="admin-form-input"
            style={{ maxWidth: '200px' }}
          >
            <option value="daily">Harian</option>
            <option value="weekly">Mingguan</option>
            <option value="monthly">Bulanan</option>
            <option value="yearly">Tahunan</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Produk</div>
          <div className="admin-stat-value">{productsData.length}</div>
          <small>Produk aktif</small>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Pengguna</div>
          <div className="admin-stat-value">{usersData.length}</div>
          <small>User terdaftar</small>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Kategori</div>
          <div className="admin-stat-value">
            {Object.keys(reports.productsByCategory).length}
          </div>
          <small>Kategori produk</small>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Stok Rendah</div>
          <div className="admin-stat-value" style={{ color: '#ef4444' }}>
            {reports.stockStatus.low}
          </div>
          <small>Perlu restock</small>
        </div>
      </div>

      {/* Products by Category */}
      <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Produk Berdasarkan Kategori</h2>
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {Object.entries(reports.productsByCategory).map(([category, count]) => (
              <div key={category} style={{
                flex: '1',
                minWidth: '200px',
                background: '#f8fafc',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #3b82f6'
              }}>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>{category}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1d4ed8' }}>
                  {count} Produk
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Status Stok</h2>
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Stok Aman (&gt; 20)</span>
                <span style={{ fontWeight: '600', color: '#10b981' }}>{reports.stockStatus.high}</span>
              </div>
              <div style={{
                height: '10px',
                background: '#e5e7eb',
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(reports.stockStatus.high / productsData.length) * 100}%`,
                  background: '#10b981',
                  borderRadius: '5px'
                }}></div>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Stok Sedang (10-20)</span>
                <span style={{ fontWeight: '600', color: '#f59e0b' }}>{reports.stockStatus.medium}</span>
              </div>
              <div style={{
                height: '10px',
                background: '#e5e7eb',
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(reports.stockStatus.medium / productsData.length) * 100}%`,
                  background: '#f59e0b',
                  borderRadius: '5px'
                }}></div>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Stok Rendah (&lt; 10)</span>
                <span style={{ fontWeight: '600', color: '#ef4444' }}>{reports.stockStatus.low}</span>
              </div>
              <div style={{
                height: '10px',
                background: '#e5e7eb',
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${(reports.stockStatus.low / productsData.length) * 100}%`,
                  background: '#ef4444',
                  borderRadius: '5px'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue by Category */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Nilai Inventori per Kategori</h2>
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {Object.entries(reports.revenueByCategory).map(([category, revenue]) => (
              <div key={category} style={{
                background: '#f8fafc',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #8b5cf6'
              }}>
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {category}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#7c3aed' }}>
                  {formatCurrency(revenue)}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Nilai inventori
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div style={{
        background: '#f0f9ff',
        padding: '1.5rem',
        borderRadius: '10px',
        border: '1px solid #bae6fd',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#0369a1' }}>Ekspor Laporan</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="admin-btn-primary">
            📊 Ekspor ke Excel
          </button>
          <button className="admin-btn-secondary">
            📄 Ekspor ke PDF
          </button>
          <button className="admin-btn-success">
            📧 Kirim via Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;