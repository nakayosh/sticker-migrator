import api from '../api';
import { debounce } from 'lodash';

export const SEARCH_STPACKS_CHANGE = 'SEARCH_STPACKS_CHANGE';
export const SEARCH_STPACKS_CLEAR  = 'SEARCH_STPACKS_CLEAR';

export const SEARCH_STPACKS_REFRESH_REQUEST = 'SEARCH_STPACKS_REFRESH_REQUEST';
export const SEARCH_STPACKS_REFRESH_SUCCESS = 'SEARCH_STPACKS_REFRESH_SUCCESS';
export const SEARCH_STPACKS_REFRESH_FAIL    = 'SEARCH_STPACKS_REFRESH_FAIL';

export const SEARCH_STPACKS_EXPAND_REQUEST = 'SEARCH_STPACKS_EXPAND_REQUEST';
export const SEARCH_STPACKS_EXPAND_SUCCESS = 'SEARCH_STPACKS_EXPAND_SUCCESS';
export const SEARCH_STPACKS_EXPAND_FAIL    = 'SEARCH_STPACKS_EXPAND_FAIL';

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
  dispatch(refreshSearchStpacksRequest());

  const q = getState().getIn(['search_stpacks', 'value']).trim();

  if (!q) {
    return;
  }

  api(getState).get('/api/stpacks/search', { params: { q, limit: 15 } }).then(response => {
    dispatch(refreshSearchStpacksSuccess(response.data));
  }).catch(error =>{
    dispatch(refreshSearchStpacksFail(error));
  });
}, 1000, { trailing: true });

export function refreshSearchStpacksRequest() {
  return {
    type: SEARCH_STPACKS_REFRESH_REQUEST,
  };
}

export function refreshSearchStpacksSuccess(stpackList) {
  return {
    type: SEARCH_STPACKS_REFRESH_SUCCESS,
    stpackList,
  };
}

export function refreshSearchStpacksFail(error) {
  return {
    type: SEARCH_STPACKS_REFRESH_FAIL,
    error,
  };
}


export function expandSearchStpacks() {
  return (dispatch, getState) => {
    dispatch(expandSearchStpacksRequest());

    const q = getState().getIn(['search_stpacks', 'value']).trim();

    if (!q) {
      return;
    }

    api(getState).get('/api/stpacks/search', { params: { q, limit: 15 } }).then(response => {
      dispatch(expandSearchStpacksSuccess(response.data));
    }).catch(error =>{
      dispatch(expandSearchStpacksFail(error));
    });
  };
}

export function expandSearchStpacksRequest() {
  return {
    type: SEARCH_STPACKS_EXPAND_REQUEST,
  };
}

export function expandSearchStpacksSuccess(stpackList) {
  return {
    type: SEARCH_STPACKS_EXPAND_SUCCESS,
    stpackList,
  };
}

export function expandSearchStpacksFail(error) {
  return {
    type: SEARCH_STPACKS_EXPAND_FAIL,
    error,
  };
}
