function handleError(err, req, res, next) {
    console.error('[${new Date().toISOString()}] ${err.message}');
    res.status(500).json({ error:err.message || 'Something went wrong in the Internal server!'});
}

module.exports = handleError;
