import {
  STPACK_FETCH_SUCCESS,
} from '../actions/stpacks';
import { List as ImmutableList } from 'immutable';

const initialState = ImmutableList();

export default function packs(state = initialState, action) {
  switch(action.type) {
  case STPACK_FETCH_SUCCESS:
    return state.set(action.stpack.id, action.stpack);
  default:
    return state;
  }
}
