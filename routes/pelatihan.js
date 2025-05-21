const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan db ini sudah pakai mysql2/promise
const isAuthenticated = require('../middleware/authMiddleware');

// Get semua menu
router.get('/', isAuthenticated, async (req, res) => {
  console.log('📥  Received GET /api/pelatihan/');

  try {
    const [results] = await db.query('SELECT * FROM pelatihan');
    res.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (err) {
    console.error('❌ Error fetching pelatihan:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Get menu by ID
router.get('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log(`📥  Received GET /api/pelatihan/${id}`);

  try {
    const [results] = await db.query('SELECT * FROM pelatihan WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'pelatihan tidak ditemukan' });
    }

    res.json({
      status: 'success',
      data: results[0]
    });
  } catch (err) {
    console.error('❌ Error fetching pelatihan by ID:', err);
    res.status(500).json({ message: 'Gagal mengambil data', error: err });
  }
});

// Tambah menu
router.post('/', isAuthenticated, async (req, res) => {
    const { pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung } = req.body;
  
    if (!jenis_pelatihan_id || !lembaga_pelatihan_id ||!periode_triwulan) {
      return res.status(400).json({ message: 'Semua wajib diisi' });
    }
  
    try {
      const [result] = await db.query(
        'INSERT INTO pelatihan (pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung]
      );
      res.status(201).json({ message: 'Berhasil tambah pelatihan', id: result.insertId });
    } catch (err) {
      console.error('❌ Gagal tambah pelatihan:', err);
      res.status(500).json({ message: 'Gagal tambah data', error: err });
    }
  });

// Edit menu
router.put('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { nama,jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung } = req.body;
  if (!nama || !jenis_pelatihan_id || !lembaga_pelatihan_id || !periode_triwulan || !no_sertifikat || !jumlah_jpl || !tanggal_sertifikat || !link_data_dukung) return res.status(400).json({ message: 'Nama wajib diisi' });

  try {
    const [result] = await db.query('UPDATE pelatihan SET nama = ?,jenis_pelatihan_id  = ?, lembaga_pelatihan_id  = ?, periode_triwulan  = ?, no_sertifikat  = ?, jumlah_jpl  = ?, tanggal_sertifikat  = ?, link_data_dukung = ? WHERE id = ?', [nama,jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung, id]);
    res.json({ message: 'Berhasil update pelatihan' });
  } catch (err) {
    console.error('❌ Gagal update pelatihan:', err);
    res.status(500).json({ message: 'Gagal update data', error: err });
  }
});

// Hapus menu
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM pelatihan WHERE id = ?', [id]);
    res.json({ message: 'Berhasil hapus pelatihan' });
  } catch (err) {
    console.error('❌ Gagal hapus pelatihan:', err);
    res.status(500).json({ message: 'Gagal hapus data', error: err });
  }
});

module.exports = router;
