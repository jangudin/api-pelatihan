const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = async (req, res) => {
  const { id, password } = req.body;

  try {
    // Modifikasi query untuk memastikan semua field terpilih
    const [results] = await db.query(`
      SELECT 
        p.*,
        j.id as jabatan_id,
        j.nama as jabatan_nama,
        tk.id as tim_kerja_id, 
        tk.nama as tim_kerja_nama
      FROM pegawai p
      LEFT JOIN jabatan j ON p.jabatan_id = j.id 
      LEFT JOIN tim_kerja tk ON p.tim_kerja_id = tk.id
      WHERE p.id = ?
    `, [id]);

    // Tambahkan console log untuk debugging
    console.log('User data:', results[0]);

    if (results.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User tidak ditemukan',
        code: 404
      });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Password tidak valid',
        code: 401
      });
    }

    const token = jwt.sign({ 
      id: user.id,
      nama: user.nama,
      email: user.email,
      status: user.status,
      jabatan: {
        id: user.jabatan_id,
        nama: user.jabatan_nama
      },
      tim_kerja: {
        id: user.tim_kerja_id,
        nama: user.tim_kerja_nama
      }
    }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({
      status: 'success', 
      message: 'Login berhasil',
      code: 200,
      data: {
        token,
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          status: user.status,
          jabatan: {
            id: user.jabatan_id,
            nama: user.jabatan_nama
          },
          tim_kerja: {
            id: user.tim_kerja_id,
            nama: user.tim_kerja_nama
          },
          created_at: user.created_at,
          updated_at: user.updated_at
        },
        token_expires: '1 jam'
      }
    });
    
  } catch (error) {
    console.error('❌ Error during login:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      code: 500,
      error: error.message
    });
  }
};

exports.me = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        p.*,
        j.id as jabatan_id,
        j.nama as jabatan_nama,
        tk.id as tim_kerja_id, 
        tk.nama as tim_kerja_nama
      FROM pegawai p
      LEFT JOIN jabatan j ON p.jabatan_id = j.id 
      LEFT JOIN tim_kerja tk ON p.tim_kerja_id = tk.id
      WHERE p.id = ?
    `, [req.user.id]);

    if (results.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'User tidak ditemukan',
        code: 404
      });
    }

    const user = results[0];

    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          status: user.status,
          jabatan: {
            id: user.jabatan_id,
            nama: user.jabatan_nama
          },
          tim_kerja: {
            id: user.tim_kerja_id,
            nama: user.tim_kerja_nama
          },
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      code: 500
    });
  }
};
