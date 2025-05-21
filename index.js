const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const app = express();

dotenv.config();

// 💡 CORS harus disetting agar credentials (session cookie) bisa ikut
app.use(cors({
  origin: 'http://localhost:3000', // Sesuaikan dengan asal React-mu
  credentials: true                // Penting: supaya session bisa berjalan
}));

app.use(express.json());

// 🔐 Konfigurasi session
app.use(session({
  secret: 'rahasia-anda',  // Ganti dengan secret yang kuat
  resave: false,
  saveUninitialized: false, // Lebih aman: jangan buat session kalau belum ada login
  cookie: {
    secure: false, // true kalau pakai HTTPS
    httpOnly: true, // mencegah akses cookie dari JavaScript
    maxAge: 1000 * 60 * 60 // 1 jam
  }
}));

// Routes
const authRoutes = require('./routes/auth');
const otoritasRoutes = require('./routes/otoritas');
const timKerjaRoutes = require('./routes/timkerja');
const menuRoutes = require('./routes/menu');
const JenisPelatihanRoutes = require('./routes/jenispelatihan');
const LembagaPelaksanaRoutes = require('./routes/lembagapelaksana');
const OtoritasMenuRoutes = require('./routes/otoritasmenu');
const pelatihanRoutes = require('./routes/pelatihan');

app.use('/api/auth', authRoutes);
app.use('/api/otoritas', otoritasRoutes);
app.use('/api/timkerja', timKerjaRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/JenisPelatihan', JenisPelatihanRoutes);
app.use('/api/LembagaPelaksana', LembagaPelaksanaRoutes);
app.use('/api/OtoritasMenu', OtoritasMenuRoutes);
app.use('/api/pelatihan', pelatihanRoutes);

// Mulai server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
