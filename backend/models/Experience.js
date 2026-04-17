const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company:         { type: String, required: true },
  role:            { type: String, required: true },
  duration:        { type: String },
  techStack:       [{ type: String }],
  description:     { type: String },
  fullDescription: { type: String },
  images:          [{ type: String }],
  slug:            { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
