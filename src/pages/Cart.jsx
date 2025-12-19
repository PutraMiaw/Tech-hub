import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shippingCost = cartTotal > 5000000 ? 0 : 25000;
  const totalAmount = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div
        className="container"
        style={{
          textAlign: "center",
          padding: isMobile ? "2rem 1rem" : "4rem 2rem",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: isMobile ? "3rem" : "4rem",
            marginBottom: isMobile ? "1rem" : "1.5rem",
            color: "#d1d5db",
          }}
        >
          🛒
        </div>
        <h2
          style={{
            marginBottom: isMobile ? "0.75rem" : "1rem",
            color: "#1f2937",
            fontSize: isMobile ? "1.5rem" : "1.8rem",
          }}
        >
          Keranjang Belanja Kosong
        </h2>
        <p
          style={{
            marginBottom: isMobile ? "1.5rem" : "2rem",
            color: "#6b7280",
            fontSize: isMobile ? "1rem" : "1.1rem",
          }}
        >
          Tambahkan produk ke keranjang untuk melanjutkan belanja
        </p>
        <Link
          to="/products"
          className="btn"
          style={{
            width: isMobile ? "100%" : "200px",
            padding: isMobile ? "0.875rem" : "1rem",
          }}
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          marginBottom: isMobile ? "1.5rem" : "2rem",
          gap: isMobile ? "0.75rem" : "0",
        }}
      >
        <h1
          style={{
            color: "#1f2937",
            fontSize: isMobile ? "1.5rem" : "2rem",
            fontWeight: "700",
            lineHeight: "1.2",
          }}
        >
          Keranjang Belanja
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              color: "#6b7280",
              fontSize: isMobile ? "0.9rem" : "1rem",
            }}
          >
            {cartItems.length} {cartItems.length > 1 ? "produk" : "produk"}
          </span>
          {!isMobile && <span style={{ color: "#9ca3af" }}>•</span>}
          <span
            style={{
              color: "#1e40af",
              fontSize: isMobile ? "1rem" : "1.1rem",
              fontWeight: "600",
            }}
          >
            Rp {cartTotal.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? "1.5fr 1fr"
            : "2fr 1fr",
          gap: isMobile ? "1.5rem" : "2rem",
        }}
      >
        {/* Cart Items Section */}
        <div>
          {/* Table Header - Hide on mobile */}
          {!isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                padding: isTablet ? "0.875rem 1rem" : "1rem 1.5rem",
                background: "#f8fafc",
                borderRadius: "10px",
                marginBottom: "1rem",
                fontWeight: "600",
                color: "#475569",
                fontSize: isTablet ? "0.875rem" : "0.95rem",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>📦</span>
                <span>PRODUK</span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <span>💰</span>
                <span>HARGA</span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <span>🔢</span>
                <span>KUANTITAS</span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <span>🧮</span>
                <span>SUBTOTAL</span>
              </div>
            </div>
          )}

          {/* Cart Items - Desktop vs Mobile View */}
          {cartItems.map((item) =>
            isMobile ? (
              <div
                key={item.id}
                style={{
                  padding: "1rem",
                  background: "white",
                  borderRadius: "10px",
                  marginBottom: "1rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        marginBottom: "0.5rem",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        lineHeight: "1.4",
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        color: "#1e40af",
                        fontWeight: "600",
                        fontSize: "1rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                    {item.category && (
                      <span
                        style={{
                          display: "inline-block",
                          background: "#eff6ff",
                          color: "#1d4ed8",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "1rem",
                    borderTop: "1px solid #f3f4f6",
                  }}
                >
                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "#f9fafb",
                      padding: "0.5rem",
                      borderRadius: "8px",
                    }}
                  >
                    <button
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        /* Decrease quantity */
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: "40px",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: "1rem",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      style={{
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        /* Increase quantity */
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        fontWeight: "700",
                        color: "#1e40af",
                        fontSize: "1.1rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc2626",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.25rem 0.5rem",
                      }}
                    >
                      <span>🗑️</span>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <CartItem key={item.id} item={item} />
            )
          )}

          {/* Footer Actions */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "stretch" : "center",
              paddingTop: isMobile ? "1rem" : "1.5rem",
              marginTop: isMobile ? "1rem" : "1rem",
              borderTop: "1px solid #e5e7eb",
              gap: isMobile ? "1rem" : "0",
            }}
          >
            <Link
              to="/products"
              style={{
                color: "#3b82f6",
                textDecoration: "none",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: isMobile ? "0.75rem" : "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "1px solid #3b82f6",
                transition: "all 0.2s",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#eff6ff";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>←</span>
              Lanjutkan Belanja
            </Link>

            <div
              style={{
                display: "flex",
                gap: isMobile ? "0.75rem" : "1rem",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <button
                onClick={clearCart}
                style={{
                  background: "none",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  padding: isMobile ? "0.75rem" : "0.75rem 1.5rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  flex: isMobile ? 1 : "none",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#fef2f2";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "none";
                }}
              >
                <span>🗑️</span>
                Hapus Semua
              </button>

              {isMobile && (
                <Link
                  to="/checkout"
                  className="btn"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Checkout
                </Link>
              )}
            </div>
          </div>

          {/* Shipping Progress Bar */}
          <div
            style={{
              background: "#f0f9ff",
              padding: isMobile ? "1rem" : "1.5rem",
              borderRadius: "12px",
              marginTop: "2rem",
              border: "1px solid #bae6fd",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                marginBottom: "1rem",
                gap: isMobile ? "0.75rem" : "0",
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: "600",
                    color: "#0369a1",
                    marginBottom: "0.25rem",
                  }}
                >
                  {cartTotal >= 5000000
                    ? "🎉 Gratis Ongkir!"
                    : "🎯 Gratis Ongkir!"}
                </h4>
                <p
                  style={{
                    color: "#0c4a6e",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    lineHeight: "1.4",
                  }}
                >
                  {cartTotal < 5000000
                    ? `Belanja Rp ${(5000000 - cartTotal).toLocaleString(
                        "id-ID"
                      )} lagi untuk gratis ongkir`
                    : "Selamat! Anda sudah mendapatkan gratis ongkir"}
                </p>
              </div>
              {!isMobile && (
                <div
                  style={{
                    background: "#0369a1",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {Math.min(Math.round((cartTotal / 5000000) * 100), 100)}%
                </div>
              )}
            </div>
            <div
              style={{
                height: "8px",
                background: "#e0f2fe",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
                  width: `${Math.min((cartTotal / 5000000) * 100, 100)}%`,
                  transition: "width 0.5s",
                }}
              />
            </div>
            {isMobile && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#0369a1",
                }}
              >
                {Math.min(Math.round((cartTotal / 5000000) * 100), 100)}%
                tercapai
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div
          style={{
            position: isMobile ? "static" : "sticky",
            top: isMobile ? "0" : "2rem",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: isMobile ? "1.5rem" : "2rem",
              boxShadow: isMobile
                ? "0 2px 8px rgba(0,0,0,0.08)"
                : "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
              marginBottom: isMobile ? "1.5rem" : "0",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.2rem" : "1.3rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1.5rem",
                paddingBottom: isMobile ? "0.875rem" : "1rem",
                borderBottom: "2px solid #e5e7eb",
              }}
            >
              Ringkasan Pesanan
            </h3>

            {/* Order Details */}
            <div
              style={{
                marginBottom: "1.5rem",
                maxHeight: isMobile ? "200px" : "none",
                overflowY: "auto",
              }}
            >
              {cartItems
                .slice(0, isMobile ? 3 : cartItems.length)
                .map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.75rem",
                      paddingBottom: "0.75rem",
                      borderBottom:
                        index <
                        (isMobile
                          ? Math.min(2, cartItems.length - 1)
                          : cartItems.length - 1)
                          ? "1px dashed #e5e7eb"
                          : "none",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: isMobile ? "0.9rem" : "0.95rem",
                          fontWeight: "500",
                          color: "#1f2937",
                          marginBottom: "0.25rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: isMobile ? "0.8rem" : "0.85rem",
                          color: "#6b7280",
                        }}
                      >
                        {item.quantity} × Rp{" "}
                        {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#1e40af",
                        fontSize: isMobile ? "0.9rem" : "0.95rem",
                        flexShrink: 0,
                        marginLeft: "0.5rem",
                      }}
                    >
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              {isMobile && cartItems.length > 3 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "0.5rem",
                    color: "#3b82f6",
                    fontSize: "0.875rem",
                  }}
                >
                  +{cartItems.length - 3} produk lainnya
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}
                >
                  Rp {cartTotal.toLocaleString("id-ID")}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  Ongkos Kirim
                </span>
                <span
                  style={{
                    fontWeight: "600",
                    color: shippingCost === 0 ? "#10b981" : "#6b7280",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}
                >
                  {shippingCost === 0
                    ? "GRATIS"
                    : `Rp ${shippingCost.toLocaleString("id-ID")}`}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  Biaya Layanan
                </span>
                <span
                  style={{
                    fontWeight: "600",
                    color: "#6b7280",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}
                >
                  Rp 0
                </span>
              </div>

              {shippingCost === 0 && (
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#166534",
                      fontSize: isMobile ? "0.8rem" : "0.9rem",
                    }}
                  >
                    <span>🎉</span>
                    <span>Anda hemat Rp 25.000 untuk ongkos kirim!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1rem",
                borderTop: "2px solid #e5e7eb",
                marginBottom: isMobile ? "1.5rem" : "2rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Total Pembayaran
                </span>
                <p
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.85rem",
                    color: "#6b7280",
                    marginTop: "0.25rem",
                  }}
                >
                  Termasuk PPN 11%
                </p>
              </div>
              <span
                style={{
                  fontSize: isMobile ? "1.3rem" : "1.5rem",
                  fontWeight: "700",
                  color: "#1e40af",
                }}
              >
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Checkout Button */}
            {!isMobile && (
              <Link
                to="/checkout"
                className="btn"
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                }}
              >
                Lanjut ke Checkout
              </Link>
            )}

            {/* Payment Methods */}
            <div
              style={{
                marginBottom: "1.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  color: "#6b7280",
                  marginBottom: "0.75rem",
                }}
              >
                Metode Pembayaran:
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "BCA",
                  "Mandiri",
                  "BNI",
                  "BRI",
                  "GoPay",
                  "OVO",
                  "DANA",
                  "Shopeepay",
                ].map((bank) => (
                  <span
                    key={bank}
                    style={{
                      padding: isMobile ? "0.2rem 0.5rem" : "0.25rem 0.75rem",
                      background: "#f3f4f6",
                      borderRadius: "6px",
                      fontSize: isMobile ? "0.75rem" : "0.8rem",
                      color: "#4b5563",
                      flexShrink: 0,
                    }}
                  >
                    {bank}
                  </span>
                ))}
              </div>
            </div>

            {/* Security Info */}
            <div
              style={{
                marginTop: "1.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#6b7280",
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span>🔒</span>
                <span>Pembayaran aman & terenkripsi</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#6b7280",
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span>🔄</span>
                <span>Garansi 30 hari pengembalian</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#6b7280",
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                }}
              >
                <span>📦</span>
                <span>Gratis pengembalian produk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
