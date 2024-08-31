const fetch = require('node-fetch');
const { PIXABAY_API_KEY } = require('./env');

async function makeHttpRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error during HTTP request: ${error.message}`);
        throw error;
    }
}

async function fetchImagesFromPixabay(searchTerm, page) {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchTerm)}&page=${page}`;
    return await makeHttpRequest(url);
}

module.exports = {
    fetchImagesFromPixabay,
};
