const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:             { type: String, required: true },
  problemStatement:  { type: String },
  solution:          { type: String },
  results:           { type: String },
  description:       { type: String },
  fullDescription:   { type: String },
  keyFeatures:       [{ type: String }],
  techStack:         [{ type: String }],
  tags:              [{ type: String }],
  image:             { type: String },
  images:            [{ type: String }],
  architectureImage: { type: String },
  featured:          { type: Boolean, default: false },
  githubUrl:         { type: String },
  demoUrl:           { type: String },
  category:          { type: String },
  difficulty:        { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
  status:            { type: String, enum: ['Completed', 'Active', 'Research', 'In Progress'], default: 'Completed' },
  aiModels:          [{ type: String }],
  deployment:        { type: String },
  architecture:      { type: String },
  achievements:      [{ type: String }],
  slug:              { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
