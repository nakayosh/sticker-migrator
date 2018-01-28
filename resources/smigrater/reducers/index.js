import { combineReducers } from 'redux-immutable';
import packs from './packs';
import wizard from './wizard';

const reducers = {
  packs,
  wizard,
};

export default combineReducers(reducers);
