import React, { Component } from 'react';
import Number from './Line/Number';
import Text from './Line/Text';

class Line extends Component {
  keyDown(lineNumber, event) {
    this.props.onKeyDown(event, lineNumber);
  }

  keyUp(event) {
    this.props.onKeyUp(event);
  }

  mouseDown(lineNumber, event) {
    this.props.onMouseDown(event, lineNumber);
  }

  blur() {
    this.props.onBlur();
  }

  focus() {
    this.props.onFocus();
  }

  select(event) {
    console.log(event);
  }

  render() {
    return (
      <div className="Line" tabIndex="-1"
        onKeyDown={this.keyDown.bind(this, this.props.number)}
        onKeyUp={this.keyUp.bind(this)}
        onMouseDown={this.mouseDown.bind(this, this.props.number)}
        onFocus={this.focus.bind(this)}
        onBlur={this.blur.bind(this)}
        onCompositionStart={this.select.bind(this)}
        onCompositionUpdate={this.select.bind(this)}
        onCompositionEnd={this.select.bind(this)}
      >
        <Number lastLineNumber={this.props.lastLineNumber} number={this.props.number} />
        <Text text={this.props.text} />
      </div>
    );
  }
}

export default Line;
