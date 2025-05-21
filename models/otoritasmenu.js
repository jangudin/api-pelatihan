const db = require('../config/db'); // Harus pakai mysql2/promise

const otoritasMenu = {
  // Tambah data
  create: async ({ id, nama, deskripsi }) => {
    const sql = 'INSERT INTO otoritas_menu (id,otoritas_id, menu_id) VALUES (?, ?)';
    return await db.query(sql, [id, otoritas_id, menu_id]);
  },

  // Ambil semua data
  findAll: async () => {
    const sql = 'SELECT * FROM otoritas_menu';
    const [rows] = await db.query(sql);
    return rows;
  },

  // Ambil data berdasarkan ID
  findById: async (id) => {
    const sql = 'SELECT * FROM otoritas_menu WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0]; // return satu objek
  },

  // Update data berdasarkan ID
  update: async ({ id, nama }) => {
    const sql = 'UPDATE otoritas_menu SET otoritas_id = ?, menu_id = ? WHERE id = ?';
    return await db.query(sql, [otoritas_id, menu_id, id]);
  },

  // Hapus data berdasarkan ID
  delete: async (id) => {
    const sql = 'DELETE FROM otoritas_menu WHERE id = ?';
    return await db.query(sql, [id]);
  }
};

module.exports = OtoritasMenu;
