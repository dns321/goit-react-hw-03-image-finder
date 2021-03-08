import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import newsApi from '../services/apiServices';
import Loader from './loader/Loader';
import Error from './error/Error';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    images: [],
    totalHits: '',
    page: 1,
    q: '',
    isLoading: false,
    originalimg: '',
    error: false,
    showModal: false,
    showBtn: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      q: query,
      page: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { page, q } = this.state;
    const options = { page, q };

    this.setState({ isLoading: true });

    newsApi
      .fetchImg(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));

        this.lengthArr(hits.length);

        this.windowScroll();
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        const { images } = this.state;
        if (images.length < 1) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
        }
        this.setState({ isLoading: false });
      });
  };

  windowScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  lengthArr = value => {
    if (value < 12) {
      this.setState({ showBtn: false });
    }
  };

  toggleModal = async event => {
    await this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

    if (this.state.showModal) {
      const { url } = event.target.dataset;
      this.setState({ originalimg: url });
    }
  };

  render() {
    const {
      images,
      isLoading,
      error,
      showModal,
      originalimg,
      showBtn,
    } = this.state;
    const shouldRenderLoadMoreButton =
      images.length > 0 && !isLoading && showBtn;

    return (
      <>
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery images={images} onOpenModal={this.toggleModal} />

        {isLoading && <Loader />}

        {shouldRenderLoadMoreButton && (
          <Button fetchImajes={this.fetchImages} />
        )}

        {error && <Error>Image not found!</Error>}

        {showModal && (
          <Modal onClose={this.toggleModal} originalimg={originalimg} />
        )}
      </>
    );
  }
}

export default App;
