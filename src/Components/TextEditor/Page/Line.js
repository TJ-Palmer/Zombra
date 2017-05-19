import React, { Component } from 'react';
import Number from './Line/Number';
import Text from './Line/Text';

class Line extends Component {
  keyDown(lineNumber, event) {
    this.props.onKeyDown(event, lineNumber);
  }

  mouseDown(lineNumber, event) {
    this.props.onMouseDown(event, lineNumber);
  }

  render() {
    return (
      <div className="Line" tabIndex="-1"
        onKeyDown={this.keyDown.bind(this, this.props.number)}
        onMouseDown={this.mouseDown.bind(this, this.props.number)}
      >
        <Number lastLineNumber={this.props.lastLineNumber} number={this.props.number} />
        <Text text={this.props.text} />
      </div>
    );
  }
}

export default Line;
