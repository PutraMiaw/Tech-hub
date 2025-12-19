import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartNotification } from "./Notification";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { notifyAddToCart } = useCartNotification();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
      notifyAddToCart(product.name);
    } else {
      alert("Maaf, produk ini sedang habis stok");
    }
  };

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&auto=format";
          }}
        />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-description">
          {product.description.substring(0, 80)}...
        </p>
        
        <div className="product-price">
          Rp {product.price.toLocaleString("id-ID")}
        </div>
        
        {/* Simple Stock Info */}
        <div style={{ 
          fontSize: "0.9rem", 
          color: product.stock > 0 ? "#059669" : "#dc2626",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          {product.stock > 0 ? (
            <>
              <span>📦</span>
              <span>Stok: {product.stock} unit</span>
            </>
          ) : (
            <>
              <span>❌</span>
              <span>Stok Habis</span>
            </>
          )}
        </div>
        
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline"
            style={{ flex: 1, textDecoration: "none" }}
          >
            Detail Produk
          </Link>
          <button
            onClick={handleAddToCart}
            className="btn"
            style={{
              flex: 1,
              opacity: product.stock > 0 ? 1 : 0.5,
              cursor: product.stock > 0 ? "pointer" : "not-allowed"
            }}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "+ Keranjang" : "Stok Habis"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;