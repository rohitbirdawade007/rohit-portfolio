const fs = require('fs');
const path = require('path');
require('dotenv').config();

const requiredVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'PORT'
];

const validateEnv = () => {
  const missing = requiredVars.filter(v => !process.env[v]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
  } else {
    console.log('✅ Environment variables validated.');
  }
};

validateEnv();
