import React, { Component } from 'react';
import $ from 'jquery';
import TextEditor from './Components/TextEditor';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  componentWillMount() {
    this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile01.json');
    this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile02.json');
    this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile03.json');
  }

  getFiles(url) {
    $.ajax({
      url: url,
      dataType:'json',
      cache: false,
      success: function(data) {
        let files = this.state.files;
        files.push(data);
        this.setState({files: files}, function() {
          //console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  handleKeyDown(event, page, lineNumber) {
    if (event.key.length === 1) {
      let files = this.state.files;
      let index = files.findIndex(file => file.id === page.id);

      if (files[index]) {
        let line = files[index].lines[lineNumber - 1];
        line += event.key;
        files[index].lines[lineNumber - 1] = line;
        this.setState({files: files});
      }
    }
  }

  render() {
    return (
      <div className="App">
        <h3>Hello World!</h3>
        <TextEditor
          files={this.state.files}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </div>
    );
  }
}

export default App;
