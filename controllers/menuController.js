const Menu = require('../models/menu');

exports.createMenu = async (req, res) => {
  const { id, nama, deskripsi } = req.body;

  if (!id || !nama) {
    return res.status(400).json({ message: "ID dan Nama Menu wajib diisi" });
  }

  try {
    const result = await Menu.create({ id, nama, deskripsi });
    res.status(201).json({ message: "Berhasil tambah menu", data: result });
  } catch (err) {
    console.error('Error saat insert menu:', err);
    res.status(500).json({ message: "Gagal tambah menu" });
  }
};
