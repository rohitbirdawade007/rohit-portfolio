const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// ─── Public Routes ────────────────────────────────────────────────────────────

// GET /api/blogs — list published blogs (or all for admin with ?all=true)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'published' };
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .select('-content'); // exclude heavy content from list view
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/blogs/:id — get single blog by id OR slug, increment view count
router.get('/:id', async (req, res) => {
  try {
    let blog;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(req.params.id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: req.params.id });
    }
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ─── Admin Routes (Protected) ─────────────────────────────────────────────────

// POST /api/blogs — create blog
router.post('/', auth, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/blogs/:id — update blog
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/blogs/:id — delete blog
router.delete('/:id', auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
