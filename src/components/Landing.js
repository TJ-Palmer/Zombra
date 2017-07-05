import React, { Component } from 'react';
import Menu from './Landing/Menu';
import Logo from './Landing/Logo';

class Landing extends Component {
  onCreateProject() {
    this.props.onCreateProject();
  }

  render() {
    return (
      <div className="Landing">
        <Logo />
        <Menu onCreateProject={this.onCreateProject.bind(this)}/>
      </div>
    );
  }
}

export default Landing;
