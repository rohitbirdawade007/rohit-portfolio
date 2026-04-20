require('dotenv').config();
require('./utils/validateEnv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errorHandler, logger } = require('./utils/errorHandler');

const app = express();
const server = http.createServer(app);

// ─── Security & Performance Middleware ───────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://rohitbirdawade007.vercel.app',
      'https://rohit-portfolio-delta-tan.vercel.app',
      'http://localhost:5173',
      'http://localhost:8081'
    ].filter(Boolean);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(compression()); // Compress all responses
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } })); 

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { msg: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { msg: 'Too many login attempts.' }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/', apiLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',           authLimiter, require('./routes/auth'));
app.use('/api/projects',       require('./routes/projects'));
app.use('/api/skills',         require('./routes/skills'));
app.use('/api/research',       require('./routes/research'));
app.use('/api/blogs',          require('./routes/blogs'));
app.use('/api/messages',       require('./routes/messages'));
app.use('/api/achievements',   require('./routes/achievements'));
app.use('/api/experience',     require('./routes/experience'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/education',      require('./routes/education'));
app.use('/api/analytics',      require('./routes/analytics'));
app.use('/api/profile',        require('./routes/profile'));
app.use('/api/ai',             require('./routes/ai'));

// ─── Health Checks ────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Portfolio API v2.5 Optimized' }));
app.get('/health', (req, res) => res.json({ status: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Database & Server Startup ────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('✅ MongoDB Connected successfully!');
    
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} (Optimized for Production)`);
    });
  } catch (err) {
    logger.error(`❌ Fatal Error: ${err.message}`);
    process.exit(1);
  }
};

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    await mongoose.connection.close();
    logger.info('HTTP server closed & MongoDB connection terminated');
    process.exit(0);
  });
});

startServer();
