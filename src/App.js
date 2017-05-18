import React, { Component } from 'react';
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
    this.getFiles();
  }

  componentDidMount() {
    //this.getFiles();
  }

  load(callback) {
    let file = new XMLHttpRequest();
    file.overrideMimeType("application/json");
    file.open('GET', 'https://raw.githubusercontent.com/TJ-Palmer/Zombra/master/testfiles/basicFile.json');
    file.onreadystatechange = function() {
      if (file.readyState === 4 && file.status === 200) {
        callback(file);
      }
    };
    file.send(null);
  }

  getFiles() {
    let files = [];

    this.load(function(response) {
      console.log(response.responseText);
      console.log(JSON.parse(response.responseText));
      files.push({
        name: "test file",
        value: "asdfasdf",
      });
    });

    this.setState({files: files});
  }

  render() {
    return (
      <div className="App">
        <h3>Hello World!</h3>
        <TextEditor files={this.state.files}/>
      </div>
    );
  }
}

export default App;
