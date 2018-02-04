import { Map as ImmutableMap, fromJS } from 'immutable';
import {
  STPACK_FETCH_SUCCESS,
  STPACK_UPDATE_SUCCESS,
} from '../actions/stpacks';

function normalizeStpack(state, stpack) {
  return state.set(stpack.id, stpack => stpack.withMutirations(map => {
    map.set('stickers', map.get('stickers').map(sticker => sticker.id));
  }));
}

const initialState = ImmutableMap();

export default function stpacks(state = initialState, action) {
  switch(action.type) {
  case STPACK_FETCH_SUCCESS:
  case STPACK_UPDATE_SUCCESS:
    return normalizeStpack(state, fromJS(action.stpack));
  default:
    return state;
  }
}
