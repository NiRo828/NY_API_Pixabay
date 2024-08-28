const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('image-results');


searchBtn.addEventListener('click', () => {
    const searchQuery = searchBox.value;
    const apiKey = 'uBcfWovqMnlE2L0VJeOS3EpLzMOPXtAjqmeW78APnnu7684ANZaJm133'
    const headers = new Headers({
        Authorization: `Bearer ${apiKey}`
    });

    fetch(`https://api.pexels.com/v1/search?query=${searchQuery}`, {
        headers: {
            Authorization: 'Bearer YOUR API KEY'
        }
    })
    .then(response => response.json())
    .then(data => {
        searchResults.innerHTML = '';
        data.photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.src.medium;
            searchResults.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});