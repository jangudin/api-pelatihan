// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader); // Debug log
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token tidak ditemukan',
        code: 401
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // Debug log
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded); // Debug log
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token error:', err); // Debug log
    return res.status(401).json({
      status: 'error', 
      message: 'Token tidak valid atau kadaluarsa',
      code: 401
    });
  }
};

module.exports = verifyToken;
