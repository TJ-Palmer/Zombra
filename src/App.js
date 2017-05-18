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
    this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile1.json');
    this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile2.json');
    this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile3.json');
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

  render() {
    return (
      <div className="App">
        <h3>Hello World!</h3>
        <TextEditor files={this.state.files} />
      </div>
    );
  }
}

export default App;
