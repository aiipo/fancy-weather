import React from 'react';
import './app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCelsius: true,
      lang: 'en',
    };
  }

  render() {
    return (
      <div className="app">
      </div>
    );
  }
}

export default App;
