import React, { Component } from 'react';
import Page from './TextEditor/Page';

class TextEditor extends Component {
  render() {
    let pages;
    if (this.props.files) {
      if (this.props.files.length !== 0) {
        pages = this.props.files.map(file => {
          //console.log(file);
          return (
            <Page key={file.id} file={file} />
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
