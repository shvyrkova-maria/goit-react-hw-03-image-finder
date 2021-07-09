const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21768935-3fedd5c602a3f7ac5e18d4c15';

function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.statusText;
  });
}

export default fetchImages;
