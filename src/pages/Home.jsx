import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

const Home = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div>
      <Banner />

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", color: "#333" }}>Produk Unggulan</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/products" className="btn" style={{ width: "200px" }}>
            Lihat Semua Produk
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
