const fetch = require('node-fetch');
const { PIXABAY_API_KEY } = require('../infrastructure/env');
const { getFromCache, setInCache } = require('../domain/cache');

async function fetchImages(searchTerm, page) {
    const cacheKey = `${searchTerm}-${page}`;
    const cachedData = getFromCache(cacheKey);

    if (cachedData) {
        console.log(`Serving cached data for term: ${searchTerm}, page: ${page}`);
        return cachedData;
    }

    // Ensure the search term is properly formatted and valid
    if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim().length === 0) {
        throw new Error('Invalid search term');
    }

    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchTerm)}&page=${page}`;
    console.log(`Requesting data from Pixabay API: ${url}`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Pixabay API responded with status: ${response.status} - ${response.statusText}`);
            throw new Error(`API error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Received data from Pixabay API`, data);
        setInCache(cacheKey, data); // Cache the response
        return data;
    } catch (error) {
        console.error(`Error fetching images from Pixabay API: ${error.message}`);
        throw error; // Re-throw the error to be caught by the caller
    }
}

module.exports = {
    fetchImages,
};
