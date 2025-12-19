import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showNotification } = useNotification();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "bank_transfer",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama lengkap harus diisi";
    if (!formData.email.trim()) newErrors.email = "Email harus diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email tidak valid";
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon harus diisi";
    else if (!/^[0-9+\-\s]+$/.test(formData.phone))
      newErrors.phone = "Nomor telepon tidak valid";
    if (!formData.address.trim())
      newErrors.address = "Alamat lengkap harus diisi";
    if (!formData.city.trim()) newErrors.city = "Kota harus diisi";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Kode pos harus diisi";
    else if (!/^\d+$/.test(formData.postalCode))
      newErrors.postalCode = "Kode pos harus berupa angka";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showNotification("Harap lengkapi semua data yang diperlukan", "error");
      return;
    }

    // Simulasi proses checkout
    showNotification("Pesanan sedang diproses...", "info");

    setTimeout(() => {
      setShowSuccess(true);
      clearCart();
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/");
  };

  const shippingCost = cartTotal > 500000 ? 0 : 25000;
  const totalAmount = cartTotal + shippingCost;

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <h2 style={{ marginBottom: "1rem", color: "#1f2937" }}>
          Keranjang belanja kosong
        </h2>
        <p style={{ marginBottom: "2rem", color: "#6b7280" }}>
          Tambahkan produk terlebih dahulu untuk checkout
        </p>
        <button onClick={() => navigate("/products")} className="btn">
          Lihat Produk
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h1 style={{
          color: "#1f2937",
          fontSize: isMobile ? "1.5rem" : "2rem",
          fontWeight: "700",
          marginBottom: isMobile ? "1.5rem" : "2rem",
        }}>
          Checkout
        </h1>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr", 
          gap: isMobile ? "1.5rem" : "2rem",
          alignItems: "flex-start",
        }}>
          {/* Checkout Form */}
          <div style={{ order: isMobile ? 2 : 1 }}>
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: isMobile ? "1.5rem" : "2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
              marginBottom: isMobile ? "1.5rem" : "0",
            }}>
              <h2 style={{ 
                marginBottom: isMobile ? "1rem" : "1.5rem", 
                color: "#1f2937",
                fontSize: isMobile ? "1.2rem" : "1.5rem",
              }}>
                Data Pengiriman
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" style={{
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    marginBottom: "0.5rem",
                    display: "block",
                    fontWeight: "500",
                    color: "#374151",
                  }}>
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Masukkan nama lengkap"
                    style={{
                      width: "100%",
                      padding: isMobile ? "0.75rem" : "1rem",
                      border: errors.name ? "1px solid #ef4444" : "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: isMobile ? "16px" : "1rem",
                      transition: "border-color 0.2s",
                    }}
                  />
                  {errors.name && (
                    <div style={{ 
                      color: "#ef4444", 
                      fontSize: "0.875rem", 
                      marginTop: "0.5rem" 
                    }}>
                      {errors.name}
                    </div>
                  )}
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? "1rem" : "1.5rem",
                  marginTop: "1.5rem",
                }}>
                  <div className="form-group">
                    <label htmlFor="email" style={{
                      fontSize: isMobile ? "0.95rem" : "1rem",
                      marginBottom: "0.5rem",
                      display: "block",
                      fontWeight: "500",
                      color: "#374151",
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="email@contoh.com"
                      style={{
                        width: "100%",
                        padding: isMobile ? "0.75rem" : "1rem",
                        border: errors.email ? "1px solid #ef4444" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: isMobile ? "16px" : "1rem",
                      }}
                    />
                    {errors.email && (
                      <div style={{ 
                        color: "#ef4444", 
                        fontSize: "0.875rem", 
                        marginTop: "0.5rem" 
                      }}>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" style={{
                      fontSize: isMobile ? "0.95rem" : "1rem",
                      marginBottom: "0.5rem",
                      display: "block",
                      fontWeight: "500",
                      color: "#374151",
                    }}>
                      No. Telepon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="0812-3456-7890"
                      style={{
                        width: "100%",
                        padding: isMobile ? "0.75rem" : "1rem",
                        border: errors.phone ? "1px solid #ef4444" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: isMobile ? "16px" : "1rem",
                      }}
                    />
                    {errors.phone && (
                      <div style={{ 
                        color: "#ef4444", 
                        fontSize: "0.875rem", 
                        marginTop: "0.5rem" 
                      }}>
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: "1.5rem" }}>
                  <label htmlFor="address" style={{
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    marginBottom: "0.5rem",
                    display: "block",
                    fontWeight: "500",
                    color: "#374151",
                  }}>
                    Alamat Lengkap *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Masukkan alamat lengkap termasuk nomor rumah, RT/RW"
                    rows="3"
                    style={{
                      width: "100%",
                      padding: isMobile ? "0.75rem" : "1rem",
                      border: errors.address ? "1px solid #ef4444" : "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: isMobile ? "16px" : "1rem",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  />
                  {errors.address && (
                    <div style={{ 
                      color: "#ef4444", 
                      fontSize: "0.875rem", 
                      marginTop: "0.5rem" 
                    }}>
                      {errors.address}
                    </div>
                  )}
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? "1rem" : "1.5rem",
                  marginTop: "1.5rem",
                }}>
                  <div className="form-group">
                    <label htmlFor="city" style={{
                      fontSize: isMobile ? "0.95rem" : "1rem",
                      marginBottom: "0.5rem",
                      display: "block",
                      fontWeight: "500",
                      color: "#374151",
                    }}>
                      Kota *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Nama kota"
                      style={{
                        width: "100%",
                        padding: isMobile ? "0.75rem" : "1rem",
                        border: errors.city ? "1px solid #ef4444" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: isMobile ? "16px" : "1rem",
                      }}
                    />
                    {errors.city && (
                      <div style={{ 
                        color: "#ef4444", 
                        fontSize: "0.875rem", 
                        marginTop: "0.5rem" 
                      }}>
                        {errors.city}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode" style={{
                      fontSize: isMobile ? "0.95rem" : "1rem",
                      marginBottom: "0.5rem",
                      display: "block",
                      fontWeight: "500",
                      color: "#374151",
                    }}>
                      Kode Pos *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      placeholder="12345"
                      style={{
                        width: "100%",
                        padding: isMobile ? "0.75rem" : "1rem",
                        border: errors.postalCode ? "1px solid #ef4444" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: isMobile ? "16px" : "1rem",
                      }}
                    />
                    {errors.postalCode && (
                      <div style={{ 
                        color: "#ef4444", 
                        fontSize: "0.875rem", 
                        marginTop: "0.5rem" 
                      }}>
                        {errors.postalCode}
                    </div>
                    )}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: "1.5rem" }}>
                  <label htmlFor="paymentMethod" style={{
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    marginBottom: "0.5rem",
                    display: "block",
                    fontWeight: "500",
                    color: "#374151",
                  }}>
                    Metode Pembayaran
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: isMobile ? "0.75rem" : "1rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: isMobile ? "16px" : "1rem",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    <option value="bank_transfer">Transfer Bank</option>
                    <option value="credit_card">Kartu Kredit</option>
                    <option value="cod">Cash on Delivery (COD)</option>
                    <option value="e-wallet">E-Wallet (OVO/DANA/GoPay)</option>
                  </select>
                </div>

                <div style={{ marginTop: "2rem" }}>
                  <p style={{
                    fontSize: isMobile ? "0.8rem" : "0.875rem",
                    color: "#6b7280",
                    marginBottom: "1rem",
                    lineHeight: "1.5",
                  }}>
                    * Pastikan data yang diisi sudah benar. Pesanan tidak dapat
                    dibatalkan setelah diproses.
                  </p>
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: isMobile ? "0.875rem" : "1rem",
                      background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(30, 64, 175, 0.3)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Konfirmasi & Bayar Sekarang
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ 
            order: isMobile ? 1 : 2,
            position: isMobile ? "static" : "sticky",
            top: isMobile ? "0" : "2rem",
          }}>
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: isMobile ? "1.5rem" : "2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
              marginBottom: isMobile ? "1.5rem" : "0",
            }}>
              <h2 style={{ 
                marginBottom: isMobile ? "1rem" : "1.5rem", 
                color: "#1f2937",
                fontSize: isMobile ? "1.2rem" : "1.5rem",
              }}>
                Ringkasan Pesanan
              </h2>
              
              <div style={{ marginBottom: "1.5rem" }}>
                {cartItems.slice(0, isMobile ? 2 : cartItems.length).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      padding: isMobile ? "0.75rem 0" : "1rem 0",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: isMobile ? "60px" : "80px",
                        height: isMobile ? "60px" : "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: isMobile ? "0.75rem" : "1rem",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        marginBottom: "0.25rem", 
                        fontSize: isMobile ? "0.9rem" : "0.95rem",
                        fontWeight: "500",
                        color: "#1f2937",
                        lineHeight: "1.4",
                      }}>
                        {isMobile && item.name.length > 40 
                          ? item.name.substring(0, 40) + "..." 
                          : item.name}
                      </h4>
                      <p style={{ 
                        color: "#6b7280", 
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                        marginBottom: "0.25rem",
                      }}>
                        Rp {item.price.toLocaleString("id-ID")} × {item.quantity}
                      </p>
                    </div>
                    <p style={{ 
                      fontWeight: "600", 
                      color: "#1e40af",
                      fontSize: isMobile ? "0.95rem" : "1rem",
                      flexShrink: 0,
                      marginLeft: isMobile ? "0.5rem" : "1rem",
                    }}>
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
                
                {isMobile && cartItems.length > 2 && (
                  <div style={{
                    textAlign: "center",
                    padding: "0.75rem",
                    color: "#3b82f6",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    borderTop: "1px solid #e5e7eb",
                  }}>
                    +{cartItems.length - 2} produk lainnya
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div style={{
                background: "#f9fafb",
                padding: isMobile ? "1rem" : "1.5rem",
                borderRadius: "10px",
                marginBottom: "1.5rem",
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}>
                  <span style={{ 
                    color: "#6b7280",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}>
                    Subtotal
                  </span>
                  <span style={{ 
                    fontWeight: "600",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}>
                    Rp {cartTotal.toLocaleString("id-ID")}
                  </span>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}>
                  <span style={{ 
                    color: "#6b7280",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}>
                    Ongkos Kirim
                  </span>
                  <span style={{
                    fontWeight: "600",
                    color: shippingCost === 0 ? "#10b981" : "#6b7280",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}>
                    {shippingCost === 0
                      ? "GRATIS"
                      : `Rp ${shippingCost.toLocaleString("id-ID")}`}
                  </span>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}>
                  <span style={{ 
                    color: "#6b7280",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}>
                    Diskon
                  </span>
                  <span style={{ 
                    fontWeight: "600", 
                    color: "#6b7280",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}>
                    Rp 0
                  </span>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid #e5e7eb",
                  marginTop: "0.75rem",
                }}>
                  <span style={{ 
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    fontWeight: "700",
                    color: "#1e40af",
                  }}>
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div style={{
                paddingTop: "1rem",
                borderTop: "1px solid #e5e7eb",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#6b7280",
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
                  marginBottom: "0.5rem",
                }}>
                  <span>🔒</span>
                  <span>Pembayaran aman & terenkripsi</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#6b7280",
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
                  marginBottom: "0.5rem",
                }}>
                  <span>🔄</span>
                  <span>Garansi 30 hari pengembalian</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#6b7280",
                  fontSize: isMobile ? "0.8rem" : "0.875rem",
                }}>
                  <span>📦</span>
                  <span>Gratis pengembalian produk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          animation: "fadeIn 0.3s",
          padding: isMobile ? "1rem" : "2rem",
        }}>
          <div style={{
            background: "white",
            padding: isMobile ? "1.5rem" : "3rem",
            borderRadius: "12px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            animation: "slideUp 0.3s",
          }}>
            <div style={{
              fontSize: isMobile ? "3rem" : "4rem",
              color: "#10b981",
              marginBottom: isMobile ? "1rem" : "1.5rem",
            }}>
              ✓
            </div>
            <h2 style={{ 
              marginBottom: isMobile ? "0.75rem" : "1rem", 
              color: "#1f2937",
              fontSize: isMobile ? "1.5rem" : "2rem",
            }}>
              Pesanan Berhasil!
            </h2>
            <p style={{ 
              marginBottom: isMobile ? "1rem" : "1.5rem", 
              color: "#6b7280",
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              lineHeight: "1.5",
            }}>
              Terima kasih telah berbelanja di TechHub. Pesanan Anda sedang
              diproses dan akan dikirim dalam 2-3 hari kerja.
            </p>
            <p style={{
              marginBottom: isMobile ? "1.5rem" : "2rem",
              color: "#4b5563",
              fontWeight: "500",
              fontSize: isMobile ? "0.9rem" : "1rem",
            }}>
              No. Pesanan:{" "}
              <span style={{ color: "#1e40af", fontWeight: "600" }}>
                TH-{Date.now().toString().slice(-8)}
              </span>
            </p>
            <div style={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "0.75rem" : "1rem", 
            }}>
              <button
                onClick={() => navigate("/products")}
                style={{
                  flex: isMobile ? "none" : 1,
                  background: "white",
                  color: "#1d4ed8",
                  border: "2px solid #1d4ed8",
                  padding: isMobile ? "0.75rem" : "1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: isMobile ? "0.95rem" : "1rem",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Lanjut Belanja
              </button>
              <button
                onClick={handleCloseSuccess}
                style={{
                  flex: isMobile ? "none" : 1,
                  background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                  color: "white",
                  border: "none",
                  padding: isMobile ? "0.75rem" : "1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: isMobile ? "0.95rem" : "1rem",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Ke Beranda
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;