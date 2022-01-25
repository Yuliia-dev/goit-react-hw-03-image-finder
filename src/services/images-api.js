const KEY_API = '24403288-52e492b65d436c39cf47d1c3c';

export default class NewsApiService {
  constructor() {
    this.searchName = '';
    this.perPage = 12;
    this.page = 1;
  }

  fetchImages() {
    const fetchImages = fetch(
      `https://pixabay.com/api/?key=${KEY_API}&q=${this.searchName}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`,
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Please try again.'));
    });

    this.incrementPage();

    return fetchImages;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchName;
  }

  set query(newQuery) {
    this.searchName = newQuery;
  }
}
