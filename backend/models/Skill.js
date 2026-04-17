const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  proficiency: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
