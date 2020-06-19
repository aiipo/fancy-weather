import React from 'react';
import Notification from '../notification/notification';
import Core from '../core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo } = this.state;

    if (errorInfo) {
      return (
        <Notification message={Core.errorCodes['3']} />
      );
    }

    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
