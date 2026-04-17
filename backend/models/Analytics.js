const mongoose = require('mongoose');

// Track page/resource views
const AnalyticsSchema = new mongoose.Schema({
  type:       { type: String, enum: ['page_view', 'project_view', 'demo_click', 'github_click', 'contact_submit'], required: true },
  resourceId: { type: String },           // MongoDB _id of the resource
  resourceSlug: { type: String },          // Human-readable slug
  resourceTitle:{ type: String },
  path:       { type: String },            // URL path
  referrer:   { type: String },
  userAgent:  { type: String },
  ip:         { type: String },
  sessionId:  { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
