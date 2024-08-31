const cache = {};

function getFromCache(key) {
    return cache[key];
}

function setInCache(key, data) {
    cache[key] = data;
}

module.exports = {
    getFromCache,
    setInCache,
};
