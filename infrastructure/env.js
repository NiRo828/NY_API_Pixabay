require('dotenv').config();

module.exports = {
    PIXABAY_API_KEY: process.env.PIXABAY_API_KEY,
    PORT: process.env.PORT ||3000,
}