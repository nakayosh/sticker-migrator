import { combineReducers } from 'redux-immutable';
import message from './message';
import stickers from './stickers';
import stpacks from './stpacks';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
  message,
  stickers,
  stpacks,
  loadingBar: loadingBarReducer,
};

export default combineReducers(reducers);
