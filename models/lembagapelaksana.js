const db = require('../config/db'); // Harus pakai mysql2/promise

const LembagaPelaksana = {
  // Tambah data
  create: async ({ id, nama, keterangan }) => {
    const sql = 'INSERT INTO lembaga_pelaksana (id, nama, keterangan) VALUES (?, ?)';
    return await db.query(sql, [id, nama, keterangan]);
  },

  // Ambil semua data
  findAll: async () => {
    const sql = 'SELECT * FROM lembaga_pelaksana';
    const [rows] = await db.query(sql);
    return rows;
  },

  // Ambil data berdasarkan ID
  findById: async (id) => {
    const sql = 'SELECT * FROM lembaga_pelaksana WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0]; // return satu objek
  },

  // Update data berdasarkan ID
  update: async ({ id, nama, keterangan }) => {
    const sql = 'UPDATE lembaga_pelaksana SET nama, keterangan = ? WHERE id = ?';
    return await db.query(sql, [nama, keterangan, id]);
  },

  // Hapus data berdasarkan ID
  delete: async (id) => {
    const sql = 'DELETE FROM lembaga_pelaksana WHERE id = ?';
    return await db.query(sql, [id]);
  }
};

module.exports = LembagaPelaksana;
