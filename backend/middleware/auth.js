const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, msg: 'Authentication Required: No token provided.' });
  }

  try {
    const tokenString = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    
    // Integrity check: payload must contain admin object with ID
    if (!decoded.admin || !decoded.admin.id) {
      return res.status(403).json({ success: false, msg: 'Integrity Failure: Invalid token payload.' });
    }

    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: 'Session Expired or Invalid Secure Token.' });
  }
};
