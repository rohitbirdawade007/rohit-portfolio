const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const { logger } = require('../utils/errorHandler');

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
router.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    logger.warn(`Failed login attempt for username: ${username} from IP: ${req.ip}`);
    return res.status(401).json({ success: false, msg: 'Invalid Credentials' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    logger.warn(`Failed password attempt for user: ${username} from IP: ${req.ip}`);
    return res.status(401).json({ success: false, msg: 'Invalid Credentials' });
  }

  // Update last login
  admin.lastLogin = Date.now();
  await admin.save();

  const payload = {
    admin: { id: admin.id, username: admin.username }
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '12h' },
    (err, token) => {
      if (err) throw err;
      logger.info(`Successful login: ${username} [${req.ip}]`);
      res.json({ success: true, token });
    }
  );
}));

// @route   POST api/auth/register
router.post('/register', asyncHandler(async (req, res) => {
  const { username, password, registrationToken } = req.body;
  
  if (registrationToken !== process.env.ADMIN_REGISTRATION_TOKEN) {
    logger.error(`CRITICAL: Unauthorized registration attempt from IP: ${req.ip}`);
    return res.status(403).json({ success: false, msg: 'Unauthorized' });
  }

  let admin = await Admin.findOne({ username });
  if (admin) {
    return res.status(400).json({ success: false, msg: 'Admin already exists' });
  }
  
  admin = new Admin({ username, password });
  const salt = await bcrypt.genSalt(12);
  admin.password = await bcrypt.hash(password, salt);
  
  await admin.save();
  logger.info(`New admin registered: ${username}`);
  res.status(201).json({ success: true, msg: 'Admin registered successfully' });
}));

// @route   GET api/auth/me
router.get('/me', auth, asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password');
  res.json({ success: true, user: admin });
}));

module.exports = router;
