// /config/db.js

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Buat pool koneksi
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,      // maksimal 10 koneksi bersamaan
  queueLimit: 0,            // tidak membatasi antrian koneksi
  connectTimeout: 10000     // 10 detik batas koneksi awal
});

// Fungsi untuk test koneksi saat start
function testConnection() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error connecting to the database:', err.code, err.message);
      setTimeout(testConnection, 5000); // 🔁 Coba lagi setelah 5 detik
    } else {
      console.log('✅ Successfully connected to the MySQL database.');
      connection.release(); // 🔥 Jangan lupa release koneksi
    }
  });
}

// Tes koneksi langsung
testConnection();

// Export pool sebagai promise-based
module.exports = pool.promise();
