import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import {
  RECENT_STPACKS_REFRESH_REQUEST,
  RECENT_STPACKS_REFRESH_SUCCESS,
  RECENT_STPACKS_REFRESH_FAIL,
  RECENT_STPACKS_EXPAND_REQUEST,
  RECENT_STPACKS_EXPAND_SUCCESS,
  RECENT_STPACKS_EXPAND_FAIL,
} from '../actions/recent_stpacks';

function normalizeRecentStpacks(state, stpackList) {
  stpackList = { ...stpackList };
  stpackList.results = fromJS(stpackList.results.map(stpack => stpack.id_str));

  return state
    .set('results', stpackList.results)
    .set('next', stpackList.next)
    .set('prev', stpackList.prev)
    .set('submitting', false);
}

function appendNormalizedRecentStpacks(state, stpackList) {
  stpackList = { ...stpackList };
  stpackList.results = fromJS(stpackList.results.map(stpack => stpack.id_str));

  return state
    .update('results', results => results.concat(stpackList.results))
    .set('next', stpackList.next)
    .set('prev', stpackList.prev)
    .set('submitting', false);
}

const initialState = ImmutableMap({
  results: ImmutableList(),
  next: 0,
  prev: 0,
  submitting: false,
});

export default function recentStpacks(state = initialState, action) {
  switch(action.type) {
  case RECENT_STPACKS_EXPAND_SUCCESS:
    return appendNormalizedRecentStpacks(state, action.stpackList);
  case RECENT_STPACKS_REFRESH_SUCCESS:
    return normalizeRecentStpacks(state, action.stpackList);
  case RECENT_STPACKS_EXPAND_REQUEST:
  case RECENT_STPACKS_REFRESH_REQUEST:
    return state.set('submitting', true);
  case RECENT_STPACKS_EXPAND_FAIL:
  case RECENT_STPACKS_REFRESH_FAIL:
    return state.set('submitting', false);
  default:
    return state;
  }
}
