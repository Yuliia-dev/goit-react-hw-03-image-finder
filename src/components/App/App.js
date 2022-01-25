import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { AppContainer } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import NewsApiService from '../../services/images-api';

const newsApi = new NewsApiService();

export default class App extends Component {
  state = {
    imgName: '',
    images: null,
    loading: false,
    error: null,
    showModal: false,
    imgModal: null,
    scroll: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imgName;
    const nextName = this.state.imgName;
    if (nextName !== prevName) {
      this.setState({ loading: true, images: null });

      newsApi.query = nextName;
      newsApi.resetPage();
      newsApi
        .fetchImages()
        .then(({ hits }) => {
          this.setState({ images: hits });

          if (hits.length === 0) {
            this.setState({ images: null });
            Swal.fire(
              `Sorry,there are no pictures on request ${this.state.imgName}. Please try again`,
            );
            return;
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  fetchMoreImg = () => {
    const { images, imgName } = this.state;

    this.setState({
      loading: true,
      scroll: true,
    });
    return newsApi
      .fetchImages()
      .then(({ hits }) => {
        this.setState({ images: [...images, ...hits] });
        if (hits.length === 0) {
          Swal.fire(
            `Sorry, there are no pictures on request ${imgName}. Please try again`,
          );
          return;
        }
        this.scrollImg();
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  scrollImg = () => {
    if (this.state.scroll) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      imgModal: largeImageURL,
    }));
  };

  handleFormSubmit = imgName => {
    this.setState({
      imgName: imgName.toLowerCase(),
      showModal: false,
      imgModal: null,
    });
  };

  render() {
    const { images, showModal, imgModal, loading } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {images && (
          <ImageGallery
            openModal={this.toggleModal}
            images={images}
          ></ImageGallery>
        )}
        {images && <Button onClick={this.fetchMoreImg} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imgModal} alt="" />
          </Modal>
        )}
      </AppContainer>
    );
  }
}
