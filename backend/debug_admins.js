const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const checkAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admins = await Admin.find({});
    console.log(`FOUND ${admins.length} ADMINS:`);
    admins.forEach(a => {
      console.log(`- Username: ${a.username}`);
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkAdmins();
