import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      this.props.onClose();
    }
  };

  render() {
    const originalimg = this.props.originalimg;

    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={originalimg} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  originalimg: PropTypes.string.isRequired,
};
export default Modal;
