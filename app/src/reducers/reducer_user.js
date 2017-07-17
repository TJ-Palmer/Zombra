import MessagesReducer from './reducer_messages';
import { combineReducers } from 'redux';

const defaultState = {
  count: 0,
  messages: combineReducers({ MessagesReducer }),
  error: null,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'ADD' : {
      return {...state, count: state.count + action.payload};
    }
    case 'MINUS' : {
      return {...state, count: state.count - action.payload};
    }
    default : {
      return state;
    }
  }
}
