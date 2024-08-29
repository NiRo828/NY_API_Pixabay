document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '39574753-1d7916569f8a04f1cc685f33f';
    const API_URL = 'https://pixabay.com/api/';
    let currentPage = 1;
    let currentSearchTerm = '';

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const imageResults = document.getElementById('image-results');
    const loadMoreButton = document.getElementById('load-more');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');

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

    function fetchImages() {
        fetch(`${API_URL}?key=${API_KEY}&q=${currentSearchTerm}&image_type=photo&page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                if (currentPage === 1) {
                    imageResults.innerHTML = '';
                }
                data.hits.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image.previewURL;
                    img.alt = image.tags;
                    img.classList.add('image-result');
                    img.addEventListener('click', () => {
                        modalImage.src = image.largeImageURL;
                        modal.classList.remove('hidden');
                    });
                    imageResults.appendChild(img);
                });
            });
    }

    function displayImages(images) {
        imageResults.innerHTML = '';
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.previewURL;
            img.alt = image.tags;
            img.classList.add('image-result');
            img.addEventListener('click', () => {
                modalImage.src = image.largeImageURL;
                modal.classList.remove('hidden');
            });
            imageResults.appendChild(img);
        });
    }
});