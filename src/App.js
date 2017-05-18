import React, { Component } from 'react';
import TextEditor from './Components/TextEditor';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="App">
        <h3>Hello World!</h3>
        <TextEditor />
      </div>
    );
  }
}

export default App;
