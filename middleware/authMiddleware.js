// middleware/authMiddleware.js
function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized, silakan login dulu' });
  }
}

module.exports = isLoggedIn;
