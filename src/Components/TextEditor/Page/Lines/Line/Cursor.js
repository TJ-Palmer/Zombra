import React, { Component } from 'react';

class Cursor extends Component {
  calculateXPosition(pos, width, numberOfCharacters) {
    numberOfCharacters = !numberOfCharacters ? 1 : numberOfCharacters;
    return pos * width/numberOfCharacters + this.props.numbersColumnWidth + "px";
  }

  calculateYPosition(pos, height) {
    return (pos-1) * height + "px";
  }

  render() {
    let playState = this.props.moving ? "cursorSolid 1s infinite" : "cursorBlink 1s infinite 0.5s";
    let visible = this.props.visible ? 'rgba(255,0,0,1)' : 'rgba(0,0,0,0)';
    let calculatedXPosition = this.calculateXPosition(this.props.posX, this.props.width, this.props.numberOfCharacters);
    let calculatedYPosition = this.calculateYPosition(this.props.posY, this.props.height);
    let cursorStyle = {
      left: calculatedXPosition,
      top: calculatedYPosition,
      background: visible,
      animation: playState,
    }
    return (
      <div className="Cursor" style={cursorStyle}></div>
    );
  }
}

export default Cursor;
