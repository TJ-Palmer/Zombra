import React, { Component } from 'react';

class Number extends Component {
  render() {
    return (
      <div className="Number">{this.props.value}</div>
    );
  }
}

export default Number;
