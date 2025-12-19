import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartNotification } from "../components/Notification";
import products from "../data/products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { notifyAddToCart } = useCartNotification();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <h2 style={{ marginBottom: "1rem", color: "#1f2937" }}>
          Produk tidak ditemukan
        </h2>
        <button onClick={() => navigate("/products")} className="btn">
          Kembali ke Produk
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    notifyAddToCart(product.name);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  // Simple responsive breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024 && windowWidth > 768;

  return (
    <div style={{ 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: isMobile ? "0.5rem" : "1rem" 
    }}>
      {/* Simple Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#3b82f6",
          cursor: "pointer",
          padding: "0.5rem 0",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: isMobile ? "0.9rem" : "1rem",
        }}
      >
        <span>←</span>
        {isMobile ? "Kembali" : "Kembali ke Produk"}
      </button>

      {/* Main Product Container */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "1rem" : "2rem",
        background: "white",
        borderRadius: "10px",
        padding: isMobile ? "1rem" : "1.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}>
        
        {/* Left Column - Image */}
        <div style={{
          flex: isMobile ? "none" : 1,
          width: isMobile ? "100%" : "auto",
        }}>
          <div style={{
            background: "#f9fafb",
            borderRadius: "8px",
            padding: isMobile ? "1rem" : "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: isMobile ? "250px" : "350px",
            marginBottom: isMobile ? "1rem" : "0",
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&auto=format";
              }}
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div style={{
          flex: isMobile ? "none" : 1,
          width: isMobile ? "100%" : "auto",
        }}>
          {/* Product Title & Category */}
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              background: "#eff6ff",
              color: "#1d4ed8",
              padding: "0.3rem 0.8rem",
              borderRadius: "20px",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              fontWeight: "600",
              display: "inline-block",
              marginBottom: "0.5rem",
            }}>
              {product.category}
            </span>
            <h1 style={{
              fontSize: isMobile ? "1.3rem" : "1.8rem",
              fontWeight: "700",
              color: "#1f2937",
              lineHeight: "1.3",
            }}>
              {product.name}
            </h1>
          </div>

          {/* Price & Stock */}
          <div style={{
            background: "#f9fafb",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            border: "1px solid #e5e7eb",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}>
              <span style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                fontWeight: "800",
                color: "#1e40af",
              }}>
                Rp {product.price.toLocaleString("id-ID")}
              </span>
              <span style={{
                background: product.stock > 0 ? "#dcfce7" : "#fee2e2",
                color: product.stock > 0 ? "#166534" : "#dc2626",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}>
                {product.stock > 0 ? `Stok: ${product.stock}` : "Stok Habis"}
              </span>
            </div>
            <div style={{
              fontSize: "0.9rem",
              color: "#6b7280",
            }}>
              ⭐ 4.8/5 • 🛒 450+ terjual • 📦 Gratis ongkir
            </div>
          </div>

          {/* Features - Simple Grid */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ 
              fontSize: "1rem", 
              fontWeight: "600", 
              marginBottom: "0.75rem",
              color: "#1f2937"
            }}>
              Keunggulan Produk
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "0.5rem",
            }}>
              {[
                { icon: "🛡️", text: "Garansi 2 Tahun" },
                { icon: "🚚", text: "Gratis Ongkir" },
                { icon: "⚡", text: "Pengiriman Cepat" },
                { icon: "💳", text: "Cicilan 0%" },
              ].map((feature, index) => (
                <div key={index} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  background: "#f9fafb",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                }}>
                  <span style={{ fontSize: "1rem" }}>{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Specifications */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ 
              fontSize: "1rem", 
              fontWeight: "600", 
              marginBottom: "0.75rem",
              color: "#1f2937"
            }}>
              Spesifikasi
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "0.5rem",
            }}>
              <div style={{
                background: "#f9fafb",
                padding: "0.75rem",
                borderRadius: "8px",
              }}>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Kategori</div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>{product.category}</div>
              </div>
              <div style={{
                background: "#f9fafb",
                padding: "0.75rem",
                borderRadius: "8px",
              }}>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Stok</div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>{product.stock} unit</div>
              </div>
              <div style={{
                background: "#f9fafb",
                padding: "0.75rem",
                borderRadius: "8px",
              }}>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Garansi</div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>2 Tahun</div>
              </div>
              <div style={{
                background: "#f9fafb",
                padding: "0.75rem",
                borderRadius: "8px",
              }}>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Pengiriman</div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>2-3 Hari</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "0.75rem",
          }}>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                flex: 1,
                background: product.stock > 0 
                  ? "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)" 
                  : "#9ca3af",
                color: "white",
                border: "none",
                padding: isMobile ? "0.875rem" : "1rem",
                borderRadius: "8px",
                fontSize: isMobile ? "0.95rem" : "1rem",
                fontWeight: "600",
                cursor: product.stock > 0 ? "pointer" : "not-allowed",
              }}
            >
              {product.stock > 0 ? "+ Tambah ke Keranjang" : "Stok Habis"}
            </button>
            
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              style={{
                flex: 1,
                background: product.stock > 0 
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                  : "#9ca3af",
                color: "white",
                border: "none",
                padding: isMobile ? "0.875rem" : "1rem",
                borderRadius: "8px",
                fontSize: isMobile ? "0.95rem" : "1rem",
                fontWeight: "600",
                cursor: product.stock > 0 ? "pointer" : "not-allowed",
              }}
            >
              {product.stock > 0 ? "Beli Sekarang" : "Stok Habis"}
            </button>
          </div>

          {/* Mobile Info */}
          {isMobile && (
            <div style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#f0f9ff",
              borderRadius: "8px",
              border: "1px solid #bae6fd",
            }}>
              <div style={{
                fontSize: "0.85rem",
                color: "#0c4a6e",
                lineHeight: "1.5",
              }}>
                <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>💡 Info Penting:</div>
                • Gratis ongkir untuk pembelian di atas Rp 5jt<br/>
                • Pesanan diproses dalam 1x24 jam<br/>
                • Garansi resmi 2 tahun
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div style={{
        background: "white",
        borderRadius: "8px",
        padding: "1rem",
        marginTop: "1.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}>
        <h3 style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "#1f2937",
          marginBottom: "0.75rem",
        }}>
          Deskripsi Produk
        </h3>
        <div style={{
          color: "#6b7280",
          fontSize: "0.9rem",
          lineHeight: "1.6",
        }}>
          <p>
            {product.description || `${product.name} adalah produk berkualitas tinggi dengan performa optimal. Dilengkapi dengan fitur-fitur terbaru dan garansi resmi dari produsen.`}
          </p>
          {!isMobile && (
            <div style={{ marginTop: "1rem" }}>
              <p>• Material premium dan tahan lama</p>
              <p>• Desain ergonomis untuk kenyamanan maksimal</p>
              <p>• Performa tinggi dengan konsumsi daya efisien</p>
              <p>• Dukungan garansi resmi 2 tahun</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;