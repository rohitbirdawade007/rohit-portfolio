const express = require('express');
const router = express.Router();
const Research = require('../models/Research');
const auth = require('../middleware/auth');

// @route   GET /api/research
// @desc    Get all research items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const research = await Research.find().sort({ createdAt: -1 });
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/research/:id
// @desc    Get single research item by id or slug
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let research;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      research = await Research.findById(req.params.id);
    }
    if (!research) {
      research = await Research.findOne({ slug: req.params.id });
    }
    if (!research) return res.status(404).json({ msg: 'Research not found' });
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/research
// @desc    Create research item
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newResearch = new Research(req.body);
    const research = await newResearch.save();
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/research/:id
// @desc    Update research item
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!research) return res.status(404).json({ msg: 'Research not found' });
    res.json(research);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/research/:id
// @desc    Delete research item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Research removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
