import React, { Component } from 'react';

class WeatherFuture extends Component {
  render() {
    return (
      <li>
        <div className="temps">
          <span>{this.props.day.dayName}</span>&nbsp;
          <span className="high-low">{this.props.day.highTemp} | {this.props.day.lowTemp}</span>
        </div>

        <div className="summary">{this.props.day.summary}</div>
      </li>
    )
  }
}

export default WeatherFuture;
