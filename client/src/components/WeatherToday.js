import React, { Component } from 'react';
const Skycons = require('react-skycons').default;

class WeatherToday extends Component {
  render() {
    return (
      <div className="weather-today">
        <div className="current-temp">
          <Skycons
            style={{width: 'auto', height: 'auto'}}
            width="55px"
            height="55px"
            color="white"
            icon={this.props.todayIcon}
            autoplay={true}
          />
          <span>{this.props.todayShortSummary}</span>&nbsp;
          <span>{this.props.todayTemp}</span>
          <span className="high-low">{this.props.todayHigh} | {this.props.todayLow}</span>
        </div>

        <div className="summary">{this.props.todaySummary}</div>
      </div>
    )
  }
}

export default WeatherToday;
