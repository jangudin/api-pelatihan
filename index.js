const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-strong-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Routes
const authRoutes = require('./routes/auth');
const otoritasRoutes = require('./routes/otoritas');
const timKerjaRoutes = require('./routes/timkerja');
const menuRoutes = require('./routes/menu');
const jenisPelatihanRoutes = require('./routes/jenispelatihan');
const lembagaPelaksanaRoutes = require('./routes/lembagapelaksana');
const otoritasMenuRoutes = require('./routes/otoritasmenu');
const pelatihanRoutes = require('./routes/pelatihan');

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/otoritas', otoritasRoutes);
app.use('/api/timkerja', timKerjaRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/jenis-pelatihan', jenisPelatihanRoutes);
app.use('/api/lembaga-pelaksana', lembagaPelaksanaRoutes);
app.use('/api/otoritas-menu', otoritasMenuRoutes);
app.use('/api/pelatihan', pelatihanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server',
    code: 500
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
