import React, { Component } from 'react';

class Number extends Component {
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
      <span className="LineNumber">{this.getSpaces(this.props.lastLineNumber, this.props.number) + this.props.number}</span>
    );
  }
}

export default Number;
