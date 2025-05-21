const db = require('../config/db'); // Harus pakai mysql2/promise

const Menu = {
  // Tambah data
  create: async ({ id, nama, deskripsi }) => {
    const sql = 'INSERT INTO menu (id, nama, deskripsi) VALUES (?, ?)';
    return await db.query(sql, [id, nama, deskripsi]);
  },

  // Ambil semua data
  findAll: async () => {
    const sql = 'SELECT * FROM menu';
    const [rows] = await db.query(sql);
    return rows;
  },

  // Ambil data berdasarkan ID
  findById: async (id) => {
    const sql = 'SELECT * FROM menu WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0]; // return satu objek
  },

  // Update data berdasarkan ID
  update: async ({ id, nama }) => {
    const sql = 'UPDATE menu SET nama = ? WHERE id = ?';
    return await db.query(sql, [nama, deskripsi, id]);
  },

  // Hapus data berdasarkan ID
  delete: async (id) => {
    const sql = 'DELETE FROM menu WHERE id = ?';
    return await db.query(sql, [id]);
  }
};

module.exports = Menu;
