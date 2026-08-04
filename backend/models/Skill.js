const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, default: 'General' },
  description: { type: String },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  icon:        { type: String },
  color:       { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
