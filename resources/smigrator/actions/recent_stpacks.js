import api from '../api';

export const RECENT_STPACKS_FETCH_REQUEST = 'RECENT_STPACKS_FETCH_REQUEST';
export const RECENT_STPACKS_FETCH_SUCCESS = 'RECENT_STPACKS_FETCH_SUCCESS';
export const RECENT_STPACKS_FETCH_FAIL    = 'RECENT_STPACKS_FETCH_FAIL';

export function fetchRecentStpacks() {
  return (dispatch, getState) => {
    dispatch(fetchRecentStpacksRequest());

    api(getState).get('/api/stpacks/recent', {
      params: {
        limit: 15,
        offset: getState().getIn(['recent_stpacks', 'offset']),
      },
    }).then(response => {
      dispatch(fetchRecentStpacksSuccess(response.data));
    }).catch(error =>{
      dispatch(fetchRecentStpakcsFail(error));
    });
  };
}

export function fetchRecentStpacksRequest() {
  return {
    type: RECENT_STPACKS_FETCH_REQUEST,
  };
}

export function fetchRecentStpacksSuccess(stpackList) {
  return {
    type: RECENT_STPACKS_FETCH_SUCCESS,
    stpackList,
  };
}

export function fetchRecentStpakcsFail(error) {
  return {
    type: RECENT_STPACKS_FETCH_FAIL,
    error,
  };
}

