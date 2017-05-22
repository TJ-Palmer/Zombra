import React, { Component } from 'react';
import Measure from 'react-measure';
import Cursor from './Line/Cursor';
import Text from './Line/Text';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      number: this.props.number,
      lineDimensions: {
        width: -1,
        height: -1,
      },
      textDimensions: {
        width: -1,
        height: -1,
      },
      cursor: {
        visible: false,
        posX: 0,
        posY: this.props.number,
        moving: false,
      },
    }
  }

  moveCursorPosX(pos) {
    const cursor = this.state.cursor;
    const numberOfCharacters = this.props.text.length;
    cursor.moving = true;
    cursor.posX += pos;
    if (cursor.posX < 0) { cursor.posX = 0; }
    if (cursor.posX > numberOfCharacters) { cursor.posX = numberOfCharacters; }
    this.setState({cursor: cursor});
  }

  keyDown(event) {
    let text = this.state.text;

    if (event.key.length === 1) {
      text += event.key;
      this.setState({text: text});
    } else if (event.keyCode === 9 || event.key === 'Tab') {
        text += '  ';
        this.setState({text: text});
      event.preventDefault();
    } else if (event.keyCode === 37 || event.key === 'ArrowLeft') {
      this.moveCursorPosX(-1);
    } else if (event.keyCode === 39 || event.key === 'ArrowRight') {
      this.moveCursorPosX(1);
    } else if (event.keyCode === 13 || event.key === 'Enter') {
      this.props.onCreateNewLine(this.state.number);
    } else {
      //this.props.onKeyDown(event, this.state.number);
    }
  }

  keyUp(event) {
    const cursor = this.state.cursor;
    cursor.moving = false;
    this.setState({cursor: cursor});
  }

  mouseDown(event) {
    const cursor = this.state.cursor;
    cursor.visible = true;
    this.setState({cursor: cursor});
  }

  blur() {
    const cursor = this.state.cursor;
    cursor.visible = false;
    this.setState({cursor: cursor});
  }

  render() {
    return (
        <Measure onMeasure={(lineDimensions) => {this.setState({lineDimensions})}} >
          <div className="Line" tabIndex="-1"
            onKeyDown={this.keyDown.bind(this)}
            onKeyUp={this.keyUp.bind(this)}
            onMouseDown={this.mouseDown.bind(this)}
            onBlur={this.blur.bind(this)}
          >
            <Cursor
              visible={this.state.cursor.visible}
              posX={this.state.cursor.posX}
              posY={this.state.cursor.posY}
              width={this.state.textDimensions.width}
              height={this.state.lineDimensions.height}
              numberOfCharacters={this.state.text.length}
              numbersColumnWidth={this.props.pageDimensions.width - this.props.linesDimensions.width}
              moving={this.state.cursor.moving}
            />
            <Measure onMeasure={(textDimensions) => {this.setState({textDimensions})}}>
              <Text text={this.state.text} />
            </Measure>
          </div>
        </Measure>
    );
  }
}

export default Line;
