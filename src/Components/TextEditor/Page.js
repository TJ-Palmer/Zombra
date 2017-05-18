import React, { Component } from 'react';
import Line from './Page/Line';

class Page extends Component {
  render() {
    let lines;
    if (this.props.file) {
      if (this.props.file.lines) {
        lines = this.props.file.lines.map((line, key) => {
          return (
            <Line key={key} number={key} text={line} lastLineNumber={this.props.file.lines.length} />
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
