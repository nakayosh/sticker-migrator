import api from '../api';
import { debounce } from 'lodash';

export const SEARCH_STPACKS_CHANGE = 'SEARCH_STPACKS_CHANGE';
export const SEARCH_STPACKS_CLEAR  = 'SEARCH_STPACKS_CLEAR';

export const SEARCH_STPACKS_FETCH_REQUEST = 'SEARCH_STPACKS_FETCH_REQUEST';
export const SEARCH_STPACKS_FETCH_SUCCESS = 'SEARCH_STPACKS_FETCH_SUCCESS';
export const SEARCH_STPACKS_FETCH_FAIL    = 'SEARCH_STPACKS_FETCH_FAIL';

export function changeSearchStpacks(value) {
  return dispatch => {
    dispatch({
      type: SEARCH_STPACKS_CHANGE,
      value,
    });

    dispatch(submitSearchStpacks);
  };
}

export function clearSearchStpacks() {
  return {
    type: SEARCH_STPACKS_CLEAR,
  };
}

const submitSearchStpacks = debounce((dispatch, getState) => {
  dispatch(fetchSearchStpacksRequest());

  const q = getState().getIn(['search_stpacks', 'value']).trim();

  if (!q) {
    return;
  }

  api(getState).get('/api/stpacks/search', { params: { q, limit: 15 } }).then(response => {
    dispatch(fetchSearchStpacksSuccess(response.data));
  }).catch(error =>{
    dispatch(fetchSearchStpacksFail(error));
  });
}, 1000, { trailing: true });

export function fetchSearchStpacksRequest() {
  return {
    type: SEARCH_STPACKS_FETCH_REQUEST,
  };
}

export function fetchSearchStpacksSuccess(stpackList) {
  return {
    type: SEARCH_STPACKS_FETCH_SUCCESS,
    stpackList,
  };
}

export function fetchSearchStpacksFail(error) {
  return {
    type: SEARCH_STPACKS_FETCH_FAIL,
    error,
  };
}

