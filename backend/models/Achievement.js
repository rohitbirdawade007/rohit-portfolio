const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  organization:    { type: String },
  date:            { type: String },
  category:        { type: String, enum: ['achievements', 'cocurricular', 'extracurricular'], required: true },
  type:            { type: String }, // award | competition | paper | leadership | certification | workshop
  description:     { type: String },
  fullDescription: { type: String },
  images:          [{ type: String }],
  slug:            { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
