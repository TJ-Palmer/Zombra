import React, { Component } from 'react';
import Measure from 'react-measure';
import Numbers from './Page/Numbers';
import Lines from './Page/Lines';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageDimensions: {
        width: -1,
        height: -1,
      },
    };
  }

  render() {
    return (
      <Measure onMeasure={(pageDimensions) => {this.setState({pageDimensions})}} >
        <div className="Page">
          <Numbers amount={this.props.file.lines.length} />
          <Lines file={this.props.file} pageDimensions={this.state.pageDimensions}/>
        </div>
      </Measure>
    );
  }
}

export default Page;
