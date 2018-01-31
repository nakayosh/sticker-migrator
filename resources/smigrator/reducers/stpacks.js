import { Map as ImmutableMap, fromJS } from 'immutable';
import {
  STPACK_FETCH_SUCCESS,
  STPACK_UPDATE_SUCCESS,
} from '../actions/stpacks';

const normalizeStpack = (state, stpack) => {
  stpack = { ...stpack };

  stpack.stickers = stpack.stickers.map(sticker => sticker.id_str);

  return state.set(stpack.id_str, fromJS(stpack));
};

const initialState = ImmutableMap();

export default function stpacks(state = initialState, action) {
  switch(action.type) {
  case STPACK_FETCH_SUCCESS:
  case STPACK_UPDATE_SUCCESS:
    return normalizeStpack(state, action.stpack);
  default:
    return state;
  }
}
