import React, { Component } from 'react';
import Line from './Page/Line';

class Page extends Component {
  keyDown(page, event, lineNumber) {
    this.props.onKeyDown(event, page, lineNumber)
  }

  render() {
    let lines;
    if (this.props.file) {
      if (this.props.file.lines) {
        lines = this.props.file.lines.map((line, key) => {
          return (
            <Line
              key={key}
              number={key + 1}
              text={line}
              lastLineNumber={this.props.file.lines.length}
              onKeyDown={this.keyDown.bind(this, this.props.file)}
            />
          );
        });
      }
    }
    return (
      <div className="Page">
        <h3>Page: {this.props.file.name}</h3>
        {lines}
      </div>
    );
  }
}

export default Page;
