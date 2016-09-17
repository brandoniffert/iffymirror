import React, { Component } from 'react';
import { connect } from 'react-redux';

class UrbanWord extends Component {
  render() {
    const { state } = this.props;

    return (
      <div className="day-word">
        <h2>Word of The Day</h2>
        <div className="word">{state.urbanWord.word}</div>
        <div className="definition">{state.urbanWord.definition}</div>
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
)(UrbanWord);
