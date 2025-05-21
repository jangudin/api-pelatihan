const JenisPelatihan = require('../models/jenispelatihan');

exports.createJenisPelatihan = async (req, res) => {
  const { id, nama_jenis, deskripsi } = req.body;

  if (!id || !nama_jenis) {
    return res.status(400).json({ message: "ID dan nama_jenis Jenis Pelatihan wajib diisi" });
  }

  try {
    const result = await JenisPelatihan.create({ id, nama_jenis, deskripsi });
    res.status(201).json({ message: "Berhasil tambah Jenis Pelatihan", data: result });
  } catch (err) {
    console.error('Error saat insert Jenis Pelatihan:', err);
    res.status(500).json({ message: "Gagal tambah Jenis Pelatihan" });
  }
};
