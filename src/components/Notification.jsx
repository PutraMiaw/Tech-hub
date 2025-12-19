import { useNotification } from "../context/NotificationContext";

export const useCartNotification = () => {
  const { showNotification } = useNotification();

  const notifyAddToCart = (productName) => {
    showNotification(
      `✅ ${productName} berhasil ditambahkan ke keranjang`,
      "success"
    );
  };

  const notifyRemoveFromCart = (productName) => {
    showNotification(`🗑️ ${productName} dihapus dari keranjang`, "info");
  };

  const notifyOutOfStock = (productName) => {
    showNotification(`❌ ${productName} sedang habis stok`, "error");
  };

  const notifyLowStock = (productName, stock) => {
    showNotification(`⚠️ ${productName} hanya tersisa ${stock} unit`, "info");
  };

  const notifyStockLimit = (productName, maxStock) => {
    showNotification(
      `⚠️ ${productName} maksimal ${maxStock} unit karena stok terbatas`,
      "info"
    );
  };

  return {
    notifyAddToCart,
    notifyRemoveFromCart,
    notifyOutOfStock,
    notifyLowStock,
    notifyStockLimit,
  };
};
