const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: String, required: true }, // e.g., "Aug 2018"
  endDate: { type: String, required: true },   // e.g., "May 2022" or "Present"
  description: { type: String, required: true },
  coursework: [{ type: String }],
  grade: { type: String }, // e.g., "3.8/4.0 GPA"
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
