import React, { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import productsData from "../../data/products.json";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showNotification } = useNotification();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update product
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              ...formData,
              price: Number(formData.price),
              stock: Number(formData.stock),
            }
          : product
      );
      setProducts(updatedProducts);
      showNotification("Produk berhasil diperbarui", "success");
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      setProducts([newProduct, ...products]);
      showNotification("Produk berhasil ditambahkan", "success");
    }

    // Reset form
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
    });
  };

  const handleDelete = (productId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      showNotification("Produk berhasil dihapus", "success");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });
    setEditingProduct(null);
    setIsEditing(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Kelola Produk</h1>
        <p>Kelola semua produk yang tersedia di TechHub</p>
      </div>

      {/* Form Add/Edit Product */}
      <div className="admin-form" style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1.5rem", color: "#1f2937" }}>
          {isEditing ? "Edit Produk" : "Tambah Produk Baru"}
        </h2>

        <form onSubmit={handleAddProduct}>
          <div className="admin-form-group">
            <label className="admin-form-label">Nama Produk</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="admin-form-input"
              placeholder="Masukkan nama produk"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="admin-form-input"
              placeholder="Masukkan deskripsi produk"
              rows="3"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Harga</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="admin-form-input"
              placeholder="Masukkan harga"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Kategori</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="admin-form-input"
              required
            >
              <option value="">Pilih kategori</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Audio">Audio</option>
              <option value="Tablet">Tablet</option>
              <option value="Aksesoris">Aksesoris</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="admin-form-input"
              placeholder="Masukkan jumlah stok"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">URL Gambar</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="admin-form-input"
              placeholder="Masukkan URL gambar produk"
              required
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <button type="submit" className="admin-btn-primary">
              {isEditing ? "Perbarui Produk" : "Tambah Produk"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="admin-btn-secondary"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div>
        <h2 style={{ marginBottom: "1rem", color: "#1f2937" }}>
          Daftar Produk ({products.length})
        </h2>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "600", color: "#1f2937" }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                          {product.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`admin-status-badge ${
                        product.stock > 20
                          ? "admin-status-active"
                          : product.stock > 10
                          ? "admin-status-pending"
                          : "admin-status-inactive"
                      }`}
                    >
                      {product.stock > 20
                        ? "Aman"
                        : product.stock > 10
                        ? "Sedang"
                        : "Rendah"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      <button
                        onClick={() => handleEdit(product)}
                        className="admin-btn-secondary"
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="admin-btn-danger"
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
