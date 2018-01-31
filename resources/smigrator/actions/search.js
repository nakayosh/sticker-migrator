import api from '../api';

export const SEARCH_CHANGE = 'SEARCH_CHANGE';
export const SEARCH_CLEAR  = 'SEARCH_CLEAR';

export const SEARCH_FETCH_REQUEST = 'SEARCH_FETCH_REQUEST';
export const SEARCH_FETCH_SUCCESS = 'SEARCH_FETCH_SUCCESS';
export const SEARCH_FETCH_FAIL    = 'SEARCH_FETCH_FAIL';

export function changeSearch(value) {
  return {
    type: SEARCH_CHANGE,
    value,
  };
}

export function clearSearch() {
  return {
    type: SEARCH_CHANGE,
  };
}

export function submitSearch() {
  return (dispatch, getState) => {
    dispatch(fetchSearchRequest());

    api(getState).get('/api/stpacks/search', {
      params: {
        q: getState().getIn(['serach', 'value']),
        limit: 15,
      },
    }).then(response => {
      dispatch(fetchSearchSuccess(response.data));
    }).catch(error =>{
      dispatch(fetchSearchFail(error));
    });
  };
}

export function fetchSearchRequest() {
  return {
    type: SEARCH_FETCH_REQUEST,
  };
}

export function fetchSearchSuccess(stpacksList) {
  return {
    type: SEARCH_FETCH_SUCCESS,
    stpacksList,
  };
}

export function fetchSearchFail(error) {
  return {
    type: SEARCH_FETCH_FAIL,
    error,
  };
}

