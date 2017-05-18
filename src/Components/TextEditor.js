import React, { Component } from 'react';
import Page from './TextEditor/Page';

class TextEditor extends Component {
  constructor() {
    super();
    this.state = {
      openFiles: [],
      pages: [],
    }
  }

  componentWillMount() {

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
