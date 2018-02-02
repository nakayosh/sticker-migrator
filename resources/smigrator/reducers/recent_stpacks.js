import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import {
  RECENT_FETCH_REQUEST,
  RECENT_FETCH_SUCCESS,
  RECENT_FETCH_FAIL,
} from '../actions/recent_stpacks';

function normalizeRecentStpacks(state, stpackList) {
  stpackList = stpackList.map(stpack => stpack.id_str);

  return state
    .set('results', fromJS(stpackList))
    .set('submitting', false)
    .set('offset', state.get('offset') + stpackList.size() + 1);
}

const initialState = ImmutableMap({
  'results': ImmutableList(),
  'offset': 0,
  'submitting': false,
});

export default function recentStpacks(state = initialState, action) {
  switch(action.type) {
  case RECENT_FETCH_REQUEST:
    return state.set('submitting', true);
  case RECENT_FETCH_SUCCESS:
    return normalizeRecentStpacks(state, action.stpackList);
  case RECENT_FETCH_FAIL:
    return state.set('submitting', false);
  default:
    return state;
  }
}
