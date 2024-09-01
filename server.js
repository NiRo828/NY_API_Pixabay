import dotenv from 'dotenv';
dotenv.config();
const express = require("express");
const path = require('path');
const { handlePixabayRequest } = require('./application/pixabayHandler');
const handleError = require('./application/errorHandler');
const { PORT } = require('./infrastructure/env');


const app = express();



// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch images from Pixabay
app.get('/api/images', handlePixabayRequest);

// Error handling middleware
app.use(handleError);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
