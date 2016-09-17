import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeatherToday from '../components/WeatherToday';
import WeatherFuture from '../components/WeatherFuture';

class Weather extends Component {
  getFutureWeather() {
    const days = this.props.state.weather.nextDays.map(day => {
      return <WeatherFuture key={day.dayName} day={day} />
    });

    return (
      <ul className="weather-future">
        {days}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <WeatherToday {...this.props.state.weather} />
        {this.getFutureWeather()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.mirrorAppState
  };
}

export default connect(
  mapStateToProps,
  null
)(Weather);
