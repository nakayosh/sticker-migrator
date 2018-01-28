import {
  PACK_FETCH_SUCCESS,
} from '../actions/packs';
import { List as ImmutableList } from 'immutable';

const initialState = ImmutableList();

export default function packs(state = initialState, action) {
  switch(action.type) {
  case PACK_FETCH_SUCCESS:
    return state.set(action.sticker.id, action.sticker);
  default:
    return state;
  }
}
