const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('image-results');
const message = document.getElementById('message');

searchBtn.addEventListener('click', async () => {
  const apiKey = '39574753-1d7916569f8a04f1cc685f33f'
  const query = searchBox.value;
  if (!query) {
    message.innerText = 'Please enter a search term';
    return;
  }
  message.innerText = 'Searching...';
  searchResults.innerHTML = '';
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&?query=${query}`);
    const data = await response.json();
    message.innerText = '';
    data.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.url;
      searchResults.appendChild(img);
    });
  } catch (error) {
    message.innerText = 'An error occurred. Please try again later.';
  }
});