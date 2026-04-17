const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Elite AI Engineer' },
  title: { type: String, default: 'AI & IoT Systems Architect' },
  bio: { type: String, default: 'Building scalable intelligent systems.' },
  about: { type: String, default: 'Detailed description about my journey.' },
  email: { type: String, default: 'contact@example.com' },
  phone: { type: String, default: '+1 234 567 8900' },
  location: { type: String, default: 'San Francisco, CA' },
  profileImage: { type: String, default: '' },
  logo: { type: String, default: '' },
  resumeLink: { type: String, default: '' },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  visibility: {
    showEmail: { type: Boolean, default: true },
    showPhone: { type: Boolean, default: true },
    showLocation: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
