// /server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const { fetchImages } = require('./services/imageService');
const handleError = require('./application/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch images
app.get('/api/images', async (req, res, next) => {
    try {
        const searchTerm = req.query.q || '';
        const page = parseInt(req.query.page, 10) || 1; 
        const data = await fetchImages(searchTerm, page);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use(handleError);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
