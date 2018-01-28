import { Map as ImmutableMap } from 'immutable';
import {
  CHANGE_WIZARD,
} from '../actions/wizard';

const initialState = ImmutableMap({
  value: '',
});

export default function wizard(state = initialState, action) {
  switch(action.type) {
  case CHANGE_WIZARD:
    return state.set('value', action.value);
  default:
    return state;
  }
}
