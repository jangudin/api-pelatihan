const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Koneksi ke database MySQL (pool.promise)

exports.login = async (req, res) => {
  const { id, password } = req.body; // Ambil data id dan password dari body request

  try {
    // Query pakai await
    const [results] = await db.query('SELECT * FROM pegawai WHERE id = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];

    // Periksa password yang di-hash menggunakan bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token jika password cocok
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token berlaku 1 jam
    });

    res.json({
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        status: user.status,
      },
    });
    
  } catch (error) {
    console.error('❌ Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
