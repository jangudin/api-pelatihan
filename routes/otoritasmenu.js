const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan db ini sudah pakai mysql2/promise
const isAuthenticated = require('../middleware/authMiddleware');

// Get semua menu
router.get('/', isAuthenticated, async (req, res) => {
  console.log('📥  Received GET /api/otoritasmenu/');

  try {
    const [results] = await db.query('SELECT * FROM otoritas_menu');
    res.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('❌ Error fetching Otoritas Menu:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Get menu by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(`📥  Received GET /api/otoritasmenu/${id}`);

  try {
    const [results] = await db.query('SELECT * FROM otoritas_menu WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Otoritas Menu tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: results[0]
    });
  } catch (err) {
    console.error('❌ Error fetching Otoritas Menu by ID:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Tambah menu
router.post('/', isAuthenticated, async (req, res) => {
    const { otoritas_id, menu_id } = req.body;
  
    if (!otoritas_id || !menu_id) {
      return res.status(400).json({ message: 'Otoritas ID dan Menu ID wajib diisi' });
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO otoritas_menu (otoritas_id, menu_id) VALUES (?, ?)',
        [otoritas_id, menu_id]
      );
      res.status(201).json({ message: 'Berhasil tambah Otoritas Menu', id: result.insertId });
    } catch (err) {
      console.error('❌ Gagal tambah Otoritas Menu:', err);
      res.status(500).json({ message: 'Gagal tambah data', error: err });
    }
  });

// Edit menu
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { otoritas_id } = req.body;
  if (!otoritas_id || !menu_id) return res.status(400).json({ message: 'Data wajib diisi' });

  try {
    const [result] = await db.query('UPDATE otoritas_menu SET otoritas_id = ?, menu_id = ? WHERE id = ?', [otoritas_id, menu_id, id]);
    res.json({ message: 'Berhasil update Otoritas Menu' });
  } catch (err) {
    console.error('❌ Gagal update Otoritas Menu:', err);
    res.status(500).json({ message: 'Gagal update data', error: err });
  }
});

// Hapus menu
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM otoritas_menu WHERE id = ?', [id]);
    res.json({ message: 'Berhasil hapus Otoritas Menu' });
  } catch (err) {
    console.error('❌ Gagal hapus Otoritas Menu:', err);
    res.status(500).json({ message: 'Gagal hapus data', error: err });
  }
});

module.exports = router;
