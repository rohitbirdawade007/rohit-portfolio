const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const auth = require('../middleware/auth');

// @route   GET api/education
router.get('/', async (req, res) => {
  try {
    const educationList = await Education.find().sort({ endDate: -1, order: 1 });
    res.json(educationList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/education
router.post('/', auth, async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    const edu = await newEdu.save();
    res.json(edu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/education/:id
router.put('/:id', auth, async (req, res) => {
  try {
    let edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ msg: 'Education not found' });

    edu = await Education.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(edu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/education/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ msg: 'Education not found' });

    await edu.deleteOne();
    res.json({ msg: 'Education removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Education not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
