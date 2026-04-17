const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const auth = require('../middleware/auth');

// @route   GET /api/certifications
// @desc    Get all certifications
// @access  Public
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.json(certifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/certifications/:id
// @desc    Get single certification by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ msg: 'Certification not found' });
    res.json(certification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/certifications
// @desc    Create a certification
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    res.json(certification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/certifications/:id
// @desc    Update a certification
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certification) return res.status(404).json({ msg: 'Certification not found' });
    res.json(certification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/certifications/:id
// @desc    Delete a certification
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Certification removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
