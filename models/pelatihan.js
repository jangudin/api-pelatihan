const db = require('../config/db'); // Harus pakai mysql2/promise

const Pelatiahan = {
  // Tambah data
  create: async ({ id, pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung }) => {
    const sql = 'INSERT INTO pelatihan (id, pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return await db.query(sql, [id, pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung]);
  },

  // Ambil semua data
  findAll: async () => {
    const sql = 'SELECT * FROM pelatihan';
    const [rows] = await db.query(sql);
    return rows;
  },

  // Ambil data berdasarkan ID
  findById: async (id) => {
    const sql = 'SELECT * FROM pelatihan WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0]; // return satu objek
  },

  // Update data berdasarkan ID
  update: async ({ nama,jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung}) => {
    const sql = 'UPDATE pelatihan SET nama = ? jenis_pelatihan_id  = ?, lembaga_pelatihan_id  = ?, periode_triwulan  = ?, no_sertifikat  = ?, jumlah_jpl  = ?, tanggal_sertifikat  = ?, link_data_dukung = ? WHERE id = ?';
    return await db.query(sql, [nama,jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung]);
  },

  // Hapus data berdasarkan ID
  delete: async (id) => {
    const sql = 'DELETE FROM pelatihan WHERE id = ?';
    return await db.query(sql, [id]);
  }
};

module.exports = Pelatihan;
