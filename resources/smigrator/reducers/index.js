import { combineReducers } from 'redux-immutable';

import message from './message';
import modal from './modal';
import recent_stpacks from './recent_stpacks';
import search_stpacks from './search_stpacks';
import settings from './settings';
import stickers from './stickers';
import stpack_compose from './stpack_compose';
import stpacks from './stpacks';

import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
  message,
  modal,
  recent_stpacks,
  search_stpacks,
  settings,
  stickers,
  stpack_compose,
  stpacks,
  loadingBar: loadingBarReducer,
};

export default combineReducers(reducers);
