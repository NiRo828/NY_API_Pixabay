//Pixabay API handler
const { fetchImages } = require('../services/imageService');

async function handlePixabayRequest(req, res, next) {
    try{
        const searchTerm = req.query.q || 'random';
        const page = parseInt(req.query.page, 10) || 1;
        const data = await fetchImages(searchTerm, page);
        res.json(data);
    } catch(error){
        next(error);
    }
}

module.exports = {
    handlePixabayRequest,
 };