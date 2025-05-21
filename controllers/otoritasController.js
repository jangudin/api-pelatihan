const Otoritas = require('../models/otoritas');

exports.createOtoritas = async (req, res) => {
  const { id, nama } = req.body;

  if (!id || !nama) {
    return res.status(400).json({ message: "ID dan Nama Otoritas wajib diisi" });
  }

  try {
    const result = await Otoritas.create({ id, nama });
    res.status(201).json({ message: "Berhasil tambah otoritas", data: result });
  } catch (err) {
    console.error('Error saat insert otoritas:', err);
    res.status(500).json({ message: "Gagal tambah otoritas" });
  }
};
