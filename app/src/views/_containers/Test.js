import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add, minus } from '../../actions/action_user';

class Test extends Component {
  handleAddOne() {
    this.props.add(1);
  }

  handleMinusOne() {
    this.props.minus(1);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.handleAddOne.bind(this)}>Add 1</button>
        <button onClick={this.handleMinusOne.bind(this)}>Minus 1</button>
        <h3>{this.props.user.count}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    add: add,
    minus: minus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
