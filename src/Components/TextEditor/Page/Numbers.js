import React, { Component } from 'react';
import Number from './Numbers/Number';

class Numbers extends Component {
  render() {
    if (this.props.amount) {
      this.numbers = [];
      for (let i = 1; i <= this.props.amount; i++) {
        this.numbers.push(
          <Number key={i} value={i} />
        );
      }
    }
    return (
      <div className="Numbers">
        {this.numbers}
      </div>
    );
  }
}

export default Numbers;
