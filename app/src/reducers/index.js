import { combineReducers } from 'redux';

import UserReducer from './reducer_user';
import MessagesReducer from './reducer_messages';

export default combineReducers({
  user: UserReducer
});
