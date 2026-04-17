const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  organization:  { type: String },
  date:          { type: String },
  credentialUrl: { type: String },
  image:         { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertificationSchema);
