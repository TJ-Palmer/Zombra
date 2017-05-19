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
      }
    }
  }

  handleKeyDown(event, lineNumber) {
    let file = this.state.file;

    if (file) {
      let line = file.lines[lineNumber - 1];
      if (event.keyCode === 8  || event.key === "Backspace") {
        line = line.slice(0, line.length - 1);
        file.lines[lineNumber - 1] = line;
        this.setState({file: file});
      }
      if (event.keyCode === 13 || event.key === "Enter") {
        let lines = file.lines;
        for (var i = file.lines.length; i >= lineNumber; i--) {
          lines[i+1] = lines[i];
        }
        lines[lineNumber] = "";
        file.lines = lines;
        this.setState({file: file});
      }
      if (event.keyCode === 37 || event.key === "ArrowLeft") {
        event.preventDefault();
      }
      if (event.keyCode === 38 || event.key === "ArrowUp") {
        if (lineNumber !== 1) {
          let cursor = this.state.cursor;
          cursor.lineFocus = lineNumber - 1;
          this.setState({cursor: cursor});
        }
        event.preventDefault();
      }
      if (event.keyCode === 39 || event.key === "ArrowRight") {
        event.preventDefault();
      }
      if (event.keyCode === 40 || event.key === "ArrowDown") {
        if (file.lines.length !== lineNumber) {
          let cursor = this.state.cursor;
          cursor.lineFocus = lineNumber + 1;
          this.setState({cursor: cursor});
        }
        event.preventDefault();
      }
      if (event.keyCode === 32 || event.key === " ") {
        event.preventDefault();
      }
      if (event.keyCode === 9 || event.key === "Tab") {
        event.preventDefault();
      }
      if (event.key.length === 1) {
        if (!event.ctrlKey && !event.altKey) {
          line += event.key;
          file.lines[lineNumber - 1] = line;
          this.setState({file: file});
        }
      }
    }
  }

  handleMouseDown(event, lineNumber) {
    let cursor = this.state.cursor;
    cursor.lineFocus = lineNumber;
    this.setState({cursor: cursor});
  }

  componentDidUpdate() {
    this.focusLine();
  }

  focusLine() {
    if (this.refs.activeLine) {
      ReactDOM.findDOMNode(this.refs.activeLine).focus();
    }
  }

  render() {
    let lines;
    if (this.props.file) {
      if (this.props.file.lines) {
        lines = this.props.file.lines.map((line, key) => {
          let ref = null;
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
              onMouseDown={this.handleMouseDown.bind(this)}
            />
          );
        });
      }
    }
    return (
      <div className="Page">
        <div className="Code">
          {lines}
        </div>
        <Cursor />
      </div>
    );
  }
}

export default Page;
