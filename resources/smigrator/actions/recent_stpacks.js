import api from '../api';

export const RECENT_STPACKS_REFRESH_REQUEST = 'RECENT_STPACKS_REFRESH_REQUEST';
export const RECENT_STPACKS_REFRESH_SUCCESS = 'RECENT_STPACKS_REFRESH_SUCCESS';
export const RECENT_STPACKS_REFRESH_FAIL    = 'RECENT_STPACKS_REFRESH_FAIL';

export const RECENT_STPACKS_EXPAND_REQUEST = 'RECENT_STPACKS_EXPAND_REQUEST';
export const RECENT_STPACKS_EXPAND_SUCCESS = 'RECENT_STPACKS_EXPAND_SUCCESS';
export const RECENT_STPACKS_EXPAND_FAIL    = 'RECENT_STPACKS_EXPAND_FAIL';

export function refreshRecentStpacks() {
  return (dispatch, getState) => {
    dispatch(refreshRecentStpacksRequest());

    api(getState).get('/api/stpacks/recent', {
      params: {
        limit: 15,
        offset: 0,
      },
    }).then(response => {
      dispatch(refreshRecentStpacksSuccess(response.data));
    }).catch(error =>{
      dispatch(refreshRecentStpakcsFail(error));
    });
  };
}

export function refreshRecentStpacksRequest() {
  return {
    type: RECENT_STPACKS_REFRESH_REQUEST,
  };
}

export function refreshRecentStpacksSuccess(stpackList) {
  return {
    type: RECENT_STPACKS_REFRESH_SUCCESS,
    stpackList,
  };
}

export function refreshRecentStpakcsFail(error) {
  return {
    type: RECENT_STPACKS_REFRESH_FAIL,
    error,
  };
}


export function expandRecentStpacks() {
  return (dispatch, getState) => {
    dispatch(expandRecentStpacksRequest());

    if ( !getState().getIn(['recent_stpacks', 'has_more']) ) {
      return;
    }

    api(getState).get('/api/stpacks/recent', {
      params: {
        limit: 15,
        offset: getState().getIn(['recent_stpacks', 'next']),
      },
    }).then(response => {
      dispatch(expandRecentStpacksSuccess(response.data));
    }).catch(error =>{
      dispatch(expandRecentStpakcsFail(error));
    });
  };
}

export function expandRecentStpacksRequest() {
  return {
    type: RECENT_STPACKS_EXPAND_REQUEST,
  };
}

export function expandRecentStpacksSuccess(stpackList) {
  return {
    type: RECENT_STPACKS_EXPAND_SUCCESS,
    stpackList,
  };
}

export function expandRecentStpakcsFail(error) {
  return {
    type: RECENT_STPACKS_EXPAND_FAIL,
    error,
  };
}


