import {combineReducers} from 'redux';
import common from './common_reducer';
import user from './user_reducer';

const rootReducer = combineReducers({
  common,
  user
});

export default rootReducer;