import api from '../api';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const STPACK_FETCH_REQUEST = 'STPACK_FETCH_REQUEST';
export const STPACK_FETCH_SUCCESS = 'STPACK_FETCH_SUCCESS';
export const STPACK_FETCH_FAIL    = 'STPACK_FETCH_FAIL';

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
