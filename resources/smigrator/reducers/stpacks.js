import { Map as ImmutableMap, fromJS } from 'immutable';
import {
  STPACK_FETCH_SUCCESS,
  STPACK_PATCH_SUCCESS,
  STPACK_UPDATE,
} from '@/actions/stpacks';
import {
  RECENT_STPACKS_REFRESH_SUCCESS,
  RECENT_STPACKS_EXPAND_SUCCESS,
} from '@/actions/recent_stpacks';
import {
  SEARCH_STPACKS_REFRESH_SUCCESS,
  SEARCH_STPACKS_EXPAND_SUCCESS,
} from '@/actions/search_stpacks';
import { STORE_HYDRATE } from '@/actions/store';

const normalizeStpack = (state, stpack) => {
  stpack = { ...stpack };

  stpack.stickers   = stpack.stickers.map(sticker => sticker.id_str);
  stpack.created_at = stpack.created_at.replace(/-/g, '/');
  stpack.updated_at = stpack.updated_at.replace(/-/g, '/');

  return state.set(stpack.id_str, fromJS(stpack));
};

const normalizeStpackFromStpackList = (state, stpackList) => {
  stpackList.results.forEach(stpack => {
    state = normalizeStpack(state, stpack);
  });

  return state;
};

const initialState = ImmutableMap();

export default function stpacks(state = initialState, action) {
  switch(action.type) {
  case STORE_HYDRATE:
    return state.merge(action.state.get('stpacks'));
  case STPACK_FETCH_SUCCESS:
  case STPACK_PATCH_SUCCESS:
  case STPACK_UPDATE:
    return normalizeStpack(state, action.stpack);
  case RECENT_STPACKS_REFRESH_SUCCESS:
  case RECENT_STPACKS_EXPAND_SUCCESS:
  case SEARCH_STPACKS_REFRESH_SUCCESS:
  case SEARCH_STPACKS_EXPAND_SUCCESS:
    return normalizeStpackFromStpackList(state, action.stpackList);
  default:
    return state;
  }
}
