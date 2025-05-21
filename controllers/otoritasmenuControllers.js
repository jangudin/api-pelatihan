const Menu = require('../models/otoritasmenu');

exports.createOtoritasMenu = async (req, res) => {
  const { id, otoritas_id, menu_id } = req.body;

  if (!id || !nama) {
    return res.status(400).json({ message: "ID Otoritas dan ID Menu wajib diisi" });
  }

  try {
    const result = await Menu.create({ id, nama, deskripsi });
    res.status(201).json({ message: "Berhasil tambah Otoritas Menu", data: result });
  } catch (err) {
    console.error('Error saat insert Otoritas Menu:', err);
    res.status(500).json({ message: "Gagal tambah Otoritas Menu" });
  }
};
