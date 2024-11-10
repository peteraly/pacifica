// ~/Desktop/pacifica/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const config = require('./config/config');

const app = express();
const PORT = config.port;

// Middleware
app.use(morgan('dev')); // Logging middleware
app.use(cors({
    origin: 'http://localhost:8080', // Allow requests from your frontend
}));
app.use(bodyParser.json());
app.use('/api/payments', paymentRoutes); // Ensure this line is present

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
