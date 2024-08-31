document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/api/images';
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

    const fetchImages = async () => {
        try {
            const res = await fetch(`${API_URL}?q=${encodeURIComponent(currentSearchTerm)}&page=${currentPage}`);
            const { hits } = await res.json();
            if (currentPage === 1) {
                imageResults.innerHTML = '';
            }
            hits.forEach(createImageCard);
            loadMoreButton.style.display = hits.length > 0 ? 'block' : 'none';
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const createImageCard = ({ previewURL, tags, id, largeImageURL }) => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const img = document.createElement('img');
        img.dataset.src = previewURL;
        img.alt = tags;
        img.classList.add('lazyload');

        const imageInfo = document.createElement('div');
        imageInfo.classList.add('image-info');
        imageInfo.innerText = tags;

        const favoriteIcon = document.createElement('span');
        favoriteIcon.classList.add('favorite-icon');
        favoriteIcon.innerHTML = '&#9733;';
        if (localStorage.getItem(id)) {
            favoriteIcon.classList.add('favorited');
        }
        favoriteIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if (favoriteIcon.classList.toggle('favorited')) {
                localStorage.setItem(id, JSON.stringify({ previewURL, tags, id, largeImageURL }));
            } else {
                localStorage.removeItem(id);
            }
        });

        img.addEventListener('click', () => {
            modalImage.src = largeImageURL;
            modalInfo.innerHTML = `Tags: ${tags}`;
            modal.classList.remove('hidden');
        });

        imageCard.appendChild(img);
        imageCard.appendChild(imageInfo);
        imageCard.appendChild(favoriteIcon);
        imageResults.appendChild(imageCard);
    };

    const displayFavorites = () => {
        imageResults.innerHTML = '';
        Object.keys(localStorage).forEach(key => {
            const image = JSON.parse(localStorage.getItem(key));
            createImageCard(image);
        });
    };
});
