document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '39574753-1d7916569f8a04f1cc685f33f';
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

    searchForm.addEventListener('submit', handleSearch);
    loadMoreButton.addEventListener('click', loadMoreImages);
    modalClose.addEventListener('click', closeModal);
    document.addEventListener('click', closeModalOnOutsideClick);

    function handleSearch(event) {
        event.preventDefault();
        currentSearchTerm = searchInput.value.trim();
        if (currentSearchTerm) {
            currentPage = 1;
            fetchImages(currentSearchTerm, currentPage);
        }
    }

    async function fetchImages(searchTerm, page) {
        try {
            const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&page=${page}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch images');

            const data = await response.json();
            if (page === 1) imageResults.innerHTML = '';

            displayImages(data.hits);
            toggleLoadMoreButton(data.totalHits);
        } catch (error) {
            console.error('Error fetching images:', error);
            alert('Failed to fetch images. Please try again later.');
        }
    }

    function displayImages(images) {
        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'image-card';

            const img = document.createElement('img');
            img.src = image.webformatURL;
            img.alt = image.tags;
            img.loading = 'lazy';
            card.appendChild(img);

            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.innerHTML = `<h3>${image.user}</h3><p>Tags: ${image.tags}</p>`;
            card.appendChild(overlay);

            const favoriteIcon = document.createElement('div');
            favoriteIcon.className = 'favorite-icon';
            favoriteIcon.innerHTML = '&#9733;';
            favoriteIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                favoriteIcon.classList.toggle('favorited');
            });
            card.appendChild(favoriteIcon);

            card.addEventListener('click', () => showModal(image));
            imageResults.appendChild(card);
        });
    }

    function toggleLoadMoreButton(totalHits) {
        if (imageResults.children.length < totalHits) {
            loadMoreButton.classList.remove('hidden');
        } else {
            loadMoreButton.classList.add('hidden');
        }
    }

    // function loadMoreImages() {
    //     currentPage++;
    //     fetchImages(currentSearchTerm, currentPage);
    // }

    // function showModal(image) {
    //     modalImage.src = image.largeImageURL;
    //     modalInfo.textContent = `Tags: ${image.tags}`;
    //     modal.classList.remove('modal-hidden');
    // }

    // function closeModal() {
    //     modal.classList.add('modal-hidden');
    // }

    // function closeModalOnOutsideClick(event) {
    //     if (event.target === modal) {
    //         closeModal();
    //     }
    // }
});
