import React from 'react';
import './Error.scss';
import PropTypes from 'prop-types';

const Error = ({ children }) => {
  return (
    <div className="error">
      <span className="error__text">{children}</span>
    </div>
  );
};

Error.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Error;
