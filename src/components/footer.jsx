const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TechHub</h3>
          <p>
            Platform belanja elektronik terpercaya dengan produk berkualitas dan
            pelayanan terbaik untuk kebutuhan teknologi Anda.
          </p>
        </div>

        <div className="footer-section">
          <h3>Kontak</h3>
          <p>Email: support@techhub.id</p>
          <p>Telepon: (021) 1234-5678</p>
          <p>Jam Operasi: Senin-Minggu, 09:00-20:00 WIB</p>
        </div>

        <div className="footer-section">
          <h3>Layanan</h3>
          <p>Garansi Resmi</p>
          <p>Pengiriman Cepat</p>
          <p>Bantuan 24/7</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TechHub. All rights reserved.</p>
        <p>UAS Front-End Development - Aplikasi E-Commerce Electronics</p>
      </div>
    </footer>
  );
};

export default Footer;
