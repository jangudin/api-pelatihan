const TimKerja = require('../models/TimKerja');

exports.createTimKerja = async (req, res) => {
  const { id, nama } = req.body;

  if (!id || !nama) {
    return res.status(400).json({ message: "ID dan Nama Tim Kerja wajib diisi" });
  }

  try {
    const [result] = await TimKerja.create({ id, nama });
    res.status(201).json({ message: "Berhasil tambah Tim Kerja", data: { id, nama } });
  } catch (err) {
    console.error('❌ Error saat insert Tim Kerja:', err);
    res.status(500).json({ message: "Gagal tambah Tim Kerja", error: err });
  }
};
