# LAPORAN UAS FRONT-END DEVELOPMENT

## APLIKASI TOKO ONLINE E-COMMERCE "TECHHUB"

### IDENTITAS MAHASISWA

- Nama: Tangguh Putra Mahardika
- NIM: 2404028
- Kelas: 2 Teknologi Infromasi
- Program Studi: Pemrograman FrontEnd
- Dosen Pengampu: Prayogo, S.Kom., M.Kom.

### 1. TUJUAN PROYEK

Membangun aplikasi toko online (e-commerce) front-end yang modern, responsif, dan user-friendly dengan implementasi fitur-fitur esensial e-commerce seperti manajemen produk, keranjang belanja, checkout, dan sistem notifikasi.

### 2. TEKNOLOGI YANG DIGUNAKAN

- React 19.2.1 - Library JavaScript terbaru untuk building UI
- Vite 7.2.7 - Build tool dan development server yang cepat
- React Router DOM 7.10.1 - Untuk routing dan navigasi SPA
- Context API - State management (Cart, Notification)
- CSS3 - Styling dengan CSS modern dan responsive design
- JSON - Data produk statis
- Git & GitHub - Version control dan hosting kode
- Vercel - Platform deployment

### 3. STRUKTUR FOLDER

src/
├── assets/ # Gambar dan aset statis
├── components/ # Komponen reusable
│ ├── Banner.jpx
│ ├── CartItem.jpx
│ ├── Footer.jpx
│ ├── Header.jpx
│ ├── Notification.jpx
│ └── ProductCard.jpx
├── context/ # Context untuk state management
│ ├── CartContext.jpx
│ └── NotificationContext.jpx
├── data/ # Data produk
│ └── products.json
├── pages/ # Halaman aplikasi
│ ├── Cart.jpx
│ ├── Checkout.jpx
│ ├── Home.jpx
│ ├── ProductDetail.jpx
│ └── Products.jpx
├── App.jpx # Komponen utama
├── main.jpx Entry point
├── index.css # Global styles
└── App.css # Component styles

### 4. FITUR YANG DIIMPLEMENTASIKAN

#### 4.1 Halaman Beranda (Home.jsx)

- Banner promosi dengan desain modern
- Navigasi header dengan logo dan menu
- Display produk terbaru
- Responsif di semua device

#### 4.2 Halaman Produk (Products.jsx)

- Grid layout produk (≥10 produk)
- Fitur pencarian produk
- Filter berdasarkan kategori
- Product card dengan informasi lengkap
- Responsive grid (mobile: 1 kolom, desktop: 4 kolom)

#### 4.3 Halaman Detail Produk (ProductDetail.jsx)

- Detail lengkap produk
- Gambar produk dengan fallback
- Informasi stok dan harga
- Fitur keunggulan produk
- Tombol "Tambah ke Keranjang" dan "Beli Sekarang"
- Fully responsive dengan layout yang berbeda di mobile/desktop

#### 4.4 Halaman Keranjang (Cart.jsx)

- Tampilan item dalam keranjang
- Quantity controls (tambah/kurang/hapus)
- Perhitungan otomatis (subtotal, ongkir, total)
- Progress bar gratis ongkir
- Ringkasan pesanan
- Fully responsive dengan tampilan mobile-friendly

#### 4.5 Halaman Checkout (Checkout.jsx)

- Form data pengiriman dengan validasi
- Ringkasan pesanan
- Pilihan metode pembayaran
- Validasi form (email, telepon, alamat)
- Modal konfirmasi sukses
- Fully responsive dengan form yang mudah diisi di mobile

#### 4.6 Fitur Tambahan

- Sistem Notifikasi - Notifikasi real-time untuk aksi user
- Cart Context - State management untuk keranjang global
- Responsive Design - Optimal di mobile, tablet, desktop
- Error Handling - Fallback untuk gambar error
- Loading States - Feedback visual untuk loading

### 6. LINK DEPLOY

Aplikasi Live `https://tech-hub-yourname.vercel.app`
Repository GitHub `https://github.com/username/tech-hub`

### 7. IMPLEMENTASI RESPONSIVE DESIGN

Aplikasi telah dioptimalkan untuk semua perangkat:

#### Mobile (≤ 768px)

- Single column layout
- Touch-friendly buttons (min 44x44px)
- Font size optimal untuk readability
- Form inputs dengan font size 16px (cegah zoom)
- Navigation yang sederhana

#### Tablet (769px - 1024px)

- Grid layout yang lebih longgar
- Dua kolom untuk detail produk
- Font size yang proporsional

#### Desktop (> 1024px)

- Multi-column layout
- Sidebar untuk keranjang/checkout
- Optimal use of white space
- Hover effects dan interaksi mouse

### 9. KESIMPULAN

Aplikasi toko online "TechHub" telah berhasil dibangun dengan memenuhi semua requirement tugas UAS Front-End Development. Aplikasi ini menampilkan:

1.  UI/UX Modern & Responsif - Optimal di semua device
2.  Fitur E-Commerce Lengkap - Produk, Cart, Checkout
3.  Routing & Navigasi - Multi-halaman dengan React Router
4.  Interaktivitas - Add to cart, quantity control, notifications
5.  Struktur Kode yang Rapi - Modular components dan clean code
6.  Validasi Form - Checkout form validation
7.  Deployment Berhasil - Aplikasi live di Vercel

Aplikasi ini siap digunakan dan menunjukkan kemampuan dalam mengimplementasikan konsep-konsep front-end development modern.
