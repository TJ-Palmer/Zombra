import React, { Component } from 'react';
import Page from './TextEditor/Page';

class TextEditor extends Component {
  keyDown(event, page, lineNumber) {
    this.props.onKeyDown(event, page, lineNumber);
  }

  render() {
    let pages;
    if (this.props.files) {
      if (this.props.files.length !== 0) {
        pages = this.props.files.map(file => {
          //console.log(file);
          return (
            <Page
              key={file.id}
              file={file}
              onKeyDown={this.keyDown.bind(this)}
            />
          );
        });
      }
    }
    return (
      <div className="TextEditor">
        <h3>TextEditor</h3>
        {pages}
      </div>
    );
  }
}

export default TextEditor;
