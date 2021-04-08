import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './notification.scss';

function Notification({ message, seconds }) {
  const notification = useRef(null);

  useEffect(() => {
    if (seconds) {
      setTimeout(() => notification && notification.current.remove(), seconds * 1000);
    }
  }, [seconds]);

  function handleClick() {
    if (notification) {
      notification.current.remove();
    }
  }

  return (
    <div className="notification" ref={notification}>
      <div className="notification__close" onClick={handleClick} />
      <div className="notification__text">
        {message}
      </div>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  seconds: PropTypes.number,
};

Notification.defaultProps = {
  seconds: null,
};

export default Notification;
