// Validation for seach Term
function validateSearchTerm(searchTerm) {
    return typeof searchTerm === 'string' && searchTerm.trim().length > 0;
}

module.exports = {
    validateSearchTerm,
};