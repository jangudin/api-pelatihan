const db = require('../config/db'); // Harus pakai mysql2/promise

const Otoritas = {
  // Tambah data
  create: async ({ id, nama }) => {
    const sql = 'INSERT INTO otoritas (id, nama) VALUES (?, ?)';
    return await db.query(sql, [id, nama]);
  },

  // Ambil semua data
  findAll: async () => {
    const sql = 'SELECT * FROM otoritas';
    const [rows] = await db.query(sql);
    return rows;
  },

  // Ambil data berdasarkan ID
  findById: async (id) => {
    const sql = 'SELECT * FROM otoritas WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0]; // return satu objek
  },

  // Update data berdasarkan ID
  update: async ({ id, nama }) => {
    const sql = 'UPDATE otoritas SET nama = ? WHERE id = ?';
    return await db.query(sql, [nama, id]);
  },

  // Hapus data berdasarkan ID
  delete: async (id) => {
    const sql = 'DELETE FROM otoritas WHERE id = ?';
    return await db.query(sql, [id]);
  }
};

module.exports = Otoritas;
