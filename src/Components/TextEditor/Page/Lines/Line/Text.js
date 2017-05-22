import React, { Component } from 'react';

class Text extends Component {
  render() {
    return (
      <span className="LineText">{this.props.text}</span>
    );
  }
}

export default Text;
