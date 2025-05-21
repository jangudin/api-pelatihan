const LembagaPelaksana = require('../models/lembagapelaksana');

exports.createLembagaPelaksana = async (req, res) => {
  const { id, nama, keterangan } = req.body;

  if (!id || !nama) {
    return res.status(400).json({ message: "ID dan Nama Lembaga Pelaksana wajib diisi" });
  }

  try {
    const result = await LembagaPelaksana.create({ id, nama, keterangan });
    res.status(201).json({ message: "Berhasil tambah Lembaga Pelaksana", data: result });
  } catch (err) {
    console.error('Error saat insert Lembaga Pelaksana:', err);
    res.status(500).json({ message: "Gagal tambah Lembaga Pelaksana" });
  }
};
