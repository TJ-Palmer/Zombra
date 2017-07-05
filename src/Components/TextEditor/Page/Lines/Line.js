import React, { Component } from 'react';
import Measure from 'react-measure';
import * as FileActions from '../../../../actions/FileActions';
import Prism from 'prismjs';
import FileStore from '../../../../stores/FileStore';
import Cursor from './Line/Cursor';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
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
        posX: props.cursor.posX,
        posY: props.number,
        moving: false,
      },
    }
  }

  moveCursorPosX(pos) {
    const cursor = this.state.cursor;
    cursor.moving = true;
    cursor.posX = pos;
    if (cursor.posX < 0) {
      cursor.posX = 0;
      if (this.state.number > 1) {
        this.props.onMoveCursorPosXY(-1, this.state.number - 1);
      }
    } else if (cursor.posX > this.state.numberOfCharacters + 1) {
      cursor.posX = this.state.numberOfCharacters;
      if (this.state.number < this.state.numberOfCharacters) {
        this.props.onMoveCursorPosXY(-1, this.state.number + 1);
      }
    } else {
      this.setState({cursor: cursor});
    }
    // console.log(this.state.cursor.posX);
  }

  addText(value) {
    let file = FileStore.getFile(FileStore.getActiveFile());
    let cursor = this.state.cursor;
    let text   = file.lines[this.state.number-1];
    let front  = text.substring(0, cursor.posX);
    let back   = text.substring(cursor.posX, text.length);

    text = front + value + back;
    FileActions.updateLineText(this.state.number, text);
    this.setState({text: text, numberOfCharacters: text.length})
    this.moveCursorPosX(this.state.cursor.posX + value.length);
  }

  keyDown(event) {
    let file = FileStore.getFile(FileStore.getActiveFile());
    let text = file.lines[this.state.number-1];
    let cursor = this.state.cursor;
    if (event.key.length === 1 && !event.altKey && !event.ctrlKey) {
      this.addText(event.key);
      event.preventDefault();
    }
    else if (event.keyCode === 9  || event.key === 'Tab') {
      this.addText('  ');
      event.preventDefault();
    }
    else if (event.keyCode === 8  || event.key === 'Backspace') {
      let front = text.substring(0, cursor.posX - 1);
      let back = text.substring(cursor.posX, text.length);

      text = front + back;
      this.moveCursorPosX(this.state.cursor.posX - 1);
      FileActions.updateLineText(this.state.number, text);
      this.setState({text: text, numberOfCharacters: this.state.numberOfCharacters-1})
      event.preventDefault();
    }
    else if (event.keyCode === 35 || event.key === 'End') {
      this.moveCursorPosX(this.state.text.length)
    }
    else if (event.keyCode === 36 || event.key === 'Home') {
      this.moveCursorPosX(0)
    }
    else if (event.keyCode === 37 || event.key === 'ArrowLeft') {
      this.moveCursorPosX(this.state.cursor.posX - 1);
    }
    else if (event.keyCode === 38 || event.key === 'ArrowUp') {
      this.blur();
      this.props.onMoveCursorPosXY(this.state.cursor.posX, this.props.number - 1);
      event.preventDefault();
    }
    else if (event.keyCode === 39 || event.key === 'ArrowRight') {
      this.moveCursorPosX(this.state.cursor.posX + 1);
    }
    else if (event.keyCode === 40 || event.key === 'ArrowDown') {
      this.blur();
      this.props.onMoveCursorPosXY(this.state.cursor.posX, this.props.number + 1);
      event.preventDefault();
    }
    else if (event.keyCode === 13 || event.key === 'Enter') {
      FileActions.createNewLine(this.state.number);
      this.props.onMoveCursorPosXY(this.state.cursor.posX, this.props.number + 1);
    }
    else if (event.ctrlKey && (event.keyCode === 86 || event.key === 'v')) {
      this.addText(document.getSelection().toString());
    }
    else {
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

  focus() {
    // console.log("Focus");
    const cursor = this.state.cursor;
    cursor.visible = true;
    this.props.onMoveCursorPosXY(this.state.cursor.posX, this.props.number);
    this.setState({cursor: cursor});
  }

  blur() {
    // console.log("Blur");
    const cursor = this.state.cursor;
    cursor.visible = false;
    this.setState({cursor: cursor});
  }

  render() {
    let text = this.props.file.lines[this.props.number-1];
    let html;
    try {
      html = {__html: Prism.highlight(text, Prism.languages[this.props.file.type])};
    } catch (err) {
      html = {__html: text};
    }

    return (
        <Measure onMeasure={(lineDimensions) => {this.setState({lineDimensions})}} >
          <div className="Line" tabIndex="-1"
            onKeyDown={this.keyDown.bind(this)}
            onKeyUp={this.keyUp.bind(this)}
            onMouseDown={this.mouseDown.bind(this)}
            onBlur={this.blur.bind(this)}
            onFocus={this.focus.bind(this)}
          >
            <Measure onMeasure={(textDimensions) => {this.setState({textDimensions})}}>
              <span className="LineText" dangerouslySetInnerHTML={html}></span>
            </Measure>
            <Cursor
              moving={this.state.cursor.moving}
              visible={this.state.cursor.visible}
              posX={this.state.cursor.posX}
              posY={this.state.cursor.posY}
              width="9"
              height="22"
              numberOfCharacters={text.length}
              numbersColumnWidth="33.61"
            />
          </div>
        </Measure>
    );
  }
}

export default Line;
