import React, { Component } from 'react';
import moment from 'moment';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null,
      time: null,
      date: null
    };
  }

  componentDidMount() {
    const intervalId = setInterval(this.setDateTime.bind(this), 500);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setDateTime() {
    this.setState({
      time: moment().format('HH:mm'),
      date: moment().format('ddd MMM D, YYYY')
    });
  }

  render() {
    return (
      <div className="clock">
        <time className="time">{this.state.time}</time>
        <time className="date">{this.state.date}</time>
      </div>
    )
  }
}

export default Clock;
