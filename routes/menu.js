const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan db ini sudah pakai mysql2/promise
const isAuthenticated = require('../middleware/authMiddleware');

// Get semua menu
router.get('/', isAuthenticated, async (req, res) => {
  console.log('📥  Received GET /api/menu/');

  try {
    const [results] = await db.query('SELECT * FROM menu');
    res.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('❌ Error fetching menu:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Get menu by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(`📥  Received GET /api/menu/${id}`);

  try {
    const [results] = await db.query('SELECT * FROM menu WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'menu tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: results[0]
    });
  } catch (err) {
    console.error('❌ Error fetching menu by ID:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Tambah menu
router.post('/', isAuthenticated, async (req, res) => {
    const { nama, deskripsi } = req.body;
  
    if (!nama || !deskripsi) {
      return res.status(400).json({ message: 'Nama dan deskripsi wajib diisi' });
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO menu (nama, deskripsi) VALUES (?, ?)',
        [nama, deskripsi]
      );
      res.status(201).json({ message: 'Berhasil tambah menu', id: result.insertId });
    } catch (err) {
      console.error('❌ Gagal tambah menu:', err);
      res.status(500).json({ message: 'Gagal tambah data', error: err });
    }
  });

// Edit menu
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ message: 'Nama wajib diisi' });

  try {
    const [result] = await db.query('UPDATE menu SET nama = ? WHERE id = ?', [nama, id]);
    res.json({ message: 'Berhasil update menu' });
  } catch (err) {
    console.error('❌ Gagal update menu:', err);
    res.status(500).json({ message: 'Gagal update data', error: err });
  }
});

// Hapus menu
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM menu WHERE id = ?', [id]);
    res.json({ message: 'Berhasil hapus menu' });
  } catch (err) {
    console.error('❌ Gagal hapus menu:', err);
    res.status(500).json({ message: 'Gagal hapus data', error: err });
  }
});

module.exports = router;
