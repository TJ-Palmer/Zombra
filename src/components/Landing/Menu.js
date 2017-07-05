import React, { Component } from 'react';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.createProject = this.createProject.bind(this);
  }

  createProject() {
    this.props.onCreateProject();
  }

  render() {
    return (
      <div className="Menu">
        <div onMouseUp={this.createProject} className="Menu-Button">Create Project</div>
      </div>
    );
  }
}

export default Menu;
