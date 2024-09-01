//Pixabay API handler
const { fetchImages } = require('../services/imageService').default;
const { validateSearchTerm } = require('../domain/validation');

async function handlePixabayRequest(req, res, next) {
    try {
        const { q: searchTerm = 'random', page = 1 } = req.query;

        // Validate the search term
        if (!validateSearchTerm(searchTerm)) {
            console.warn(`Invalid search term: ${searchTerm}`);
            return res.status(400).json({ error: 'Invalid search term' });
        }

        console.log(`Fetching images for term: ${searchTerm} on page: ${page}`);

        // Fetch images from Pixabay
        const data = await fetchImages(searchTerm, parseInt(page, 10));

        console.log(`Successfully fetched images for term: ${searchTerm}`);
        
        // Send the response
        res.json(data);
    } catch (error) {
        console.error(`Error in handlePixabayRequest: ${error.message}`);
        next(error); // Forward the error to the centralized error handler
    }
}

module.exports = {
    handlePixabayRequest
};