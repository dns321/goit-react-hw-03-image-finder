import React, { Component } from 'react';
import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';
import defaultImg from '../../img/default-image.png';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onOpenModal,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        data-url={largeImageURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={onOpenModal}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  webformatURL: defaultImg,
  largeImageURL: defaultImg,
  tag: 'img',
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
