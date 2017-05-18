import React, { Component } from 'react';
import Line from './Page/Line';
import Number from './Page/Number';

class Page extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
    }
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="Page">
        <h3>Page</h3>
        <Number />
        <Line />
      </div>
    );
  }
}

export default Page;
