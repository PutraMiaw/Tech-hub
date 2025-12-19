import { useCart } from "../context/CartContext";
import { useCartNotification } from "./Notification";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { notifyRemoveFromCart } = useCartNotification();

  const handleRemove = () => {
    removeFromCart(item.id);
    notifyRemoveFromCart(item.name);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        alignItems: "center",
        padding: "1.5rem 0",
        borderBottom: "1px solid #e5e7eb",
        gap: "1rem",
      }}
    >
      {/* Product Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "0.25rem",
            }}
          >
            {item.name}
          </h3>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.95rem",
              marginBottom: "0.5rem",
            }}
          >
            Kategori: {item.category}
          </p>
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.9rem",
            }}
          >
            Stok tersedia: {item.stock} unit
          </p>
        </div>
      </div>

      {/* Price */}
      <div style={{ textAlign: "center" }}>
        <span style={{ fontWeight: "600", color: "#1f2937" }}>
          Rp {item.price.toLocaleString("id-ID")}
        </span>
      </div>

      {/* Quantity Controls */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            style={{
              background: "#f9fafb",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "#374151",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#f3f4f6")}
            onMouseOut={(e) => (e.target.style.background = "#f9fafb")}
          >
            −
          </button>
          <span
            style={{
              padding: "0.5rem 1.5rem",
              fontWeight: "600",
              color: "#1f2937",
              minWidth: "50px",
              display: "inline-block",
            }}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            style={{
              background: "#f9fafb",
              border: "none",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "#374151",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#f3f4f6")}
            onMouseOut={(e) => (e.target.style.background = "#f9fafb")}
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontWeight: "700",
            color: "#1e40af",
            fontSize: "1.1rem",
          }}
        >
          Rp {subtotal.toLocaleString("id-ID")}
        </span>
        <button
          onClick={handleRemove}
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "500",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#fee2e2";
            e.target.style.borderColor = "#fca5a5";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#fef2f2";
            e.target.style.borderColor = "#fecaca";
          }}
        >
          <span>🗑️</span>
          Hapus
        </button>
      </div>
    </div>
  );
};

export default CartItem;