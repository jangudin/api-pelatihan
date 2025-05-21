const db = require('../config/db'); // Harus mysql2/promise

const TimKerja = {
  // Tambah tim kerja
  create: async ({ id, nama }) => {
    const sql = 'INSERT INTO tim_kerja (id, nama) VALUES (?, ?)';
    return await db.query(sql, [id, nama]);
  },

  // Ambil semua tim kerja
  findAll: async () => {
    const sql = 'SELECT * FROM tim_kerja';
    const [rows] = await db.query(sql);
    return rows;
  },

  // Ambil tim kerja berdasarkan ID
  findById: async (id) => {
    const sql = 'SELECT * FROM tim_kerja WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  // Update tim kerja
  update: async ({ id, nama }) => {
    const sql = 'UPDATE tim_kerja SET nama = ? WHERE id = ?';
    return await db.query(sql, [nama, id]);
  },

  // Hapus tim kerja
  delete: async (id) => {
    const sql = 'DELETE FROM tim_kerja WHERE id = ?';
    return await db.query(sql, [id]);
  }
};

module.exports = TimKerja;
