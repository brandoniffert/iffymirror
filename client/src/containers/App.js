import React, { Component } from 'react';
import Clock from '../components/Clock';
import Weather from '../containers/Weather';
import UrbanWord from '../containers/UrbanWord';

class App extends Component {
  render() {
    return (
      <div>
        <Clock />
        <Weather />
        <UrbanWord />
      </div>
    );
  }
}

export default App;
