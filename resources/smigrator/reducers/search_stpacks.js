import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import {
  SEARCH_STPACKS_CHANGE,
  SEARCH_STPACKS_CLEAR,

  SEARCH_STPACKS_REFRESH_REQUEST,
  SEARCH_STPACKS_REFRESH_SUCCESS,
  SEARCH_STPACKS_REFRESH_FAIL,

  SEARCH_STPACKS_EXPAND_REQUEST,
  SEARCH_STPACKS_EXPAND_SUCCESS,
  SEARCH_STPACKS_EXPAND_FAIL,
} from '../actions/search_stpacks';

function normalizeSearchStpacks(state, stpackList) {
  stpackList = { ...stpackList };
  stpackList.results = fromJS(stpackList.results.map(stpack => stpack.id_str));

  return state
    .set('results', stpackList.results)
    .set('next', stpackList.next)
    .set('prev', stpackList.prev)
    .set('has_more', stpackList.results.size !== 0)
    .set('submitting', false);
}

function appendNormalizeSearchStpacks(state, stpackList) {
  stpackList = { ...stpackList };
  stpackList.results = fromJS(stpackList.results.map(stpack => stpack.id_str));

  return state
    .update('results', results => results.concat(stpackList.results))
    .set('next', stpackList.next)
    .set('prev', stpackList.prev)
    .set('has_more', stpackList.results.size !== 0)
    .set('submitting', false);
}

const initialState = ImmutableMap({
  value: '',
  results: ImmutableList(),
  next: 0,
  prev: 0,
  has_more: true,
  submitted: false,
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
      .set('next', 0)
      .set('prev', 0)
      .set('has_more', false)
      .set('submitting', false)
      .set('results', ImmutableList());
  case SEARCH_STPACKS_REFRESH_SUCCESS:
    return normalizeSearchStpacks(state, action.stpackList);
  case SEARCH_STPACKS_EXPAND_SUCCESS:
    return appendNormalizeSearchStpacks(state, action.stpackList);
  case SEARCH_STPACKS_REFRESH_REQUEST:
  case SEARCH_STPACKS_EXPAND_REQUEST:
    return state.set('submitting', true);
  case SEARCH_STPACKS_REFRESH_FAIL:
  case SEARCH_STPACKS_EXPAND_FAIL:
    return state.set('submitting', false);
  default:
    return state;
  }
}
