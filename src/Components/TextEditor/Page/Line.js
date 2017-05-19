import React, { Component } from 'react';

class Line extends Component {
  keyDown(lineNumber, event) {
    this.props.onKeyDown(event, lineNumber);
    event.preventDefault();
  }

  getSpaces(lastLineNumber, number) {
    let amount = lastLineNumber.toString().length - number.toString().length;
    let spaces = "";
    for (var i = 0; i < amount; i++) {
      spaces += " ";
    }
    return spaces;
  }

  render() {
    return (
      <div className="Line" tabIndex="0"
        onKeyDown={this.keyDown.bind(this, this.props.number)}
      >
        <span className="LineNumber">{this.getSpaces(this.props.lastLineNumber, this.props.number) + this.props.number}</span>
        <span className="LineText">{this.props.text}</span>
      </div>
    );
  }
}

export default Line;
