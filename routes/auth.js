// /routes/auth.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Login user
router.post('/login', async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: 'ID dan Password wajib diisi' });
  }

  try {
    // Pakai async/await biar bersih
    const [results] = await db.query('SELECT * FROM pegawai WHERE id = ? AND status = 1', [id]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'User tidak ditemukan atau tidak aktif' });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Simpan data user di session
    req.session.user = {
      id: user.id,
      nama: user.nama,
      email: user.email,
      otoritas_id: user.otoritas_id
    };

    res.json({ message: 'Login berhasil', user: req.session.user });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Gagal logout', error: err.message });
    }
    res.clearCookie('connect.sid'); // Hapus cookie session
    res.json({ message: 'Logout berhasil' });
  });
});

module.exports = router;
