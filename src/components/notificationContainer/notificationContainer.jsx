import React from 'react';
import PropTypes from 'prop-types';
import Notification from '../notification/notification';
import './notificationContainer.scss';

function NotificationContainer({ notifications, seconds }) {
  return (
    <div className="notifications">
      {notifications.map((notification, ind) => <Notification key={ind} message={notification} seconds={seconds} />)}
    </div>
  );
}

NotificationContainer.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  seconds: PropTypes.number,
};

NotificationContainer.defaultProps = {
  seconds: null,
};

export default NotificationContainer;
