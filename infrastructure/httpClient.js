const axios = require('axios');

const pixabayClient = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: process.env.PIXABAY_API_KEY,
        image_type: 'photo',
    },
    });

module.exports = {
    pixabayClient,
};