const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, unique: true, sparse: true },
  excerpt:     { type: String },
  content:     { type: String }, // Markdown content
  coverImage:  { type: String },
  tags:        [{ type: String }],
  status:      { type: String, enum: ['draft', 'published'], default: 'draft' },
  readTime:    { type: Number, default: 1 }, // minutes
  views:       { type: Number, default: 0 },
  featured:    { type: Boolean, default: false },
  date:        { type: String }
}, { timestamps: true });

// Auto-calculate read time from content
BlogSchema.pre('save', function (next) {
  if (this.content) {
    const wordsPerMinute = 200;
    const wordCount = this.content.trim().split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
