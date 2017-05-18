import React, { Component } from 'react';
import Line from './Page/Line';

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
        <Line />
      </div>
    );
  }
}

export default Page;
