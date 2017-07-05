import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Measure from 'react-measure';
//import * as FileActions from '../../../actions/FileActions';
import FileStore from '../../../stores/FileStore';
import Line from './Lines/Line';

class Lines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linesDimensions: {
        width: -1,
        height: -1,
      },
      cursor: {
        posX: 0,
        posY: 1,
      },
      file: props.file,
    }
  }

  handleMoveCursorPosXY(posX, posY) {
    if (posX === -1) {
      if (posY > this.state.cursor.posY) {
        posX = 0;
      } else if (posY < this.state.cursor.posY) {
        posX = 0;//this.lines[posY].toString().length;
      }
    }

    if (posY >= 1 && posY <= this.lines.length) {
      const cursor = this.state.cursor;
      cursor.posY = posY;
      cursor.posX = posX;
      this.setState({cursor: cursor});
    }
  }

  componentDidUpdate() {
    if (ReactDOM.findDOMNode(this.refs.activeLine)) {
      ReactDOM.findDOMNode(this.refs.activeLine).focus();
    }
  }

  componentWillMount() {
    FileStore.on('change', () => {
      if (this.state.file.id === FileStore.getFileChanged()) {
        this.setState({file: FileStore.getFile(this.state.file.id)});
      }
    });
  }

  render() {
    if (this.props.file) {
      this.lines = this.props.file.lines.map((line, key) => {
        let active = this.state.cursor.posY === (key+1) ? 'activeLine' : null;
        let text = this.props.file.lines[key] || '';
        return (
          <Line
            ref={active}
            key={key}
            file={this.props.file}
            number={key+1}
            numbersColumnWidth={this.props.numbersColumnWidth}
            numberOfCharacters={text.length}
            pageDimensions={this.props.pageDimensions}
            linesDimensions={this.state.linesDimensions}
            cursor={this.state.cursor}
            onMoveCursorPosXY={this.handleMoveCursorPosXY.bind(this)}
          />
        );
      });
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
