const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const Blog = require('../models/Blog');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// ─── Public: Track event ──────────────────────────────────────────────────────
// POST /api/analytics/track
router.post('/track', async (req, res) => {
  try {
    const { type, resourceId, resourceSlug, resourceTitle, path } = req.body;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
    const sessionId = req.headers['x-session-id'] || '';

    const event = new Analytics({
      type,
      resourceId,
      resourceSlug,
      resourceTitle,
      path,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'] || '',
      ip,
      sessionId
    });
    await event.save();
    res.json({ ok: true });
  } catch (err) {
    // Silently fail — analytics must never break the user flow
    res.json({ ok: false });
  }
});

// ─── Admin: Summary stats ─────────────────────────────────────────────────────
// GET /api/analytics/summary
router.get('/summary', auth, async (req, res) => {
  try {
    const [
      totalViews,
      contactSubmissions,
      demoClicks,
      githubClicks,
      topProjects,
      recentEvents,
      viewsLast7Days
    ] = await Promise.all([
      Analytics.countDocuments({ type: 'page_view' }),
      Analytics.countDocuments({ type: 'contact_submit' }),
      Analytics.countDocuments({ type: 'demo_click' }),
      Analytics.countDocuments({ type: 'github_click' }),

      // Most viewed projects
      Analytics.aggregate([
        { $match: { type: 'project_view', resourceId: { $exists: true } } },
        { $group: { _id: '$resourceId', title: { $first: '$resourceTitle' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),

      // Last 10 events
      Analytics.find().sort({ createdAt: -1 }).limit(10).lean(),

      // Views per day for last 7 days
      Analytics.aggregate([
        {
          $match: {
            type: 'page_view',
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({
      totalViews,
      contactSubmissions,
      demoClicks,
      githubClicks,
      topProjects,
      recentEvents,
      viewsLast7Days
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
