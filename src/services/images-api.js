import axios from 'axios';
const KEY_API = '24403288-52e492b65d436c39cf47d1c3c';
axios.defaults.baseURL = 'https:pixabay.com/api';

export default class NewsApiService {
  constructor() {
    this.searchName = '';
    this.perPage = 12;
    this.page = 1;
  }

  async fetchImages() {
    const fetchImages = await axios
      .get(
        `/?key=${KEY_API}&q=${this.searchName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`,
      )
      .then(response => {
        return response.data;
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
