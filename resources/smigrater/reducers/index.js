import { combineReducers } from 'redux-immutable';
import stpacks from './stpacks';
import wizard from './wizard';

const reducers = {
  stpacks,
  wizard,
};

export default combineReducers(reducers);
