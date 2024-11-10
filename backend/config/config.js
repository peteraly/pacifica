// ~/Desktop/pacifica/backend/config/config.js
require('dotenv').config();

const config = {
    port: process.env.PORT || 3001,
    databaseUrl: process.env.DATABASE_URL,
    environment: process.env.NODE_ENV || 'development'
};

module.exports = config;
