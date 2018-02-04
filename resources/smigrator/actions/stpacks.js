import api from '../api';

export const STPACK_FETCH_REQUEST = 'STPACK_FETCH_REQUEST';
export const STPACK_FETCH_SUCCESS = 'STPACK_FETCH_SUCCESS';
export const STPACK_FETCH_FAIL    = 'STPACK_FETCH_FAIL';

export const STPACK_UPDATE_REQUEST = 'STPACK_UPDATE_REQUEST';
export const STPACK_UPDATE_SUCCESS = 'STPACK_UPDATE_SUCCESS';
export const STPACK_UPDATE_FAIL    = 'STPACK_UPDATE_FAIL';

export function fetchStpack(id) {
  return (dispatch, getState) => {
    dispatch(fetchStpackRequest(id));

    api(getState).get(`/api/stpacks/${id}`).then(responce => {
      dispatch(fetchStpackSuccess(responce.data));
    }).catch(error => {
      dispatch(fetchStpackFail(error));
    });
  };
}

export function fetchStpackRequest(id) {
  return {
    type: STPACK_FETCH_REQUEST,
    id,
  };
}

export function fetchStpackSuccess(stpack) {
  return {
    type: STPACK_FETCH_SUCCESS,
    stpack,
  };
}

export function fetchStpackFail(error) {
  return {
    type: STPACK_FETCH_FAIL,
    error,
  };
}


export function updateStpack(id) {
  return (dispatch, getState) => {
    dispatch(updateStpackRequest(id));

    const data = {};

    data.id      = getState().getIn(['stpacks', 'id']);
    data.stickes = getState().getIn(['stpacks', 'stickers']).map(id => {
      getState().getIn(['stickers'], id);
    }).toJS();

    api(getState).patch('/api/stpacks', data).then(response => {
      dispatch(updateStpackRequest(response.data));
    }).catch(error => {
      dispatch(updateStpackFail(error));
    });
  };
}

export function updateStpackRequest(data) {
  return {
    type: STPACK_UPDATE_REQUEST,
    data,
  };
}

export function updateStpackSuccess(stpack) {
  return {
    type: STPACK_UPDATE_SUCCESS,
    stpack,
  };
}

export function updateStpackFail(error) {
  return {
    type: STPACK_UPDATE_FAIL,
    error,
  };
}
