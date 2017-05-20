import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cursor from './Page/Cursor';
import Line from './Page/Line';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: props.file,
      cursor: {
        lineFocus: 1,
        x: 43,
        y: 0,
        numberGap: 43,
        moving: false,
      }
    };
    this.focused = false;
    this.lines = null;
  }

  handleKeyDown(event, lineNumber) {
    let file = this.state.file;

    if (file) {
      let line = file.lines[lineNumber - 1];
      let cursor = this.state.cursor;
      cursor.moving = true;
      this.setState({cursor: cursor});

      if (event.keyCode === 8  || event.key === "Backspace") {
        line = line.slice(0, line.length - 1);
        file.lines[lineNumber - 1] = line;
        this.setState({file: file});
      }
      if (event.keyCode === 13 || event.key === "Enter") {
        let lines = file.lines;
        for (var i = file.lines.length; i >= lineNumber - 1; i--) {
          lines[i] = lines[i-1];
        }
        lines[lineNumber - 1] = "";
        file.lines = lines;
        this.updateCursorY(lineNumber + 1);
        this.setState({file: file});
      }
      if (event.keyCode === 37 || event.key === "ArrowLeft") {
        this.updateCursorX(-1);
        event.preventDefault();
      }
      if (event.keyCode === 38 || event.key === "ArrowUp") {
        if (lineNumber !== 1) {
          this.updateCursorY(lineNumber - 1);
        }
        event.preventDefault();
      }
      if (event.keyCode === 39 || event.key === "ArrowRight") {
        this.updateCursorX(1);
        event.preventDefault();
      }
      if (event.keyCode === 40 || event.key === "ArrowDown") {
        if (file.lines.length !== lineNumber) {
          this.updateCursorY(lineNumber + 1);
        }
        event.preventDefault();
      }
      if (event.keyCode === 32 || event.key === " ") {
        event.preventDefault();
      }
      if (event.keyCode === 9 || event.key === "Tab") {
        line += "  ";
        file.lines[lineNumber - 1] = line;
        this.setState({file: file});
        this.updateCursorX(1);
        event.preventDefault();
      }
      if (event.key.length === 1) {
        if (!event.ctrlKey && !event.altKey) {
          line += event.key;
          file.lines[lineNumber - 1] = line;
          this.setState({file: file});
          this.updateCursorX(1);
        }
      }
    }
  }

  handleKeyUp(event) {
    let cursor = this.state.cursor;
    cursor.moving = false;
    this.setState({cursor: cursor});
  }

  handleMouseDown(event, lineNumber) {
    // Update cursor y
    if (this.state.cursor.lineFocus !== lineNumber) {
      this.updateCursorY(lineNumber, null);
    }

    // Update cursor x
    if (window.getSelection()) {
      let sel = window.getSelection();
      let cursor = this.state.cursor;
      let lineText = ReactDOM.findDOMNode(this.refs.activeLine).childNodes[1];
      let averageCharWidth = lineText.clientWidth/lineText.innerText.length;

      if (isNaN(averageCharWidth)) {
        averageCharWidth = 0;
      }

      cursor.x = averageCharWidth * sel.anchorOffset + cursor.numberGap;

      if (cursor.x > lineText.clientWidth + cursor.numberGap) {
        cursor.x = lineText.clientWidth + cursor.numberGap;
      }

      if (cursor.x < cursor.numberGap) {
        cursor.x = cursor.numberGap;
      }

      this.setState({cursor: cursor});
    }
  }

  handleFocus() {}

  handleBlur() {}

  focus() {
    this.focused = true;
  }

  blur() {
    this.focused = false;
  }

  componentDidUpdate() {
    this.focusLine();
  }

  updateCursorX(pos) {
    let lineText = ReactDOM.findDOMNode(this.refs.activeLine).childNodes[1];
    let averageCharWidth = lineText.clientWidth/lineText.innerText.length;
    let cursor = this.state.cursor;

    if (isNaN(averageCharWidth)) {
      averageCharWidth = 0;
    }

    cursor.x += averageCharWidth * pos;

    if (cursor.x > lineText.clientWidth + cursor.numberGap) {
      cursor.x = lineText.clientWidth + cursor.numberGap;
    }

    if (cursor.x < cursor.numberGap) {
      cursor.x = cursor.numberGap;
    }

    this.setState({cursor: cursor});
  }

  updateCursorY(lineNumber) {
    let line = ReactDOM.findDOMNode(this.refs.activeLine);
    let cursor = this.state.cursor;

    //cursor.y = line.clientHeight * (lineNumber - 1);
    cursor.y = (line.getBoundingClientRect().bottom - line.getBoundingClientRect().top) * (lineNumber - 1);
    cursor.lineFocus = lineNumber;

    let lineText = ReactDOM.findDOMNode(this.refs["line-" + lineNumber]).childNodes[1];

    if (cursor.x > lineText.clientWidth + cursor.numberGap) {
      cursor.x = lineText.clientWidth + cursor.numberGap;
    }

    this.setState({cursor: cursor});
  }

  focusLine() {
    if (this.refs.activeLine && this.focused) {
      ReactDOM.findDOMNode(this.refs.activeLine).focus();
    }
  }

  render() {
    if (this.props.file) {
      if (this.props.file.lines) {
        this.lines = this.props.file.lines.map((line, key) => {
          let ref = "line-" + (key + 1);
          if (key + 1 === this.state.cursor.lineFocus) {
            ref = "activeLine";
          }
          return (
            <Line
              ref={ref}
              key={key}
              number={key + 1}
              text={line}
              focus={focus}
              lastLineNumber={this.props.file.lines.length}
              onKeyDown={this.handleKeyDown.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              onMouseDown={this.handleMouseDown.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          );
        });
      }
    }
    return (
      <div className="Page">
        <div className="Code" onBlur={this.blur.bind(this)} onFocus={this.focus.bind(this)}>
          {this.lines}
        </div>
        <Cursor y={this.state.cursor.y} x={this.state.cursor.x} moving={this.state.cursor.moving} />
      </div>
    );
  }
}

export default Page;
