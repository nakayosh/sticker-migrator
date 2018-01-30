import { Map as ImmutableMap, List as ImmutableList } from 'immutable';
import {
  SEARCH_FETCH_REQUEST,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAIL,
} from '../actions/search';

const initialState = ImmutableMap({
  value: '',
  submitted: false,
  results: ImmutableList(),
  next: null,
  prev: null,
});

export default function search(state = initialState, action) {
  switch(action.type) {
  case SEARCH_FETCH_REQUEST:
    return state.set('submitted', false);
  case SEARCH_FETCH_SUCCESS:
    return state
      .set('submitted', true)
      .set('results', ImmutableList(action.stpacksList.stpacks).map(stpack => stpack.id))
      .set('next', action.stpacksList.next)
      .set('prev', action.stpacksList.prev);
  case SEARCH_FETCH_FAIL:
    return state.set('submitted', true);
  default:
    return state;
  }
}
