const { getFromCache, setInCache } = require('../domain/cache');
const { pixabayClient } = require('../infrastructure/httpClient');

async function fetchImages(searchTerm, page = 1) {
    const cacheKey = `pixabay-${searchTerm}-${page}`;
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    try {
        const response = await pixabayClient.get('/', {
            params: { q: searchTerm, page },
        });

        setInCache(cacheKey, response.data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}

module.exports = {
    fetchImages,
};