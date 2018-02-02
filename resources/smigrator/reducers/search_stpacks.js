import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import {
  SEARCH_STPACKS_CHANGE,
  SEARCH_STPACKS_CLEAR,
  SEARCH_STPACKS_FETCH_REQUEST,
  SEARCH_STPACKS_FETCH_SUCCESS,
  SEARCH_STPACKS_FETCH_FAIL,
} from '../actions/search_stpacks';

function normalizeSearchStpacks(state, stpackList) {
  stpackList = fromJS(stpackList.map(stpack => stpack.id_str));

  return state
    .set('results', stpackList)
    .set('submitted', true);
}

const initialState = ImmutableMap({
  value: '',
  submitted: false,
  results: ImmutableList(),
});

export default function search(state = initialState, action) {
  switch(action.type) {
  case SEARCH_STPACKS_CHANGE:
    return state
      .set('value', action.value)
      .set('submitted', false);
  case SEARCH_STPACKS_CLEAR:
    return state
      .set('value', '')
      .set('submitted', false)
      .set('results', ImmutableList());
  case SEARCH_STPACKS_FETCH_REQUEST:
    return state.set('submitted', false);
  case SEARCH_STPACKS_FETCH_SUCCESS:
    return normalizeSearchStpacks(state, action.stpackList);
  case SEARCH_STPACKS_FETCH_FAIL:
    return state.set('submitted', true);
  default:
    return state;
  }
}
