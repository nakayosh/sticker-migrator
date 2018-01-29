import {
  STPACK_FETCH_SUCCESS,
} from '../actions/stpacks';
import { Map as ImmutableMap, fromJS } from 'immutable';

const initialState = ImmutableMap();

export default function stpacks(state = initialState, action) {
  switch(action.type) {
  case STPACK_FETCH_SUCCESS:
    return state.set(`${action.stpack.id}`, fromJS(action.stpack));
  default:
    return state;
  }
}
