const Pelatihan = require('../models/pelatihan');

exports.createPelatihan = async (req, res) => {
  const { id, pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung } = req.body;

  if (!id || !jenis_pelatihan_id || !lembaga_pelatihan_id ||!periode_triwulan) {
    return res.status(400).json({ message: "Wajib diisi semua data" });
  }

  try {
    const result = await Pelatihan.create({ id, pegawai_id, nama, jenis_pelatihan_id, lembaga_pelatihan_id, periode_triwulan, no_sertifikat, jumlah_jpl, tanggal_sertifikat, link_data_dukung });
    res.status(201).json({ message: "Berhasil tambah Pelatihan", data: result });
  } catch (err) {
    console.error('Error saat insert Pelatihan:', err);
    res.status(500).json({ message: "Gagal tambah Pelatihan" });
  }
};
