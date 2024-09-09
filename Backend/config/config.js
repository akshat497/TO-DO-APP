

require('dotenv').config(); 

const config = {
  PORT: process.env.PORT || 5000, 
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret', 
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inotebook', 
  NODE_ENV: process.env.NODE_ENV || 'development', 
};

module.exports = config;
