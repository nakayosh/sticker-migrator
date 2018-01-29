import { combineReducers } from 'redux-immutable';
import stpacks from './stpacks';
import message from './message';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
  stpacks,
  message,
  loadingBar: loadingBarReducer,
};

export default combineReducers(reducers);
