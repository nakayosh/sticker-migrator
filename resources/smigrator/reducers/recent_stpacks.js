import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import {
  RECENT_STPACKS_FETCH_REQUEST,
  RECENT_STPACKS_FETCH_SUCCESS,
  RECENT_STPACKS_FETCH_FAIL,
} from '../actions/recent_stpacks';

function normalizeRecentStpacks(state, stpackList) {
  stpackList = fromJS(stpackList.map(stpack => stpack.id_str));

  return state
    .update('results', results => results.concat(stpackList))
    .set('offset', state.get('offset') + stpackList.size)
    .set('submitting', false);
}

const initialState = ImmutableMap({
  'results': ImmutableList(),
  'offset': 0,
  'submitting': false,
});

export default function recentStpacks(state = initialState, action) {
  switch(action.type) {
  case RECENT_STPACKS_FETCH_REQUEST:
    return state.set('submitting', true);
  case RECENT_STPACKS_FETCH_SUCCESS:
    return normalizeRecentStpacks(state, action.stpackList);
  case RECENT_STPACKS_FETCH_FAIL:
    return state.set('submitting', false);
  default:
    return state;
  }
}
