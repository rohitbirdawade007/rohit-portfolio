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
  },
  // ─── LinkedIn-style extended fields ─────────────────────────────────
  languages: [{
    name:        { type: String },
    proficiency: { type: String } // Native, Professional, Conversational, Basic
  }],
  services: [{
    title:       { type: String },
    description: { type: String }
  }],
  courses: [{
    name:         { type: String },
    platform:     { type: String },
    completedAt:  { type: String },
    certificateUrl: { type: String }
  }],
  organizations: [{
    name:     { type: String },
    role:     { type: String },
    duration: { type: String }
  }],
  volunteer: [{
    role:         { type: String },
    organization: { type: String },
    duration:     { type: String },
    description:  { type: String }
  }],
  testScores: [{
    name:  { type: String },
    score: { type: String },
    date:  { type: String }
  }],
  recommendations: [{
    name:         { type: String },
    title:        { type: String },
    relationship: { type: String },
    text:         { type: String },
    avatar:       { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
