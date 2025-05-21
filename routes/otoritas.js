const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan db ini sudah pakai mysql2/promise
const isAuthenticated = require('../middleware/authMiddleware');

// Get semua otoritas
router.get('/', isAuthenticated, async (req, res) => {
  console.log('📥  Received GET /api/otoritas/');

  try {
    const [results] = await db.query('SELECT * FROM otoritas');
    res.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('❌ Error fetching otoritas:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Get otoritas by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(`📥  Received GET /api/otoritas/${id}`);

  try {
    const [results] = await db.query('SELECT * FROM otoritas WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Otoritas tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: results[0]
    });
  } catch (err) {
    console.error('❌ Error fetching otoritas by ID:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Tambah otoritas
router.post('/', isAuthenticated, async (req, res) => {
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ message: 'Nama wajib diisi' });

  try {
    const [result] = await db.query('INSERT INTO otoritas (nama) VALUES (?)', [nama]);
    res.status(201).json({ message: 'Berhasil tambah otoritas', id: result.insertId });
  } catch (err) {
    console.error('❌ Gagal tambah otoritas:', err);
    res.status(500).json({ message: 'Gagal tambah data', error: err });
  }
});

// Edit otoritas
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ message: 'Nama wajib diisi' });

  try {
    const [result] = await db.query('UPDATE otoritas SET nama = ? WHERE id = ?', [nama, id]);
    res.json({ message: 'Berhasil update otoritas' });
  } catch (err) {
    console.error('❌ Gagal update otoritas:', err);
    res.status(500).json({ message: 'Gagal update data', error: err });
  }
});

// Hapus otoritas
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM otoritas WHERE id = ?', [id]);
    res.json({ message: 'Berhasil hapus otoritas' });
  } catch (err) {
    console.error('❌ Gagal hapus otoritas:', err);
    res.status(500).json({ message: 'Gagal hapus data', error: err });
  }
});

module.exports = router;
