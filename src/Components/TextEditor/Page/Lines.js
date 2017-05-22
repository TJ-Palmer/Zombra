import React, { Component } from 'react';
import Measure from 'react-measure';
import Line from './Lines/Line';

class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linesDimensions: {
        width: -1,
        height: -1,
      },
    }
  }

  render() {
    if (this.props.lines) {
      this.lines = [];
      for (let i = 0; i < this.props.lines.length; i++) {
        this.lines.push(
          <Line
            key={i}
            text={this.props.lines[i]}
            number={i+1}
            numbersColumnWidth={this.props.numbersColumnWidth}
            pageDimensions={this.props.pageDimensions}
            linesDimensions={this.state.linesDimensions}
          />
        );
      }
    }
    return (
      <Measure onMeasure={(linesDimensions) => {this.setState({linesDimensions})}} >
        <div className="Lines">
          {this.lines}
        </div>
      </Measure>
    );
  }
}

export default Lines;
