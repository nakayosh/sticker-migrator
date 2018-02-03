import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import {
  SEARCH_STPACKS_CHANGE,
  SEARCH_STPACKS_CLEAR,
  SEARCH_STPACKS_FETCH_REQUEST,
  SEARCH_STPACKS_FETCH_SUCCESS,
  SEARCH_STPACKS_FETCH_FAIL,
} from '../actions/search_stpacks';

function normalizeSearchStpacks(state, stpackList) {
  stpackList = { ...stpackList };
  stpackList.results = fromJS(stpackList.results.map(stpack => stpack.id_str));

  return state
    .set('results', stpackList.results)
    .set('next', stpackList.next)
    .set('prev', stpackList.prev)
    .set('submitted', true);
}

const initialState = ImmutableMap({
  value: '',
  results: ImmutableList(),
  next: 0,
  prev: 0,
  submitted: false,
});

export default function search(state = initialState, action) {
  switch(action.type) {
  case SEARCH_STPACKS_CHANGE:
    return state
      .set('value', action.value)
      .set('submitted', false);
  case SEARCH_STPACKS_CLEAR:
    return state.withMutations(map => {
      map.set('value', '');
      map.set('submitted', false);
      map.set('results', ImmutableList());
    });
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
