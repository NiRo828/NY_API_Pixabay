const cache = {};
const TTL = 60000; // in milliseconds (e.g., 60 seconds)

function getFromCache(key) {
    const cached = cache[key];
    if (!cached) return null;

    const isExpired = (Date.now() - cached.timestamp) > TTL;
    if (isExpired) {
        delete cache[key];
        return null;
    }

    return cached.data;
}

function setInCache(key, data) {
    cache[key] = {
        data,
        timestamp: Date.now(),
    };
}

module.exports = {
    getFromCache,
    setInCache,
};