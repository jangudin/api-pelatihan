const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan db ini sudah pakai mysql2/promise
const isAuthenticated = require('../middleware/authMiddleware');

// Get semua JenisPelatihan
router.get('/', isAuthenticated, async (req, res) => {
  console.log('📥  Received GET /api/JenisPelatihan/');

  try {
    const [results] = await db.query('SELECT * FROM jenis_pelatihan');
    res.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('❌ Error fetching Jenis Pelatihan:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Get JenisPelatihan by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(`📥  Received GET /api/JenisPelatihan/${id}`);

  try {
    const [results] = await db.query('SELECT * FROM jenis_pelatihan WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Jenis Pelatihan tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: results[0]
    });
  } catch (err) {
    console.error('❌ Error fetching Jenis Pelatihan by ID:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Tambah JenisPelatihan
router.post('/', isAuthenticated, async (req, res) => {
    const { nama_jenis, deskripsi } = req.body;
  
    if (!nama_jenis || !deskripsi) {
      return res.status(400).json({ message: 'nama_jenis dan deskripsi wajib diisi' });
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO jenis_pelatihan (nama_jenis, deskripsi) VALUES (?, ?)',
        [nama_jenis, deskripsi]
      );
      res.status(201).json({ message: 'Berhasil tambah Jenis Pelatihan', id: result.insertId });
    } catch (err) {
      console.error('❌ Gagal tambah Jenis Pelatihan:', err);
      res.status(500).json({ message: 'Gagal tambah data', error: err });
    }
  });

// Edit JenisPelatihan
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { nama_jenis } = req.body;
  if (!nama_jenis) return res.status(400).json({ message: 'nama_jenis wajib diisi' });

  try {
    const [result] = await db.query('UPDATE jenis_pelatihan SET nama_jenis = ? WHERE id = ?', [nama_jenis, id]);
    res.json({ message: 'Berhasil update Jenis Pelatihan' });
  } catch (err) {
    console.error('❌ Gagal update Jenis Pelatihan:', err);
    res.status(500).json({ message: 'Gagal update data', error: err });
  }
});

// Hapus JenisPelatihan
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM jenis_pelatihan WHERE id = ?', [id]);
    res.json({ message: 'Berhasil hapus Jenis Pelatihan' });
  } catch (err) {
    console.error('❌ Gagal hapus Jenis Pelatihan:', err);
    res.status(500).json({ message: 'Gagal hapus data', error: err });
  }
});

module.exports = router;
