import { Map as ImmutableMap, fromJS } from 'immutable';
import {
  STPACK_FETCH_SUCCESS,
  STPACK_UPDATE_SUCCESS,
} from '../actions/stpacks';
import { RECENT_STPACKS_FETCH_SUCCESS } from '../actions/recent_stpacks';

const normalizeStpack = (state, stpack) => {
  stpack = { ...stpack };

  stpack.stickers = stpack.stickers.map(sticker => sticker.id_str);

  return state.set(stpack.id_str, fromJS(stpack));
};

const normalizeStpackFromStpackList = (state, stpackList) => {
  stpackList.forEach(stpack => {
    state = normalizeStpack(state, stpack);
  });

  return state;
};

const initialState = ImmutableMap();

export default function stpacks(state = initialState, action) {
  switch(action.type) {
  case STPACK_FETCH_SUCCESS:
  case STPACK_UPDATE_SUCCESS:
    return normalizeStpack(state, action.stpack);
  case RECENT_STPACKS_FETCH_SUCCESS:
    return normalizeStpackFromStpackList(state, action.stpackList);
  default:
    return state;
  }
}
