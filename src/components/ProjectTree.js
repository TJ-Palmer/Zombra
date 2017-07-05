import React, { Component } from 'react';
import FileStore from '../stores/FileStore';
import * as FileActions from '../actions/FileActions';

class ProjectTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: FileStore.getAllFiles(),
      cursor: {
        x: 0,
        y: 0,
      },
    };
  }

  handleContextMenu(event) {
    const cursor = this.state.cursor;
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    this.setState({cursor: cursor});
    this.props.updateContextMenu(true);
    event.preventDefault();
  }

  addNewFile() {
    let file = prompt('Filename');
    let dotIndex = file.indexOf('.');
    let name = file.substring(0, dotIndex);
    let type = file.substring(dotIndex + 1);
    FileActions.createNewFile(name, type);
  }

  componentWillMount() {
    FileStore.on('change', () => {
      this.setState({files: FileStore.getAllFiles()});
    });
  }

  focus(id, event) {
    FileActions.setActiveFile(id);
  }

  render() {
    let contextMenuStyle = {
      display: 'none',
    };
    if (this.props.isContextMenuVisible) {
      contextMenuStyle = {
        display: 'block',
        left: this.state.cursor.x,
        top: this.state.cursor.y,
      }
    }

    let files = [];
    for (var i = 0; i < this.state.files.length; i++) {
      files.push(<li className="File" tabIndex="-1" key={this.state.files[i].id} onFocus={this.focus.bind(this, this.state.files[i].id)}>{this.state.files[i].name + "." + this.state.files[i].type}</li>)
    }
    return (
      <div className="ProjectTree" onContextMenu={this.handleContextMenu.bind(this)}>
        <div className="ProjectTreeContextMenu" style={contextMenuStyle}>
        </div>
        <ol className="FolderRoot">
          <li className="Folder" tabIndex="-1">Project</li>
          <ol className="FolderItems">
            {files}
          </ol>
        </ol>
        <button className="ProjectTreeAdd" onClick={this.addNewFile.bind(this)}>Add File</button>
      </div>
    );
  }
}

export default ProjectTree;
