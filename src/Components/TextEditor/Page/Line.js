import React, { Component } from 'react';

class Line extends Component {
  render() {
    return (
      <div className="Line">
        <span className="LineNumber">{this.props.number}</span>
        <span className="LineText">{this.props.text}</span>
      </div>
    );
  }
}

export default Line;
