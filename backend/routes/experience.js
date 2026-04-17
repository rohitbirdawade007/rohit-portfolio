const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const auth = require('../middleware/auth');

// @route   GET /api/experience
// @desc    Get all experience entries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/experience/:id
// @desc    Get single experience by id or slug
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let experience;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      experience = await Experience.findById(req.params.id);
    }
    if (!experience) {
      experience = await Experience.findOne({ slug: req.params.id });
    }
    if (!experience) return res.status(404).json({ msg: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/experience
// @desc    Create experience entry
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/experience/:id
// @desc    Update experience entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) return res.status(404).json({ msg: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/experience/:id
// @desc    Delete experience entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Experience removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
