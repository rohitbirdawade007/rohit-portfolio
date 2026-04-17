const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const auth = require('../middleware/auth');

// @route   GET /api/achievements
// @desc    Get all achievements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/achievements/:id
// @desc    Get single achievement by id or slug
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let achievement;
    // Try by MongoDB ObjectId first, then by slug
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      achievement = await Achievement.findById(req.params.id);
    }
    if (!achievement) {
      achievement = await Achievement.findOne({ slug: req.params.id });
    }
    if (!achievement) return res.status(404).json({ msg: 'Achievement not found' });
    res.json(achievement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/achievements
// @desc    Create an achievement
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.json(achievement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/achievements/:id
// @desc    Update an achievement
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) return res.status(404).json({ msg: 'Achievement not found' });
    res.json(achievement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/achievements/:id
// @desc    Delete an achievement
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Achievement removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
