const mongoose = require('mongoose');

const ResearchSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  authors:         { type: String },
  journal:         { type: String },
  year:            { type: String },
  status:          { type: String }, // e.g., "Published in IEEE", "Ongoing"
  description:     { type: String },
  fullDescription: { type: String },
  link:            { type: String },
  images:          [{ type: String }],
  slug:            { type: String, unique: true, sparse: true }
}, { timestamps: true });

module.exports = mongoose.model('Research', ResearchSchema);
