document.addEventListener('DOMContentLoaded', () => {
    
    let currentPage = 1;
    let currentSearchTerm = '';

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const imageResults = document.getElementById('image-results');
    const loadMoreButton = document.getElementById('load-more');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalInfo = document.getElementById('modal-info');
    const modalClose = document.querySelector('.modal-close');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewFavoritesButton = document.getElementById('view-favorites');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentPage = 1;
        currentSearchTerm = searchInput.value.trim();
        fetchImages();
    });

    loadMoreButton.addEventListener('click', () => {
        currentPage++;
        fetchImages();
    });

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    filterButtons.forEach(filter => {
        filter.addEventListener('click', () => {
            currentSearchTerm = filter.dataset.name === 'all' ? '' : filter.dataset.name;
            currentPage = 1;
            fetchImages();
        });
    });

    viewFavoritesButton.addEventListener('click', () => {
        displayFavorites();
    });

    function fetchImages() {
        fetch(`${API_URL}?key=${API_KEY}&q=${currentSearchTerm}&image_type=photo&page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                if (currentPage === 1) {
                    imageResults.innerHTML = ''; 
                }
                data.hits.forEach(image => {
                    createImageCard(image);
                });

                loadMoreButton.style.display = data.hits.length > 0 ? 'block' : 'none';
            });
    }

    function createImageCard(image) {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const img = document.createElement('img');
        img.src = image.previewURL;
        img.alt = image.tags;

        const imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');
        imageInfo.innerText = image.tags;

        const favoriteIcon = document.createElement('span');
        favoriteIcon.classList.add('favorite-icon');
        favoriteIcon.innerHTML = '&#9733;';
        if (localStorage.getItem(image.id)) {
            favoriteIcon.classList.add('favorited');
        }
        favoriteIcon.addEventListener('click', () => {
            if (favoriteIcon.classList.toggle('favorited')) {
                localStorage.setItem(image.id, JSON.stringify(image));
            } else {
                localStorage.removeItem(image.id);
            }
        });

        img.addEventListener('click', () => {
            modalImage.src = image.largeImageURL;
            modalInfo.innerHTML = `Tags: ${image.tags}`;
            modal.classList.remove('hidden');
        });

        imageCard.appendChild(img);
        imageCard.appendChild(imageInfo);
        imageCard.appendChild(favoriteIcon);
        imageResults.appendChild(imageCard);
    }

    function displayFavorites() {
        imageResults.innerHTML = '';
        Object.keys(localStorage).forEach(key => {
            const image = JSON.parse(localStorage.getItem(key));
            createImageCard(image);
        });
    }
});
