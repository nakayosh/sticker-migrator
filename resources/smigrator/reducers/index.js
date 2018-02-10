import { combineReducers } from 'redux-immutable';

import message from './message';
import modal from './modal';
import recent_stpacks from './recent_stpacks';
import search_stpacks from './search_stpacks';
import settings from './settings';
import stickers from './stickers';
import compose from './compose';
import stpacks from './stpacks';

import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
  loadingBar: loadingBarReducer,
  message,
  modal,
  settings,
  stickers,
  stpacks,
  recent_stpacks,
  search_stpacks,
  compose,
};

export default combineReducers(reducers);
