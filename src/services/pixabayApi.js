const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21768935-3fedd5c602a3f7ac5e18d4c15';

class FetchImagesApi {
  constructor() {
    this.page = 1;
  }

  fetchImages(searchQuery) {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`;
    return fetch(url).then(response => {
      if (response.ok) {
        this.addPage();
        return response.json();
      }
      return response.statusText;
    });
  }

  addPage() {
    return (this.page += 1);
  }

  resetPage() {
    return (this.page = 1);
  }
}

export default FetchImagesApi;
