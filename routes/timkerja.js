const express = require('express');
const router = express.Router();
const db = require('../config/db'); // mysql2/promise
const isAuthenticated = require('../middleware/authMiddleware');

// Get semua tim kerja
router.get('/', isAuthenticated, async (req, res) => {
  console.log('📥  Received GET /api/timkerja/');
  
  try {
    const [results] = await db.query('SELECT * FROM tim_kerja');
    res.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('❌ Error fetching timkerja:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Get tim kerja by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(`📥  Received GET /api/timkerja/${id}`);

  try {
    const [results] = await db.query('SELECT * FROM tim_kerja WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Tim kerja tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: results[0]
    });
  } catch (err) {
    console.error('❌ Error fetching timkerja by ID:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Tambah tim kerja
router.post('/', isAuthenticated, async (req, res) => {
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ message: 'Nama wajib diisi' });

  try {
    const [result] = await db.query('INSERT INTO tim_kerja (nama) VALUES (?)', [nama]);
    res.status(201).json({ message: 'Berhasil tambah timkerja', id: result.insertId });
  } catch (err) {
    console.error('❌ Gagal tambah timkerja:', err);
    res.status(500).json({ message: 'Gagal tambah data', error: err });
  }
});

// Edit tim kerja
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  if (!nama) return res.status(400).json({ message: 'Nama wajib diisi' });

  try {
    const [result] = await db.query('UPDATE tim_kerja SET nama = ? WHERE id = ?', [nama, id]);
    res.json({ message: 'Berhasil update timkerja' });
  } catch (err) {
    console.error('❌ Gagal update timkerja:', err);
    res.status(500).json({ message: 'Gagal update data', error: err });
  }
});

// Hapus tim kerja
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM tim_kerja WHERE id = ?', [id]);
    res.json({ message: 'Berhasil hapus timkerja' });
  } catch (err) {
    console.error('❌ Gagal hapus timkerja:', err);
    res.status(500).json({ message: 'Gagal hapus data', error: err });
  }
});

module.exports = router;
