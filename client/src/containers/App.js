import React, { Component } from 'react';
import Clock from '../components/Clock';
import Weather from '../containers/Weather';

class App extends Component {
  render() {
    return (
      <div>
        <Clock />
        <Weather />
      </div>
    );
  }
}

export default App;
