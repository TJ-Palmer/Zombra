import React, { Component } from 'react';
import Number from './Line/Number';
import Text from './Line/Text';

class Line extends Component {
  render() {
    return (
      <div className="Line">
        <Number />
        <Text />
      </div>
    );
  }
}

export default Line;
