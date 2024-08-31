//Pixabay API handler
const { fetchImages } = require('../services/imageService');
const { validateSearchTerm } = require('../domain/validation');

async function handlePixabayRequest({ query }, res, next) {
    try {
        const { q: searchTerm = 'random', page = 1 } = query;

        // Validate the search term
        if (!validateSearchTerm(searchTerm)) {
            return res.status(400).json({ error: 'Invalid search term' });
        }

        // Fetch images from Pixabay
        const data = await fetchImages(searchTerm, parseInt(page, 10));
        
        // Send the response
        res.json(data);
    } catch (error) {
        next(error); // Forward the error to the centralized error handler
    }
}

module.exports = {
    handlePixabayRequest,
};