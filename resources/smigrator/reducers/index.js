import { combineReducers } from 'redux-immutable';

import compose from './compose';
import emoji_picker from './emoji_picker';
import message from './message';
import modal from './modal';
import recent_stpacks from './recent_stpacks';
import search_stpacks from './search_stpacks';
import settings from './settings';
import stickers from './stickers';
import stpacks from './stpacks';

import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = {
  compose,
  emoji_picker,
  loadingBar: loadingBarReducer,
  message,
  modal,
  recent_stpacks,
  search_stpacks,
  settings,
  stickers,
  stpacks,
};

export default combineReducers(reducers);
