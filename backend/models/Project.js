const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:            { type: String, required: true },
  problemStatement: { type: String },
  solution:         { type: String }, // NEW
  results:          { type: String }, // NEW
  description:      { type: String },
  fullDescription:  { type: String },
  techStack:        [{ type: String }],
  image:            { type: String }, // kept for backward compat
  images:           [{ type: String }],
  architectureImage:{ type: String }, // NEW
  featured:         { type: Boolean, default: false }, // NEW
  githubUrl:        { type: String },
  demoUrl:          { type: String },
  category:         { type: String },
  slug:             { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
