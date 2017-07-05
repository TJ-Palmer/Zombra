import React, { Component } from 'react';
import $ from 'jquery';
import TextEditor from './components/TextEditor';
import Landing from './components/Landing';
import ProjectTree from './components/ProjectTree';
import './App.css';
import 'prismjs/themes/prism-okaidia.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      isLoggedIn: false,
      isContextMenuVisible: false,
      isLanding: true,
    };
  }

  componentWillMount() {
    //this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile01.json');
    //this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile02.json');
    // this.getFiles('https://tj-palmer.github.io/projects/testfiles/basicFile03.json');
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

  handleLogin(state) {
    this.setState({isLoggedIn: state});
  }

  handleMouseDown(event) {
    this.updateContextMenu(false);
  }

  handleBlur(event) {
    this.updateContextMenu(false);
  }

  handleScroll(event) {
    this.updateContextMenu(false);
  }

  handleCreateProject() {
    this.setState({isLanding: false});
  }

  updateContextMenu(state) {
    this.setState({isContextMenuVisible: state});
  }

  getLanding() {
    return (
      <Landing onCreateProject={this.handleCreateProject.bind(this)}/>
    );
  }

  getEditor() {
    return (
      <div>
        <ProjectTree isContextMenuVisible={this.state.isContextMenuVisible} updateContextMenu={this.updateContextMenu.bind(this)}/>
        <TextEditor files={this.state.files} onMouseDown={this.handleMouseDown.bind(this)}/>
      </div>
    );
  }

  render() {
    let page = this.state.isLanding ? this.getLanding() : this.getEditor();
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
