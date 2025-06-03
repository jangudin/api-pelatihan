// /routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/me', verifyToken, authController.me);

module.exports = router;

// /controllers/authController.js

const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM pegawai WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Email atau password salah',
        code: 401
      });
    }

    const user = results[0];

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Email atau password salah',
        code: 401
      });
    }

    // Generate a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          status: user.status,
          jabatan: user.jabatan_id,
          tim_kerja: user.tim_kerja_id
        },
        token
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      code: 500
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
