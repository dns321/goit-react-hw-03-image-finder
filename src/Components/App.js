import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import newsApi from './api/apiServices';
import Loader from './loader/Loader';
import Error from './error/Error';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    originalimg: '',
    error: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    newsApi
      .fetchImg(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));

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
    const { images, isLoading, error, showModal, originalimg } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

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
