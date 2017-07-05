import React, { Component } from 'react';
// import axios from 'axios';
import FileStore from '../stores/FileStore';
import * as FileActions from '../actions/FileActions';
import Page from './TextEditor/Page';

class TextEditor extends Component {
  constructor() {
    super();
    this.state = {
      pageLoaded: false,
      file: FileStore.getFile('0'),
    }
  }

  // getFile() {
  //   axios.get('/basicFile01.json', {
  //       method: 'get',
  //       baseURL: 'https://tj-palmer.github.io/projects/testfiles',
  //       responseType: 'json',
  //     })
  //     .then((response) => {
  //       this.setState({file: response.data});
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // getPage(id) {
  //   return <Page file={FileStore.getFile(id)} />
  // }

  // componentWillMount() {
  //   this.getFile();
  // }

  createNewLine() {
    FileActions.createNewLine('1234', 1)
  }

  updateLineText() {
    FileActions.updateLineText('1234', 1, 'Hello World!');
  }

  loadPage() {
    FileActions.createNewFile(this.state.file);
    this.setState({pageLoaded: true})
  }

  onMouseDown(event) {
    this.props.onMouseDown(event);
  }

  onScroll(event) {
    this.props.onScroll(event);
  }

  componentWillMount() {
    FileStore.on('change', () => {
      if (this.state.file.id !== FileStore.getActiveFile()) {
        this.setState({file: FileStore.getFile(FileStore.getActiveFile())});
      }
    });
  }

    // <button onClick={this.createNewLine.bind(this)}>Add New Line</button>
    // <button onClick={this.updateLineText.bind(this)}>Add Some Text</button>
    // <button onClick={this.loadPage.bind(this)}>Load Page</button>

  render() {
    // if (this.state.pageLoaded) {
    //   page = this.getPage(0);
    // }
    return (
      <div className="TextEditor" onMouseDown={this.onMouseDown.bind(this)}>
        <Page file={this.state.file} />
      </div>
    );
  }
}

export default TextEditor;
