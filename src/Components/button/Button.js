import React, { Component } from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = ({ fetchImajes }) => {
  return (
    <button className="Button" type="button" onClick={fetchImajes}>
      Load more
    </button>
  );
};

Button.prototype = {
  fetchImajes: PropTypes.func.isRequired,
};

export default Button;
