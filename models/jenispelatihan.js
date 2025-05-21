const db = require('../config/db'); // Harus pakai mysql2/promise

const JenisPelatihan = {
  // Tambah data
  create: async ({ id, nama_jenis, deskripsi }) => {
    const sql = 'INSERT INTO jenis_pelatihan (id, nama_jenis, deskripsi) VALUES (?, ?)';
    return await db.query(sql, [id, nama_jenis, deskripsi]);
  },

  // Ambil semua data
  findAll: async () => {
    const sql = 'SELECT * FROM jenis_pelatihan';
    const [rows] = await db.query(sql);
    return rows;
  },

  // Ambil data berdasarkan ID
  findById: async (id) => {
    const sql = 'SELECT * FROM jenis_pelatihan WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0]; // return satu objek
  },

  // Update data berdasarkan ID
  update: async ({ id, nama_jenis }) => {
    const sql = 'UPDATE jenis_pelatihan SET nama_jenis = ? WHERE id = ?';
    return await db.query(sql, [nama_jenis, deskripsi, id]);
  },

  // Hapus data berdasarkan ID
  delete: async (id) => {
    const sql = 'DELETE FROM jenis_pelatihan WHERE id = ?';
    return await db.query(sql, [id]);
  }
};

module.exports = JenisPelatihan;
