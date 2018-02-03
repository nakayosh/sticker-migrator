import { combineReducers } from 'redux-immutable';
import message from './message';
import modal from './modal';
import stickers from './stickers';
import stpacks from './stpacks';
import recent_stpacks from './recent_stpacks';
import search_stpacks from './search_stpacks';
import settings from './settings';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
  message,
  modal,
  stickers,
  stpacks,
  recent_stpacks,
  search_stpacks,
  settings,
  loadingBar: loadingBarReducer,
};

export default combineReducers(reducers);
