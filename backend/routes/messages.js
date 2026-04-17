const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const { body, validationResult } = require('express-validator');

// @route   POST api/messages
// @desc    User sends a message (Public with validation)
router.post('/', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('name').notEmpty().trim().escape().withMessage('Name is required'),
  body('message').notEmpty().trim().escape().withMessage('Message is required')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;
  const newMessage = new Message({ name, email, message });
  await newMessage.save();
  
  res.status(201).json({ 
    success: true, 
    msg: 'Message sent successfully' 
  });
}));

// @route   GET api/messages
// @desc    Admin views messages (Private)
router.get('/', auth, asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}));

// @route   DELETE api/messages/:id
// @desc    Admin deletes message
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  
  if (!message) {
    return res.status(404).json({ msg: 'Message not found' });
  }

  await message.deleteOne();
  res.json({ success: true, msg: 'Message removed' });
}));

module.exports = router;
