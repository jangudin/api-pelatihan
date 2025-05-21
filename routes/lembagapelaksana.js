const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan db ini sudah pakai mysql2/promise
const isAuthenticated = require('../middleware/authMiddleware');

// Get semua menu
router.get('/', isAuthenticated, async (req, res) => {
  console.log('📥  Received GET /api/lembagapelaksana/');

  try {
    const [results] = await db.query('SELECT * FROM lembaga_pelaksana');
    res.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('❌ Error fetching Lembaga Pelaksana:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Get menu by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(`📥  Received GET /api/lembagapelaksana/${id}`);

  try {
    const [results] = await db.query('SELECT * FROM lembaga_pelaksana WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Lembaga Pelaksana tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: results[0]
    });
  } catch (err) {
    console.error('❌ Error fetching Lembaga Pelaksana by ID:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Tambah menu
router.post('/', isAuthenticated, async (req, res) => {
    const { nama, keterangan } = req.body;
  
    if (!nama || !keterangan) {
      return res.status(400).json({ message: 'Nama dan keterangan wajib diisi' });
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO lembaga_pelaksana (nama, keterangan) VALUES (?, ?)',
        [nama, keterangan]
      );
      res.status(201).json({ message: 'Berhasil tambah Lembaga Pelaksana', id: result.insertId });
    } catch (err) {
      console.error('❌ Gagal tambah Lembaga Pelaksana:', err);
      res.status(500).json({ message: 'Gagal tambah data', error: err });
    }
  });

// Edit menu
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ message: 'Nama wajib diisi' });

  try {
    const [result] = await db.query('UPDATE lembaga_pelaksana SET nama, keterangan = ? WHERE id = ?', [nama, id]);
    res.json({ message: 'Berhasil update Lembaga Pelaksana' });
  } catch (err) {
    console.error('❌ Gagal update Lembaga Pelaksana:', err);
    res.status(500).json({ message: 'Gagal update data', error: err });
  }
});

// Hapus menu
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM lembaga_pelaksana WHERE id = ?', [id]);
    res.json({ message: 'Berhasil hapus Lembaga Pelaksana' });
  } catch (err) {
    console.error('❌ Gagal hapus menu:', err);
    res.status(500).json({ message: 'Gagal Lembaga Pelaksana data', error: err });
  }
});

module.exports = router;
