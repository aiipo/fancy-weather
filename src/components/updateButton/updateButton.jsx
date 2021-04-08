import React from 'react';
import PropTypes from 'prop-types';
import './updateButton.scss';

function UpdateButton({ update }) {
  return (
    <button type="button" className="update" onClick={update}>
      <span className="update__icon" />
    </button>
  );
}

UpdateButton.propTypes = {
  update: PropTypes.func.isRequired,
};

export default UpdateButton;
