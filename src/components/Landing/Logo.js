import React, { Component } from 'react';
import logo from '../../imgs/LogoV2.svg';

class Logo extends Component {
  render() {
    return (
      <div className="Landing-Logo">
        <img src={logo} className="Landing-Logo-Image" alt="logo"/>
      </div>
    );
  }
}

export default Logo;
