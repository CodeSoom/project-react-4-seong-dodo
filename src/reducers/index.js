import { combineReducers } from 'redux';

import userReducer from './user';
import accountbookReducer from './accountbook';

export default combineReducers({
  user: userReducer,
  accountbook: accountbookReducer,
});
