import React, { Component } from 'react';
import Page from './TextEditor/Page';

class TextEditor extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      pages: [],
    }
  }

  componentWillMount() {
      //this.addFiles(this.props.files);
  }

  addFiles(files) {
    for (let file in files) {
      this.addFile(file);
    }
  }

  addFile(file) {
    let files = this.state.files;
    files.push(file);
    this.setState({files: files});
  }

  render() {
    return (
      <div className="TextEditor">
        <h3>TextEditor</h3>
        <Page />
      </div>
    );
  }
}

export default TextEditor;
