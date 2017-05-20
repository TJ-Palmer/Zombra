import React, { Component } from 'react';

class Cursor extends Component {
  render() {
    let playState = this.props.moving ? "cursorSolid 1s infinite" : "cursorBlink 1s infinite 0.5s";
    let cursorStyle = {
      left: this.props.x,
      top: this.props.y,
      animation: playState,
    }
    return (
      <div className="Cursor" style={cursorStyle}></div>
    );
  }
}

export default Cursor;
